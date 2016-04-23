var app = angular.module('App'); //This line is needed to reference our app.js file


/*
 *  Add New Controllers (Functionality for HTML Elements) Here!
 *   - $variables are predefined by angular
 *   -
 */

app.controller('MainController', function($scope, $mdSidenav) {
  $scope.data = {message: 'Hello'};


  //This is how we define new functional behavior
  $scope.openLeftMenu = function openLeftMenu() {
    $mdSidenav('left').toggle(); //'left' corresponds to the component id defined in html element
  }
});


app.controller('SideNavController', function($scope, $mdSidenav) {
  //Variables
  $scope.menuItems = ['Home', 'About', 'Settings'];

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

app.controller('CardController', function($scope) {
  //Variables
  $scope.buttonText = 'Next';

  $scope.cards = [{
    title: 'Welcome to Quizzu,',
    subtitle: 'the social trivia game for college students!',
    button: 'Next',
    pic: '' //put something here

  },

  {
    title: 'Challenge your friends',
    subtitle:'to trivia about class content',
    button: 'Next',
    pic: '' //put something here
  },

  {
    title: 'Study in style',
    subtitle: 'with community-submitted quizzes',
    button: 'Login',
    pic: '' //put something here
  }

  ];

  $scope.current = 0;

  $scope.nextCard = function() {
    if($scope.cards[$scope.current].button == 'Login')
    {
      window.open('login.html', '_self') //Go to the login page
    }

    else
    {
      $scope.current = ($scope.current + 1) % $scope.cards.length;
    }

  };

  $scope.previousCard = function() {
    $scope.current = ($scope.current - 1) % $scope.cards.length;
  };


})
