/*
 *  The Application Wide Settings Are Defined Here
 *    - In each new JS file, we must recreate an app variable like this:
 *       var app = angular.module('App'); //This line references the below definition
 *    - Do not make edits to this file, instead do it in controllers.js
 */

var app = angular.module('App', ['ngMaterial', 'ngAnimate']);
app.constant('ENDPOINT_URI', 'http://localhost:3000/api/');
app.service('QuizzesModel', function($http, ENDPOINT_URI) {
  var service = this,
  path = 'quizzes/';
});

app.directive('syncFocusWith', function($timeout, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      focusValue: "=syncFocusWith"
    },
    link: function($scope, $element, attrs) {
      $scope.$watch("focusValue", function(currentValue, previousValue) {
        if (currentValue === true && !previousValue) {
          $element[0].focus();
        } else if (currentValue === false && previousValue) {
          $element[0].blur();
        }
      })
    }
  }
});

app.config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

            var quizzuPrimaryMap = $mdThemingProvider.extendPalette('green', {
              'default' : '27ae60',
              '500': '27ae60',
              'contrastDefaultColor': 'light'

            });

            var quizzuAccentMap = $mdThemingProvider.extendPalette('green', {
              '500': '3498db',
              'contrastDefaultColor': 'light',
              'A200': '3498db' //This value is the accent color in menu

            });

            $mdThemingProvider.definePalette('quizzuPrimary', quizzuPrimaryMap);
            $mdThemingProvider.theme('default').primaryPalette('quizzuPrimary');
            $mdThemingProvider.definePalette('quizzuAccent', quizzuAccentMap);
            $mdThemingProvider.theme('default').accentPalette('quizzuAccent');

    });
