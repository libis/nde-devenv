const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Function to read package.json
function readPackage() {
  const filePath = "/app/package.json";
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log(`File '${filePath}' not found.`);
    return;
  }

  // Read and parse the JSON file
  let data;
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileContent);
  } catch (error) {
    console.log("Error: File contains invalid JSON or cannot be read.");
    return;
  }

  return data;
}

//Function to write package.json
function writePackage(data) {
  const filePath = "/app/package.json";
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
}

const app = express();
const PORT = 3000;

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  };

app.use(express.json());
app.use(express.static("public", options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const filePath = "public/index.html";
  const package = readPackage();
  // Read the HTML file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Error: Could not load HTML file.");
    } else {
      data = data
        .replace("{{proxy_target}}", package.nde.proxy.target)
        .replace("{{institution_code}}", package.nde.build.institution)
        .replace("{{view_code}}", package.nde.build.view);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

app.post("/submit", (req, res) => {    
  const package = readPackage();    

  package.nde.proxy.target = req.body.proxy_target;
  package.nde.build.institution = req.body.institution_code;
  package.nde.build.view = req.body.view_code;
  writePackage(package);

  res.redirect("/");
});

app.listen(PORT, () => {
  const package = readPackage();
  console.log(`\n\n\n\n\n\n\n`);
  console.log(`Config server is running at http://localhost:${PORT}`);
  console.log(`\n\n\nStart proxy with: \n\t\tnpm run start:proxy`);
  console.log(
    `Proxy will be available on \n\thttp://localhost:4201/nde/home?vid=${package.nde.build.institution}:${package.nde.build.view}&lang=en`
  );
});
