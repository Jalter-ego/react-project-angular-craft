// src/stackblitz/projectConfig.ts

import { generateAppComponentTs, generateAppModuleTs } from "../lib/extractFilesResponse";

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

// Configuración de `dashboard.component.ts`
const dashboardComponentTsConfig = `
  import { Component } from '@angular/core';
  
  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })
  export class DashboardComponent {}
  `;

// Configuración de `dashboard.component.html`
const dashboardComponentHtmlConfig = `
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="menu-icon"></div>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/profile" routerLinkActive="active">Profile</a></li>
      </ul>
    </aside>
    <main class="main-content">
      <div class="top-bar">
        <button class="login-button">Iniciar Sesión</button>
      </div>
      <router-outlet></router-outlet>
    </main>
  </div>
  `;

// Configuración de `dashboard.component.css`
const dashboardComponentCssConfig = `
  .dashboard-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #34495e;
    color: white;
  }
  .sidebar {
    width: 200px;
    background: #2c3e50;
    padding: 20px;
  }
  .main-content {
    flex: 1;
    background: #ecf0f1;
    color: black;
  }
  .login-button {
    float: right;
  }
  .active {
    font-weight: bold;
  }
  `;



// Configuración de `home.component.ts`
const homeComponentTsConfig = `
  import { Component } from '@angular/core';
  @Component({
    selector: 'app-home',
    template: '<h1>Home</h1>'
  })
  export class HomeComponent {}
  `;

// Configuración de `profile.component.ts`
const profileComponentTsConfig = `
  import { Component } from '@angular/core';
  @Component({
    selector: 'app-profile',
    template: '<h1>Profile</h1>'
  })
  export class ProfileComponent {}
  `;

export const projectConfig = {
  title: "Generated Angular Project",
  description: "UI auto-generated based on design input",
  template: "angular-cli" as const,
  dependencies: {
    "@angular/animations": "^17.3.0",
    "@angular/common": "^17.3.0",
    "@angular/compiler": "^17.3.0",
    "@angular/core": "^17.3.0",
    "@angular/forms": "^17.3.0",
    "@angular/platform-browser": "^17.3.0",
    "@angular/platform-browser-dynamic": "^17.3.0",
    "@angular/router": "^17.3.0",
    rxjs: "^7.8.0",
    "zone.js": "^0.14.0",
  },
  files: {
    "angular.json": angularJsonConfig,
    "src/main.ts": mainTsConfig,
    "src/index.html": indexHtmlConfig,
    "src/index.css": indexCssConfig,
    "src/app/dashboard/dashboard.component.ts": dashboardComponentTsConfig,
    "src/app/dashboard/dashboard.component.html": dashboardComponentHtmlConfig,
    "src/app/dashboard/dashboard.component.css": dashboardComponentCssConfig,
    "src/app/app.module.ts": generateAppModuleTs("componentName"),
    "src/app/home/home.component.ts": homeComponentTsConfig,
    "src/app/profile/profile.component.ts": profileComponentTsConfig,
    "src/app/app.component.ts": generateAppComponentTs("componentName"),
  },
};
