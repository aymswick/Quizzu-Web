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
/*
app.controller('jsonCtrl', function($scope, $http){
    $http.get('data.json').success(function (data){
        $scope.quiz = data;
    });

    $scope.addQuestion = function(){
        $scope.quiz.push({ title:$scope.empName, question:$scope.question, answers:$scope.answers,
          correct: $scope.correct, button: $scope.button});
    }

    $scope.getTotalQuestions    =   function(){
        return $scope.quiz.length;
    }

    $scope.reversedMessage  =   function(){
        return $scope.empName.split("").reverse().join("");
    }

});

app.service("quizService", function($http, $q)
{
  var deferred = $q.defer();
  $http.get('./src/main/data.json').then(function(data)
{
  deferred.resolve(data);
});

this.getQuestions = function ()
{
  return deferred.promise;
}
})

.controller("quizCtrl", function($scope, quizService)
{
  car promise = quizService.getQuestions();
  promise.then(function(data)
  {
    $scope.quiz = data;
    console.log($scope.quiz);
  });
})
*/


/* START QUIZ CONTROLLER */
app.controller('QuizController', function($scope, $mdDialog, $mdToast, $timeout, $http) {
  $scope.current = 0;
  $scope.validation = 'unchecked';
/*
  $scope.quizzes = [
  {
    title: 'Software Engineering Basics',
    question: 'Which of the following would be best suited for an AGILE development cycle?',
    answers: [ 'Spaceship','Skyscraper','Mobile Social Network',
               'Operating System' ],
    correct: 2, // Index 0, 1, 2, or 3
    button: 'Next'
  }
  ];
*/
  $http.get('./src/main/data.json').success(function (data){
      $scope.quizzes = data;
  });

  $scope.addQuestion = function(){
      $scope.quizzes.push({ title:$scope.title, question:$scope.question, answers:$scope.answers,
        correct: $scope.correct, button: $scope.button});
  }

  $scope.getTotalQuestions    =   function(){
      return $scope.quizzes.length;
  }

  $scope.reversedMessage  =   function(){
      return $scope.title.split("").reverse().join("");
  }


  //This is NOT the best way to store quiz data, figure something better out

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

    if(chosenAnswerIndex == $scope.currentQuiz.correct)
    {
      //alert('CORRECT');
      //highlight the button green
      document.getElementById(btnId).className +=' md-hue-1'; //This is green
      console.log('Correct Answer Selected');

      //Correct Answer Dialog
      $scope.openDialogCorrect();
      //$scope.openToast();

    }

    else
    {
      //alert('Incorrect');
      //highlight the button red
      console.log('Incorrect Answer Selected');
      document.getElementById(btnId).className +=' incorrect'; //Change selected button to red
      document.getElementById($scope.currentQuiz.correct).className += ' correct'; //Show correct answer

      //Incorrect Answer Dialog
      $scope.openDialogIncorrect();
    }

  };

  $scope.openDialogCorrect = function() {
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
};

  $scope.openDialogIncorrect = function() {
    var correctDialog = $mdDialog.confirm()
                  .title('Aww, dang!')
                  .textContent('No points awarded')
                  .ok('Move on')
                  .openFrom('#\\' + btnId)
                  .clickOutsideToClose(true);

    $mdDialog.show(correctDialog).then(function() {
                     $scope.nextCard();
                     }, function() {
                        $scope.nextCard();
                  });
  };

  //This function has not been used anywhere yet
  //I want to have colored toasts instead of dialogs
  $scope.openToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Toast example yo')
        .theme('create one in app.js using $themeprovider or whatever')
      );



    console.log('toasting');
  };
});
/* END QUIZ CONTROLLER */
