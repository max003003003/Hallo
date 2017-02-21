angular.module('moduleControlles')
.controller("forgotPassCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,AppModules,$firebase) {
   $scope.forgot = [];

    $scope.resetPass = function(){
        $firebase.resetPassword($scope.forgot.email).then(function(res){
   
            $state.go("login");
        }).catch(function(fallback) {
              alert("fail");
        })   
    }
  
});