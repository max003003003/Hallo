angular.module('moduleControlles')
.controller("loginCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,$firebase) {
  $scope.login = [];


    $scope.$watch( 
        function () {
            return $firebase.getCurrentUser();
        },
        function ( newValue, oldValue ) { 
            console.log(newValue);
            if(newValue!==undefined){
                $state.go("content");
            }
        }
    );
        if($firebase.getCurrentUser()===undefined){
    console.log("adsdasdas"+$firebase.getCurrentUser());
        }else{
            $state.go("content");
        }

    $scope.goToContent = function(){
         console.log($firebase.getCurrentUser());
        if($firebase.getCurrentUser()===undefined){
            $firebase.signIn($scope.login.userName,$scope.login.passWord)
            .then(function(res){
                $state.go("content");
            }).catch(function(fallback) {
                alert("fail");
            })

        }else{
            $state.go("content");
        }
    }
   
     $scope.goToRegister = function(){
        $state.go("register");
    }
    $scope.goToOut= function(){
        console.log($firebase.getCurrentUser());
        $firebase.signOut().then(function(res){
        }).catch(function(fallback) {
            
        })
    }
   console.log($firebase.getCurrentUser());

    $scope.goToforgotPass= function(){
        $state.go("forgotPass");
    }
 
});