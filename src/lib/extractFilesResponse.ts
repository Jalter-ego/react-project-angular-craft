import {
  angularJsonConfig,
  indexCssConfig,
  indexHtmlConfig,
  mainTsConfig,
} from "../pages/projectConfig";

export function generateAppComponentTs(componentName: string) {
  const selector = `app-${componentName.toLowerCase()}`;
  return `
        import { Component } from '@angular/core';
        
        @Component({
          selector: 'app-root',
          template: '<${selector}></${selector}>',
        })
        export class AppComponent {}
          `.trim();
}

export function generateAppModuleTs(componentName: string) {
  const className = `${capitalize(componentName)}Component`;
  return `
        import { NgModule } from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';
        import { FormsModule } from '@angular/forms';
        import { AppComponent } from './app.component';
        import { ${className} } from './${componentName}/${componentName}.component';
        
        @NgModule({
          declarations: [
            AppComponent,
            ${className}
          ],
          imports: [
            BrowserModule,FormsModule
          ],
          bootstrap: [AppComponent]
        })
        export class AppModule {}
          `.trim();
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractFilesFromGeminiResponse(response: string) {
  const htmlMatch = response.match(/```html\s*([\s\S]*?)```/);
  const cssMatch = response.match(/```css\s*([\s\S]*?)```/);
  const tsMatch = response.match(/```typescript\s*([\s\S]*?)```/);

  return {
    html: htmlMatch ? htmlMatch[1].trim() : "",
    css: cssMatch ? cssMatch[1].trim() : "",
    ts: tsMatch ? tsMatch[1].trim() : "",
  };
}

export function generateProjectConfigFromResponse(
  response: string,
  nameComponent: string
) {
  const { html, css, ts } = extractFilesFromGeminiResponse(response);

  return {
    title: "Generated Angular Project",
    description: "UI auto-generated based on Gemini input",
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
      "src/index.html": indexHtmlConfig,
      "src/index.css": indexCssConfig,
      "src/main.ts": mainTsConfig,
      "src/app/app.component.ts": generateAppComponentTs(nameComponent),
      "src/app/app.module.ts": generateAppModuleTs(nameComponent),
      [`src/app/${nameComponent}/${nameComponent}.component.html`]: html,
      [`src/app/${nameComponent}/${nameComponent}.component.css`]: css,
      [`src/app/${nameComponent}/${nameComponent}.component.ts`]: ts,
    },
  };
}
