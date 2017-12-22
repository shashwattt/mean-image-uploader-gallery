# Gallery Application - Mean Project

This project is initiatilly generated from [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.
Integrated with [express](https://expressjs.com/) and [mongodb library](http://mongoosejs.com/) and [Angular Material](https://material.angular.io/). 
It uses [ng2-file-upload](https://github.com/valor-software/ng2-file-upload/) to send files to server and [multer](https://github.com/expressjs/multer) for handling files at server side.

Hosted on [AWS EC2](https://aws.amazon.com/ec2/) instance - [View Running Application](http://ec2-13-127-10-201.ap-south-1.compute.amazonaws.com:3030/)

This project is made for learning and testing.

## Features
- [x] Angular 5
- [x] TypeScript 2
- [x] Mongoose 4.6.3
- [x] Express 4.16.2
- [x] Angular Material 5.0.0-rc.3
- [x] TSLint
- [x] @types
- [ ] Karma + Jasmine (Yet to implement)
- [x] Styling using CSS
- [x] NPM


### Usage
Clone it to your prefered location 

```
 git clone https://github.com/shashwattt/mean-image-uploader-gallery.git <directory_name> --depth=1
 cd <directory_name>
```
Download dependencies

```
 npm install
```

### To run locally
Run 
```
npm start
```
Navigate to `http://localhost:3030/`.

### For development

Use `ng build --watch` to keep watch on Front end file changes.
Use `nodemon server.js` to keep watch on Server end file changes.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
