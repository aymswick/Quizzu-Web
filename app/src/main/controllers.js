var app = angular.module('App'); //This line is needed to reference our app.js file


/*
 *  Add New Controllers (Functionality for HTML Elements) Here!
 *   - $variables are predefined by angular
 *   -
 */

app.controller('MainController', function($scope, $mdSidenav) {
  $scope.data = {message: 'Hello'};
  var menuItems = ['Home', 'About', 'Settings'];




  //This is how we define new functional behavior
  $scope.openLeftMenu = function openLeftMenu() {
    $mdSidenav('left').toggle(); //'left' corresponds to the component id defined in html element
  }
});


app.controller('SideNavController', function($scope, $mdSidenav) {
  //Variables


  //Methods
  this.goHome = function() {
    //Home
    $mdSidenav('left').close(); //Temporary
    window.open(".", "_self")

  }

  this.goAbout = function() {
    //About
    window.open("https://github.com/aymswick/Quizzu-Web/wiki");
  }

  this.goSettings = function() {
    //Settings
  }



});

app.controller('CardController', function() {
  //Variables
  this.cardNumber = 1;
  this.cards = [{
    title: 'Welcome to Quizzu,'


  }];

  //Methods
  this.setCard = function(selectedCard) {
    this.cardNumber = selectedCard;
  };

  this.nextCard = function(cardNum) {
    this.cardNumber = cardNum +1;
  }

})
