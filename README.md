# Simple State Management for Angular-RxJS  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.  

 - Simple & scalable state-management system that uses no third party library.  
 - Leveraging the power of RxJS.

## Development server  

 - Should have Node JS installed.
 - Run `ng serve` for a dev server. 
 - Navigate to   `http://localhost:4200/`.  
 - The app will automatically reload if you change any of the source files.

## Build  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. 

## Running unit tests 

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).  

## Design Strategy   

 - Follows DRY & KISS principle.  Simple RxJS operators to hold the
   state. 
 - Concept of simple store that holds the data at one point.
 - Implemented a single store pattern. Giving a single point to add & retrieve data.
 - Completely uncluttered code courtesy of the modular pattern.