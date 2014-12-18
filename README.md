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