<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en" ng-app="App">
  <head>
    <title>Quizzu</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />

    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic'>
    <link rel="stylesheet" href="../node_modules/angular-material/angular-material.css"/>
    <link rel="stylesheet" href="assets/app.css"/>
    <link rel="stylesheet" href="src/css/styles.css" />

    <style type="text/css">
        /**
         * Hide when Angular is not yet loaded and initialized
         */
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
          display: none !important;
        }
    </style>

    <script src="../node_modules/angular/angular.js"></script>
    <script src="../node_modules/angular-animate/angular-animate.js"></script>
    <script src="../node_modules/angular-aria/angular-aria.js"></script>
    <script type="text/javascript" src="../node_modules/angular-material/angular-material.js"></script>

    <!--Quizzu Files MUST GO AFTER ANGULAR FRAMEWORK SCRIPTS ARE CALLED -->
    <script src="./src/main/app.js"></script>
      <script src="./src/main/controllers.js"></script>

  </head>

  <body ng-controller="MainController as mc" layout="column" ng-cloak >

  <div flex layout="column"  tabIndex="-1" role="main" class="md-whiteframe-z2">

    <!-- Top Toolbar -->
    <md-toolbar layout="row" class="md-whiteframe-z2">
      <div class="md-toolbar-tools">
        <md-button id="menuButton" class="menu" aria-label="Open Menu" ng-click="openLeftMenu()">
          <md-icon md-svg-icon="menu" ></md-icon>
        </md-button>
        <span flex></span>
        <h2><span>Quizzu</span></h2>
        <span flex></span>
      </div>

    </md-toolbar>

    <!-- Sidenav Menu -->
    <md-sidenav md-component-id="left" class="md-sidenav-left">
      <md-toolbar>
       <h1 class="md-toolbar-tools">Quizzu Menu</h1>
      </md-toolbar>
      <md-content layout-padding ng-controller="SideNavController as sc">
        <div layout="column" layout-fill layout-align="top center">
          <md-button class="md-accent md-raised" ng-click="sc.goHome()">{{menuItems[0]}}</md-button>
          <md-button class="md-accent md-raised" ng-click="sc.goAbout()">{{menuItems[1]}}</md-button>
          <md-button class="md-accent md-raised" ng-click="sc.goSettings()">{{menuItems[2]}}</md-button>
        </div>
      </md-content>
    </md-sidenav>

    <!-- Main Content of Index Page -->

    <md-content flex id="content">
      <md-tabs md-dynamic-height="true" md-border-bottom>
        <div flex layout="row" layout-align="center center">
        <md-tab flex label="Take Quiz">

          <!-- Instructional Cards! -->
          <div flex flex-xs layout="row" layout-align="center center" ng-controller="TutorialCardController as tc" ng-hide="loggedIn">
          <md-card flex md-theme="default" layout-align="bottom bottom">
            <md-card-title>
              <md-card-title-text>
                <span class="md-headline">{{cards[current].title}}</span>
                <span class="md-subhead">{{cards[current].subtitle}}</span>
              </md-card-title-text>
              <md-card-title-media>
                <div class="md-media-lg card-media"></div>
              </md-card-title-media>
            </md-card-title>

            <md-card-actions layout="row" layout-align="end center">
              <md-button class="md-accent" ng-click="previousCard()">Previous</md-button>
              <md-button class="md-raised md-primary" ng-click="nextCard()">{{cards[current].button}}</md-button>
            </md-card-actions>
          </md-card>
        </div>
        <md-button flex class="md-raised md-primary" ng-click="launchDemoQuiz()" ng-hide="demoStart">asdf</md-button>
          <!-- Score Card -->
          <div flex flex-xs flex-get-xs='100' layout="column" layout-align="right right"
            ng-controller="QuizController as quiz" class="score-card" ng-show="demoStart">

            <md-card flex md-theme="default" id = 'scoreCard'>
              <md-card-title>
                <md-card-title-text>
                  <span class="md-headline">Score: {{getCurrentScore()}}</span>
                </md-card-title-text>
              </md-card-title>


            </md-card>
          </div>

            <!-- Demo Quiz Cards -->
            <div flex flex-xs flex-gt-xs="100" layout="row"
                 layout-align="center top" ng-controller="QuizController as quiz" class="quiz-card" ng-show="demoStart">
            <md-card flex md-theme="default" id='quizCard'>
              <md-card-title>
                <md-card-title-text>
                  <span class="md-headline">{{quizzes[current].title}}</span>
                  <span class="md-subhead">{{quizzes[current].question}}</span>
                </md-card-title-text>
              </md-card-title>
                <div flex layout="column">
                  <md-button flex id='0' class="md-raised md-accent quiz-button" ng-click="clickAns(0, $event)">{{quizzes[current].answers[0]}}</md-button>
                  <md-button flex id='1' class="md-raised md-accent quiz-button" ng-click="clickAns(1, $event)">{{quizzes[current].answers[1]}}</md-button>
                  <md-button flex id='2' class="md-raised md-accent quiz-button" ng-click="clickAns(2, $event)">{{quizzes[current].answers[2]}}</md-button>
                  <md-button flex id='3' class="md-raised md-accent quiz-button" ng-click="clickAns(3, $event)">{{quizzes[current].answers[3]}}</md-button>
                </div>
              <md-card-actions layout="row" layout-align="end center">
                <md-button class="md-accent" ng-click="pass()">Pass (0pts)</md-button>
                <md-button class="md-raised md-primary" ng-click="nextCard()">{{quizzes[current].button}}</md-button>
              </md-card-actions>
            </md-card>
          </div>

        </md-content>
        </md-tab>

        <md-tab label="Create a Quiz" md-dynamic-height="true">
          <md-content class="md-padding">

            <form action="./uploadData.php" method="post">
              <!-- Input Quiz Title -->
              <div layout="row" flex-gt-xs>
                <md-input-container layout-gt-xs="row" class="md-block">
                <label>Quiz Title</label>
                <input name="title">
                </md-input-container>

                <!-- Input Question -->
                <md-input-container>
                <label>Question</label>
                <input name="question">
                </md-input-container>

                <!-- Input Answers -->
                <md-input-container>
                <label>Answer A</label>
                <input name="answer1">
                </md-input-container>
                <md-input-container>
                <input type="radio" name="correct" value="1"/>
                </md-input-container>
                <br />

                <md-input-container>
                <label>Answer B</label>
                <input name="answer2">
                </md-input-container>
                <md-input-container>
                <input type="radio" name="correct" value="2"/>
                </md-input-container>
                <br />

                <md-input-container>
                <label>Answer C</label>
                <input name="answer3">
                </md-input-container>
                <md-input-container>
                <input type="radio" name="correct" value="3"/>
                </md-input-container>

                <md-input-container>
                <label>Answer D</label>
                <input name="answer4">
                </md-input-container>
                <md-input-container>
                <input type="radio" name="correct" value="4"/>
                </md-input-container>

                <md-button>Submit</md-button>
              </form>
            </div>
          </md-content>
        </md-tab>

        <md-tab label="Bonus">

        </md-tab>
      </md-tabs>
    </div> <!-- End Main Content Div -->
  </div>
  </body>
</html>
