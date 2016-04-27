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
  $scope.addQuestion = false;

  //This is how we define new functional behavior
  $scope.openLeftMenu = function openLeftMenu() {
    $mdSidenav('left').toggle(); //'left' corresponds to the component id defined in html element
  };

  $scope.launchDemoQuiz = function launchDemoQuiz() {
    $scope.demoStart = true;
    $scope.loggedIn = true;
    $scope.addQuestion = false;
  };

  $scope.launchAddQuestion = function launchAddQuestion() {
    $scope.addQuestion = true;
    $scope.loggedIn = true;
    $scope.demoStart = false;
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

/* ADD QUESTION CONTROLLER */
app.controller('AddQuestionController', ['$scope', function($scope) {
      $scope.userQuestions = {};

      $scope.save = function(question) {
        $scope.userQuestions = angular.copy(question);
      };

    }]);

    /*
  $scope.question = [
    "title": "Quiz",
    "question": "What is the moon made of?",
    "answers": [ "Cheese","Rocks","Money", "Candy" ],
    "correct": 0,
    "button": "Next"
  ];
  $scope.save = function() {
    $scope.msg = 'Data sent: '+ JSON.stringify($scope.question);
  };
});
*/
  /* START QUIZ CONTROLLER */
  app.controller('QuizController', function($scope, $mdDialog, $mdToast, $timeout, $http) {
    $scope.current = 0;
    $scope.validation = 'unchecked';
    $scope.score = 0;

    $http.get('./src/main/data.json').success(function (data){
        $scope.quizzes = data;
    });

    /* ADD QUESTION */
    $scope.addQuestion = function(){
        $scope.quizzes.push({ title:$scope.title, question:$scope.question, answers:$scope.answers,
          correct: $scope.correct, button: $scope.button});
    }

    /* QUESTION COUNT*/
    $scope.getTotalQuestions    =   function(){
        return $scope.quizzes.length;
    }

    /* QUESTION TITLE REVERSE */
    $scope.reversedMessage  =   function(){
        return $scope.quizzes.title.split("").reverse().join("");
    }

    $scope.incrementScore = function(){
      return $scope.score = $scope.score + 1;
    }

    $scope.getCurrentScore = function() {
      return $scope.score;
  };

  $scope.nextCard = function() {
    $scope.current = ($scope.current + 1) % $scope.getTotalQuestions(); //Each quiz only has 4 questions right now

    //Reset the colors of the buttons when we move through the quiz
    for(i = 0; i < 4; i++)
    {
      document.getElementById(i).className = document.getElementById(i).className.replace(/\bincorrect\b/,'');
      document.getElementById(i).className = document.getElementById(i).className.replace(/\bcorrect\b/,'');
      document.getElementById(i).className = document.getElementById(i).className.replace(/\bmd-hue-1\b/,'');
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
      $scope.score += 10;
      //$scope.openDialog('correct');
      console.log($scope.score);
      document.getElementById("score").innerHTML = "Score: " + $scope.score; // set html element
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
          .position('bottom', 'bottom')
          .theme('success-toast')
        );
    }

    else if(type == 'incorrect')
    {
      $mdToast.show(
        $mdToast.simple()
          .textContent('You are wrong! No points awarded.')
          .position('bottom', 'bottom')
          .theme('error-toast')
        );
    }
    console.log('toasting');
  };
});
/* END QUIZ CONTROLLER */
