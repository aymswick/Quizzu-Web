var app = angular.module('App'); //This line is needed to reference our app.js file


/*
 *  Add New Controllers (Functionality for HTML Elements) Here!
 *   - $variables are predefined by angular
 *   -
 */

app.controller('MainController', function($scope, $mdSidenav) {
  $scope.data = {message: 'Hello'};
  $scope.loggedIn = false;
  $scope.demoStart = false;

  //This is how we define new functional behavior
  $scope.openLeftMenu = function openLeftMenu() {
    $mdSidenav('left').toggle(); //'left' corresponds to the component id defined in html element
  };

  $scope.launchDemoQuiz = function launchDemoQuiz() {
    $scope.demoStart = true;
    $scope.loggedIn = true;
  };


});


app.controller('SideNavController', function($scope, $mdSidenav) {
  //Variables
  $scope.menuItems = ['Home', 'About', 'Settings'];

  //Methods
  this.goHome = function() {
    //Home
    $mdSidenav('left').close(); //Temporary
    window.open(".", "_self")

  };

  this.goAbout = function() {
    //About
    window.open("https://github.com/aymswick/Quizzu-Web/wiki");
  };

  this.goSettings = function() {
    //Settings
  };



});

app.controller('TutorialCardController', function($scope) {
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



});

app.controller('ToastController', function($scope, $mdToast, $mdDialog) {
  $scope.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };
});

/* START QUIZ CONTROLLER */
app.controller('QuizController', function($scope, $mdDialog, $mdToast, $timeout) {
  $scope.current = 0;
  $scope.validation = 'unchecked';
  $scope.score = 0;

  //This is NOT the best way to store quiz data, figure something better out
  $scope.quizzes = [
  {
    title: 'Software Engineering Basics',
    question: 'Which of the following would be best suited for an AGILE development cycle?',
    answers: [ 'Spaceship','Skyscraper','Mobile Social Network',
               'Operating System' ],
    correct: 2, // Index 0, 1, 2, or 3
    button: 'Next'
  },

  {
    title: 'Software Engineering Basics',
    question: 'What is your name?',
    answers: [ 'Kittens','A dump truck','I dunno',
               'Bob' ],
    correct: 3, // Index 0, 1, 2, or 3
    button: 'Finish'
  }
];


  $scope.nextCard = function() {
    $scope.current = ($scope.current + 1) % 4; //Each quiz only has 4 questions right now

    //Reset the colors of the buttons when we move through the quiz
    for(i = 0; i < 4; i++)
    {
      document.getElementById(i).className = document.getElementById(i).className.replace(/\bincorrect\b/,'');
      document.getElementById(i).className = document.getElementById(i).className.replace(/\bcorrect\b/,'');
    }
  };

  $scope.clickAns = function(chosenAnswerIndex, event) {
    $scope.currentQuiz = $scope.quizzes[$scope.current];
    $scope.chosenAnswer = $scope.currentQuiz.answers[chosenAnswerIndex];
    btnId = event.currentTarget.id;

    //Answer = CORRECT
    if(chosenAnswerIndex == $scope.currentQuiz.correct)
    {
      document.getElementById(btnId).className +=' md-hue-1'; //This is green
      console.log('Correct Answer Selected');
      $scope.openToast('correct');
      $scope.score++;
      //$scope.openDialog('correct');

    }

    //Answer = INCORRECT
    else
    {
      //highlight the button red
      console.log('Incorrect Answer Selected');
      document.getElementById(btnId).className +=' incorrect'; //Change selected button to red
      document.getElementById($scope.currentQuiz.correct).className += ' correct'; //Show correct answer
      $scope.openToast('incorrect');
      //$scope.openDialog('incorrect');
    }

  };

  $scope.openDialog = function(type) {
    if(type == 'correct')
    {
      var correctDialog = $mdDialog.confirm()
                    .title('Correct!')
                    .textContent('+10pts')
                    .ok('Nice!')
                    .openFrom('#\\' + btnId)
                    .clickOutsideToClose(true);

      $mdDialog.show(correctDialog).then(function() {
                       $scope.nextCard();
                       }, function() {
                          $scope.nextCard();
                    });
    }

    else if(type == 'incorrect')
    {
      var incorrectDialog = $mdDialog.confirm()
                    .title('Aww, dang!')
                    .textContent('No points awarded')
                    .ok('Move on')
                    .openFrom('#\\' + btnId)
                    .clickOutsideToClose(true);

      $mdDialog.show(incorrectDialog).then(function() {
                       $scope.nextCard();
                       }, function() {
                          $scope.nextCard();
                    });
    }

};

  $scope.openToast = function(type) {
    if(type == 'correct')
    {
      $mdToast.show(
        $mdToast.simple()
          .textContent('You are correct! +10 points')
          .theme('success-toast')
        );
    }

    else if(type == 'incorrect')
    {
      $mdToast.show(
        $mdToast.simple()
          .textContent('You are wrong! No points awarded.')
          .theme('error-toast')
        );
    }
    console.log('toasting');
  };
});
/* END QUIZ CONTROLLER */
