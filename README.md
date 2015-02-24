#SoundCloud API with Angular

Today we are going to build an app with AngularJS using the SoundCloud API. This app will allow us to search SoundClouds databases via username, and listen to the tracks that user has uploaded. An example of this app can be viewed [here](http://eanplatter.github.io/sounder)

Try searching for: Yahtzel, or Carmadamusic.

## Step 1 - SetUp
Let's get our basic Angular app set up.

- Create an index.html file.
- Set up the html file with its basic needs:
  - html tags
  - head tags
  - body tags
- Create an app.js file
- Create a mainController.js file
- Create a soundService.js file
- Link the files you just created at the bottom of the body of the html file with script tags
- Create a styles.css file, and link it in the <head> tags

Next, we have some CDNs we'll need to add. Mainly Bootstrap and AngularJS and jQuery
``` html
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.13/angular.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
```
- Link the bootstrap css file above our styles.css file in the <head> tags
- Link the angular, jQuery, and bootstrap js files at the tail end of the body tag.

Our files should appear in index.html file in the following order:
- HEAD
  - bootstrap.css
  - style.css
- BODY
  - angular.min.js
  - jquery.min.js
  - bootstrap.min.js
  - app.js
  - mainController.js
  - soundService.js

# Step 2 - Initialize Angular

- In app.js, create a new angular module called 'sounder'
- Include the module in our index.html file by adding ng-app="sounder" to our `<html>` tag.

### soundService.js
- Set up the soundService, initializing the sounder module and building out the basic structure for the service
- Inject the $http service into soundService

### mainController.js
- Set up the mainController.js file with the basic structure for the controller
- In our index.html's opening body tag, add the controller: `ng-controller="MainController"`
- Inject our soundService into our MainController

# Step 3 - Our first endpoint

We will be using the official SoundCloud api, which you can view at: https://developers.soundcloud.com or more specifically [here](https://developers.soundcloud.com/docs/api/reference).

Whenever you make an app with SoundCloud, you need to register your app, and get an API key. Rather than having everyone go register we will use a key for the class.

API key
```
  bda4ada8694db06efcac9cf97b872b3e
```

*Note: using our api key (or any other kind of private stuff) in our front end code is a bad habit. Typically, sensitive information like this is kept in a file that our web server will access. A file that is not committed to github to ensure privacy. Someone could easily find our API key and use it in their own app. In future projects we will discuss some ways to better secure our apps. It'll work fine for our small project, but you would never want to share API keys publicly.*

- Our endpoint is going to get all of the tracks a user has uploaded.
- Write a getUser function in our soundService.js file that is attached to our service using the 'this' keyword
  - `this.getUser = function() {}`
- getUser should expect a "username" parameter
- Use angular's $http service to get data for the getUser function
  - GET `'http://api.soundcloud.com/users/' + username + '/tracks.json?client_id=bda4ada8694db06efcac9cf97b872b3e'`
  - This url will be our main point of contact between the Soundcloud API and our app

The url we used above has an interesting anatomy:
  - Main URL: http://api.soundcloud.com/
  - Where we want to go: users/' + username + '/tracks.json
  - API Key: ?client_id=bda4ada8694db06efcac9cf97b872b3e

This tells SoundCloud that we want to hit their users by the username of the variable username and download all of their tracks in JSON format. The API Key tells SoundCloud who we are.

# Step 4 - Our controller (part 1)

- Create a "getUser" function on our controller's scope object
- Within `$scope.getUser` call `soundService.getUser` function in order to get the data from the service. Remember, the soundService.getUser needs to have a username passed into it. Pass a test value, like 'Yahtzel' (a soundcloud user):

`soundService.getUser('Yahtzel')`

- Remember that $http returns a promise, so use `.then` on soundService.getUser and console.log(data.data) within that function
- Invoke $scope.getUser function at the bottom of the controller

Try out your app so far. You can run your app by using http-server (which should already be installed) from the root of the application folder. Once the server is running, check out localhost:8080 (or whatever port your http-server is running on).

Open the console, you should see some data from Yahtzel. Obviously we don't always want to get data from the same username (Yahtzel), so in our $scope.getUser function, let's change 'Yahtzel' to $scope.searchText.

# Step 5 - Our view part 1

- In our index.html page let's create a form with an input field
- In the input field let's give it the ng-model of 'searchText'
- Add a button in the form with the ng-click of getUser()

Now Our form will take in text, apply that text to $scope.searchText and pass it through to the function via our button.

Now when we click the button we end up console.logging the data for the person we searched.

Search some cool usernames! 'yahtzel', 'carmadamusic', 'flightfacilities' 'the-gtw'.

#Step 6 - Our controller part 2

- Inside our $scope.getUser function we are console.logging our data. Let's apply it to our $scope object so that we can render it in our view.
- Do this in place of the console.log: $scope.userData = data.data

-Now in our view we can ng-repeat through the data ng-repeat="song in userData"

I'll show you an example of how we can design the data using bootstrap:

``` html
  <div class="row">
    <div ng-repeat="song in userData">
      <div class="col-md-1">
        <img src="http://i.ytimg.com/vi/L5z2-Mx9TNE/hqdefault.jpg" ng-click="play(song.permalink_url)" ng-if="!song.artwork_url">
        <img src="{{song.artwork_url}}" ng-click="play(song.permalink_url)" ng-if="song.artwork_url">
      </div>
    </div>
  </div>
```

This will give us the album art of each song with a ng-click on them that allows us to call a new function called play! 

Something we need to do now is access the SoundCloud JavaScript SDK. SDK stands for Software Development Kit. It's essentially a fancy API made for JavaScript specifically. SDKs are cool, but they're very specific to the app who releases them. That means learning the SoundCloud SDK is SoundCloud specific, it won't really help you a lot in learning someone elses SDK. So we won't spend too much time talking about how their SDK works. We just need it to play our tunes!


# Step 7 - SoundCloud SDK
We are going to use the SoundCloud SDK to inject an iFrame into our app which will play the song we selected.

- Inject the SoundCloud SDK into our app, like so:
```` html
  <script src="http://connect.soundcloud.com/sdk.js"></script>
````

- In our controller, let's create a $scope.play function that takes in a parameter called track_url
- The following bit of code is going to do all of magic for us. Put it in the $scope.play function:

``` javascript
    SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
      $scope.$apply($scope.iFrame = $sce.trustAsHtml(oEmbed.html));
    });
```

What this code is doing is essentially calling SoundCloud's function called oEmbed and then in the callback is doing some angular magic so as to sanitize the code and pass it into our DOM. oEmbed comes with a lot of data, this bit of code strips out the iFrame for our use.

- Next, in our view we want to render the code. AngularJS has a very useful directive called ng-bind-html. If we try to say $scope.iFrame = '<iFrame>Crazy iFrame code!</iFrame>' amd then attempt to render it in the DOM, we will end up with a string that says '<iFrame>Crazy iFrame code!</iFrame>'. Instead we want our browser to actually translate it like it would any other html. ng-bind-html does that for us. All we need to do is tell it what to render
  - ng-bind-html="iFrame"

Once we are rendering the iFrame, we should now get to play any song we've clicked on! 



