/*
 *  The Application Wide Settings Are Defined Here
 *    - In each new JS file, we must recreate an app variable like this:
 *       var app = angular.module('App'); //This line references the below definition
 *    - Do not make edits to this file, instead do it in controllers.js
 */

var app = angular.module('App', ['ngMaterial', 'ngAnimate']);

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
