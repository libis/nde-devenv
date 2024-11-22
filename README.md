# CustomModule

### Overview
The NDE Customization package offers options to enhance and extend the functionality of Primo’s New Discovery Experience (NDE). You can add and develop your own components, customize theme templates, and tailor the discovery interface to your specific needs.

**Note:**
The NDE Customization package is currently available exclusively to Primo customers who have early access to the New Discovery Experience (NDE). Further availability will be announced in upcoming releases.

---

### Development Containers [devcontainers](https://containers.dev/)
Life will become easier if you are using an IDE that supports devcontainers and you have [Docker](https://docker.com) running.  
This can be remote like [GitHub Codespaces](https://github.com/features/codespaces) or local like [Visual Studio Code](https://code.visualstudio.com/)(VSC) or any IDE that support devcontainers.

You can 'Reopen in Container' when you open this repository in for example VSC. Your IDE will create a docker image and start the container, be patient this can take a while if you do this the first time.

Once your container is running you will see your workspace(/app/src) on the left. We have hidden the project files(tsconfig.json, ...) but if you need them use your terminal or update the workspaceFolder in ```.devcontainer/devcontainer.json``` and rebuild(press cmd/ctrl+shift+p or F1 and select 'Dev Containers: Rebuild Container')

### Configuration
All direct relevant configurations are located in ```package.json```

```json
  "nde": {
    "proxy": {
      "target": "YOUR_PRIMO_NDE_URL"
    },
    "build": {
      "institution": "YOUR_INSTITUTION_CODE",
      "view": "YOUR_VIEW_CODE"
    }
  }
```

### List commands
```bash
  npm run
```

### Starting the PROXY
```bash
  npm run start:proxy
```
Accessing Primo NDE through the proxy
```url
  http://localhost:4201/nde/home?vid=32KUL_KUL:KULeuven_NDE&lang=en
```

### Creating a component
Components must ge created in the ```/app/src``` directory. If you did not mess with your configuration then this is the default directory of your terminal.   
For example let us create a dot component in a libis sub directory.
```bash
  ng generate component libis/dot --module custom1-module
```
Component should have been created. Open the .ts file and update the selector to 'lbs-dot' this is the element tag that will be used in Primo NDE.
```typescript
@Component({
  selector: 'lbs-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
```

Import and register the location the component needs to be injected.
```typescript
import {DotComponent} from '../libis/dot/dot.component'

export const selectorComponentMap = new Map<string, any>([  
  ['nde-logo-after', DotComponent]
]);
```

### Creating a package
```bash
  npm run postbuild
```
Your package will be located in ```dist/YOUR_PACKAGE_NAME.zip```

## Additional Resources

### Live Demo Tutorial
- **Customize Primo NDE UI**: Watch our live demo on YouTube for a visual guide on how to customize the Primo NDE UI:
  [Customize Primo NDE UI: Live Demo](https://www.youtube.com/watch?v=z06l2hJYuLc)



---

## Conclusion
By following these steps, you can customize and extend the NDE interface using the `CustomModule` package. If you have any questions or run into issues, refer to the project documentation or the ExLibris support.

