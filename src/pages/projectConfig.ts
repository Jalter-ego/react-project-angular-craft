// src/stackblitz/projectConfig.ts

// Configuración de `angular.json`
export const angularJsonConfig = `{
    "projects": {
      "app": {
        "projectType": "application",
        "sourceRoot": "src",
        "architect": {
          "build": {
            "options": {
              "index": "src/index.html",
              "main": "src/main.ts",
              "outputPath": "dist/app",
              "styles": ["src/index.css"],
              "scripts": []
            }
          }
        }
      }
    }
  }`;

// Configuración de `main.ts`
export const mainTsConfig = `
  import 'zone.js';
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { AppModule } from './app/app.module';
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
  `;

// Configuración de `index.html`
export const indexHtmlConfig = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Angular App</title>
    <base href="/">
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>`;

export const indexCssConfig = `
body{
width: 100%;
height: 100%;
margin: 0;
font-family: system-ui;
}
`;

