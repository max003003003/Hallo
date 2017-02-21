angular.module('moduleControlles')

.controller("contentCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,$ionicSideMenuDelegate,AppModules,$firebase,$firebaseArray) {
    
    $scope.listNote = AppModules.listNoteForRender;
    $scope.today = true;
    $scope.goToDetailNote = function(seqNote){
      console.log("seqNote-->"+seqNote);
      AppModules.seqNote = seqNote;
     
      $state.go("detailNote");
    }
   
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.SIGNOUT =  function(){
        $firebase.signOut().then(function(res){
            $state.go("login");
        }).catch(function(fallback) {
             
        }) 
        
      }
          $scope.activeToday = 'active';
          $scope.activeAll = '';
      $scope.goTOCreateNote = function(){   
        $state.go("createNote");
      }
       $scope.switchContentAll = function(){ 
          $scope.All = true;
          $scope.today = false;
          $scope.activeToday = '';
          $scope.activeAll = 'active';
          /*
          $firebase.readonce().then(function(res){
            $scope.$apply(function(){
              $scope.listNote = res.val();
              firebase.database().ref('note/'+this.getCurrentUser().uid)
              console.log("dataRes"+JSON.stringify($scope.listNote));
            })
            
          }).catch(function(fallback) {
                    alert("fail");
          })
*/
          var res = firebase.database().ref('note/'+$firebase.getCurrentUser().uid);
          var query = res.orderByChild("timestamp");
           $scope.listNote = $firebaseArray(query);
AppModules.listNoteForRender = $scope.listNote;
           console.log($scope.listNote);

       }
      $scope.switchContentToday = function(){ 
          $scope.today = true;
          $scope.All = false;
           $scope.activeAll = '';
           $scope.activeToday = 'active';
       }

   
})

