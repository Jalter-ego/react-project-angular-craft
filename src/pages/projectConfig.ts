// src/stackblitz/projectConfig.ts

// Configuración de `angular.json`
export const angularJsonConfig = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "projects": {
    "app": {
      "projectType": "application",
      "root": "src",
      "sourceRoot": "src",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "index": "index.html",
            "main": "main.ts",
            "outputPath": "dist/app",
            "tsConfig": "tsconfig.json",
            "polyfills": "polyfills.ts",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "index.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "app:build"
          },
          "configurations": {
            "production": {
              "buildTarget": "app:build:production"
            },
            "development": {
              "buildTarget": "app:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}`;

export const polyfills = `
import 'zone.js';
`

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
