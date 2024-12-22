import Config from "../package.json" with { type: "json" };
import winston from "winston";

function logger() {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

const proxyRules = [
  {
    context: [
      '/nde/custom/**'
    ],
    target: 'not-needed',
    router: (req) => {
      const url = `${req.protocol}://${req.get('host')}`
      console.log(req.url);
      return url;
    },
    secure: true,
    logLevel: 'debug',
    logProvider: logger,
    pathRewrite: { '^/nde/custom/.*/': '' },
  },
  {
    context: [
      '**', '!/nde/custom/**'
    ],
    target: Config.nde.proxy.target,      
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    logProvider: logger,
  }
];



export default proxyRules;
