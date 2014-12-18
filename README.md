#SoundCloud API with Angular

Today we are going to build an app with AngularJS using the SoundCloud API. This app will allow us to search SoundClouds databases via username, and listen to the tracks that user has uploaded. An example of this app can be viewed [here](http://eanplatter.github.io/sounder)

Try searching for: Yahtzel, or Carmadamusic.

Before we begin we will need to have NodeJS installed on our computer. You should already have node by now.

We will also need Bower to handle our dependencies. To install bower just type the following into your terminal:

```
  $ npm install -g bower
```

## Step 1 - SetUp
Let's get our basic Angular app set up.

- Create an index.html file.
- Set up the html file with its basic needs:
  - html tags
  - head tags
  - body tags
- Create an app.js file
- Create a controller.js file
- Create a service.js file
- Link the files you just created at the bottom of the body of the html file with script tags

Now let's get bower working in our application.

- In your terminal we will initiate bower in our app:

```
  $ bower init
```

- Go though the bower workflow as it sets up your application. If you don't know the answer to something, just press enter to leave it blank (or default value).

- Now install AngularJS via bower:
```
  $ bower install angular
```
You'll notice a new file in your app called 'bower_components'. This is where the things we install with bower will be located.

- Link our new angular files in our index.html file above all the rest of our other scripts
  - Note: the file path will look something like 'bower_components/angular/angular.js'
- Create a style.css file, and link it in the <head> tags
- Add bootstrap to the application

```
  $ bower install bootstrap
```

Notice: in our bower_components file, it added not just bootstrap, but also jQuery. Bower checks for dependencies, and automatically installs them. #kindaneat.

- Link the bootstrap css file above our style.css file in the <head> tags
- Link jQuery file under the angular file
- Link the bootstrap.js file under the jquery file.

Why does it matter where we link them? It matters because when our app is being read by the users browser, it will go from top to bottom, left to right. This means it's going to first load Bootstrap.css, then our styles.css (this means we can override bootstrap if we need to via styles.css since it's being read last). Then it will read Angular.JS, then jQUery.js, then bootstrap.js, then our custom js files. If bootstrap was above jQuery, we would end up with an error saying that bootstrap requires jQuery. That error is thrown even before the browser reads the next line.

Our files should appear in our index.html file in the following order:
- HEAD
  - bootstrap.css
  - style.css
- BODY
  - angular.js
  - jquery.js
  - bootstrap.js
  - app.js
  - controller.js
  - service.js

# Step 2 - Initialize Angular

- In app.js create a new angular module. Remember that when create an angular module you'll need to include an empty array or []. This tells angular that we are create a new module, rather than referring to an existing module.
- Name the module 'sounder'
- Include the module in our index.html file by adding ng-app="sounder" to our <html> tag.
- Initialize the module in our controller.js file. Remember to omit the [] so as to tell angular that we are referring to the sounder module
- Initialize the sounder module in our service.js in the same fashion
- In our controller.js create a controller named 'MainController'
- In our index.html's opening body tag add the controller: ng-controller="MainController"
- Create a service named 'soundService' in our service.js file
- Inject the $http service into our soundService
- Inject our soundService into our MainController























