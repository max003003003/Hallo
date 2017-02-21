angular.module('moduleControlles')
.controller("registerCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,AppModules,$firebase) {
    $scope.regis = [];
    $scope.goToContent = function(){
        $state.go("content");
    }
    $scope.back =function(){
    
        $state.go("login");
    }
    $scope.signUp = function(){
        AppModules.registerData = {Email:$scope.regis.EMAIL,PASS:$scope.regis.PASSWORD};
          console.log("email"+$scope.regis.EMAIL);
           console.log("pass"+$scope.regis.PASSWORD);
        $firebase.signUp($scope.regis.EMAIL,$scope.regis.PASSWORD).then(function(res){
   
            $state.go("content");
        }).catch(function(fallback) {
              alert("fail");
        })
      
        
    }
  
});