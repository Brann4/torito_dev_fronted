# MindCheck

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0-rc.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# IIS images Server to config

### **1. Crear la carpeta**
Se debe crear una carpeta lo mas cercano a la raiz (C:)

### **2. Agregar permisos al usuario IIS_IUSRS**
Hacer click derecho en la carpeta "Propiedades > Seguridad > Editar (Nombres de grupos y usuarios).
Se debe de dar a Control total por defecto.

### **3. Confugrar Administrador de IIS**
Ir al administrador de IIS en el buscador de windows.
Debe crear un sitio web con un puerto que no este siendo utilizado y apuntar a la carpeta creada.
Al sitio creado, dar click derecho y seleccionar "Cambiar a vista de contenido"
Reiniciar el servicio y ya se deberia usar la ruta "localhost:<puerto>" en su archivo de enviroment.ts 
