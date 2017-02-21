angular.module('moduleControlles')
.controller("createNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,AppModules,$firebase,$cordovaLocalNotification) {
    $scope.createNote = [];
    $scope.goToContent = function(){
        $state.go("content");
    }
    $scope.back =function(){
        $state.go("login");
    }
  



 
     $scope.scheduleInstantNotification = function () {
       console.log("hello")
      $cordovaLocalNotification.schedule({
      id: 1,
      text: 'Instant Notification',
      title: 'Instant'
    }).then(function () {
      alert("Instant Notification set");
    });
  };


ionic.Platform.ready(function(){
   
$scope.scheduleEveryMinuteNotification = function () {

  var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);
      var _20SecondsFromNow = new Date(now + 20 * 1000);
      var _30SecondsFromNow = new Date(now + 30 * 1000);
      var _40SecondsFromNow = new Date(now + 40 * 1000);
      
    $cordovaLocalNotification.schedule([{
    id: 3,
    title: '10 second  ',
    text: 'Give a real message',
     at: _10SecondsFromNow
    },{
    id: 4,
    title: '15 second',
    text: 'Give a real message',
     at: _20SecondsFromNow
    }, {id: 5,
    title: '20 second  ',
    text: 'Give a real message',
     at: _30SecondsFromNow
    },{
    id:6,
    title: '30 second',
    text: 'Give a real message',
   at: _40SecondsFromNow
    }]).then(function (result) {
    console.log('Every Minute Notification Set');
    });
}; 
  });





 $scope.done =function(){
                   console.log("active1" + $scope.activeColor1);
                 console.log("active2" + $scope.activeColor2);
                  console.log("active3" + $scope.activeColor3);
                  var colorNote;
                  if($scope.activeColor1!=""){
                      colorNote = "card1";
                  }else if ($scope.activeColor2!=""){
                      colorNote = "card2";
                  }else  if($scope.activeColor3!=""){
                      colorNote = "card3";
                  }
                AppModules.detailNote =({t:"",n:$scope.createNote.detail,d:new Date(),c:colorNote});
              AppModules.listNoteForRender.push({detail:$scope.createNote.detail});
     
               console.log(AppModules.detailNote);
               
                $firebase.pushNote(AppModules.detailNote).then(function(res){
                     $state.go("content");
                }).catch(function(fallback) {
                    alert("fail");
                })
                
             
               
  }
   $scope.activeColor1 = "active1"
  $scope.changeColor1 = function(){
       $scope.activeColor1 = "active1"
       $scope.activeColor2 = ""
       $scope.activeColor3 = ""
  }
   $scope.changeColor2 = function(){
        $scope.activeColor1 = ""
       $scope.activeColor2 = "active2"
       $scope.activeColor3 = ""
  }
   $scope.changeColor3 = function(){
        $scope.activeColor1 = ""
       $scope.activeColor2 = ""
       $scope.activeColor3 = "active3"
  }


});