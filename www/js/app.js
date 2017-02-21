// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','moduleControlles','ngSanitize','ion-datetime-picker','angular-bind-html-compile','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
   $stateProvider.state('submodule',{
      url:'/submodule',
      templateUrl: 'templates/submodule.html',
      controller: 'submoduleCtrl'
    })
    .state('submodule2',{
      url:'/submodule2',
      templateUrl: 'templates/submodule2.html',
      controller: 'submoduleCtrl2'
    })
    .state('login',{
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    }).state('content',{
      url:'/content',
      templateUrl: 'templates/content.html',
      controller: 'contentCtrl'
    }).state('detailNote',{
      url:'/detailNote',
      templateUrl: 'templates/detailNote.html',
      controller: 'detailNoteCtrl'
    }).state('register',{
      url:'/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
   .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('googleMap', {
      url: "/googleMap",
      templateUrl: 'templates/googleMap.html',
      controller: 'googleMapCtrl'
    })
    .state('createNote', {
      url: "/createNote",
      templateUrl: 'templates/createNote.html',
      controller: 'createNoteCtrl'
    })
    .state('forgotPass', {
      url: "/forgotPass",
      templateUrl: 'templates/forgotPass.html',
      controller: 'forgotPassCtrl'
    })


    $urlRouterProvider.otherwise('/login')

})
.service('$firebase', ['firebase',function(firebase) {
  const config = {
    apiKey: "AIzaSyCDYXgsOs-n1dUgsKJ16-E7Hcm6UbNIgkg",
    authDomain: "hallo-42e85.firebaseapp.com",
    databaseURL: "https://hallo-42e85.firebaseio.com",
    storageBucket: "hallo-42e85.appspot.com",
    messagingSenderId: "899590444510"
  };
  
  
  
  firebase.initializeApp(config);
  this.signIn = function(email, password) {
     return firebase.auth().signInWithEmailAndPassword(email,password)
     
 }

 this.signUp = function( email, password) {
   return firebase.auth().createUserWithEmailAndPassword(email,password)
   
    
 }


 this.loginWithGmail = function(email,password) {
   // not implement
 }
 
 this.push = function() {

 }

 this.update = function() {

 }
 this.resetPassword= function(email) {
   const auth = firebase.auth()
  return  auth.sendPasswordResetEmail(email)
 }

 this.getCurrentUser = function() {
   var user = firebase.auth().currentUser;
  if (user) {
    return user
  } else {
   
  }
 }
 this.signOut = function() {
  return firebase.auth().signOut();

 }

 this.pushNote = function(obj) {   
   obj.t=firebase.database.ServerValue.TIMESTAMP    
   return firebase.database().ref('note/'+this.getCurrentUser().uid).push(obj)
  
}

 this.readonce = function() {    
   return  firebase.database().ref('note/'+this.getCurrentUser().uid).once('value')  
 }

}])