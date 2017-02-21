angular.module('moduleControlles')

.controller("detailNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,AppModules,$interval,$wordCut) {
    $scope.suggestGoogleMap = []; 
    $scope.suggestGoogleMap.word = AppModules.listNoteForRender[AppModules.seqNote].n;    
    var splitWord  = $wordCut.splitWordWithPlusSign($scope.suggestGoogleMap.word);
    console.log('tes',$scope.suggestGoogleMap.word)
console.log(splitWord);

  $scope.setDirectiveFn = function(data){
      $scope.directiveFn = data;
       
   } 

    $scope.changeTime = function(date) {  
        $scope.time = date; 
        var localtime = moment(date).locale('th').format('dddd');
        $scope.suggestGoogleMapBind = $scope.suggestGoogleMapBind.toString().replace(AppModules.dateInput,'<a href="#">'+localtime+'</a>');
        $scope.suggestGoogleMapBind = $sce.trustAsHtml($scope.suggestGoogleMapBind.toString());
        console.log(AppModules.dateInput);
    }

       
       
       $scope.specialWord =function(){
           //console.log($scope.suggestGoogleMap.word);
          var specialWord = $scope.suggestGoogleMap.word.match(/[@]|[+]/);
           if($scope.suggestGoogleMap.word.match(/[@]|[+]/)){
               /* $scope.suggestGoogleMap.word = $scope.suggestGoogleMap.word.toString().replace(specialWord,'<i style="color:red">'+specialWord+'</i>');*/
              /*  $scope.suggestGoogleMap.word= $sce.trustAsHtml($scope.suggestGoogleMap.word.toString());*/
               
         


               //console.log("finish");
           }
           
       }
    
        /*$scope.suggestGoogleMap.word = $scope.suggestGoogleMap.word.toString().replace(suggestTime,'<a href="#">'+suggestTime+'</a>');*/

      

        var pyrmont = {lat: 13.168561, lng: 100.927903};
        var map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        $scope.swichContent = true;
        $scope.back =function(){
            $state.go("content");
        }
        var suggestTime="";
        var character = "'";
        var arraySuggetTime = [];
        var countTimeseq = 0;
        $scope.time = 0;
      
           
          
                console.log(JSON.stringify(splitWord));
                console.log(splitWord);
                angular.forEach(splitWord, function(value, key) {
                      
               /* console.log(value.output[0].get('date')); */
                var keyWordPrefix =  value.input.match(/[@]*.[^@]*/);
                console.log("keywordPrefix"+keyWordPrefix);
                var pattern = new RegExp(keyWordPrefix+"|@|และ|กับ| ");
                var keyWordArray =  value.input.split(pattern);
                console.log(keyWordArray);
                    for(var i =0;i<keyWordArray.length;i++){
                     
                           
            
                           
                       
                        if(keyWordArray[i]!=""){
                            suggestTime = value.resultdate[0];
                            console.log("suggestTime-->"+suggestTime);
                            countTimeseq = countTimeseq+1;
                            arraySuggetTime.push({timeSeq:"time"+countTimeseq,time:value.output});
                            $scope.suggestGoogleMap.word = $scope.suggestGoogleMap.word.toString().replace(suggestTime,'<i ng-click="directiveFn()" onclick="goTOTime('+character+"time"+countTimeseq+character+","+character+suggestTime+character+')" style="color:orange;text-decoration: underline;text-decoration-color: orange;-moz-text-decoration-color: orange;">'+suggestTime+'</i>');

                           
                         
                             //console.log(keyWordArray[i]);
                                var request = {
                                        location: pyrmont,
                                        radius: '10000',
                                        query: keyWordArray[i]
                                    };
                                service = new google.maps.places.PlacesService(map);
                                service.textSearch(request, callback);
                        }
                    }
                });

        function callback(results, status) {
     
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                    
                        //console.log("input "+$scope.keyWord_map.text)
                        var longest = longestCommonSubstring($scope.suggestGoogleMap.word,place.name);
                        //console.log(longest);
                          console.log("longestSeq"+longest.sequence);
                    if(longest.sequence!=" "){
                        console.log(place);
                      
                        AppModules.coordinatesPlace.push({coordinatesPlace:results[i],place:longest});
                            $scope.suggestGoogleMap.word = $scope.suggestGoogleMap.word.toString().replace("@"+longest.sequence,'<p id="coordinatesPlace" onclick="goTOGooGleMap('+character+longest.sequence+character+');" style="display:inline-block;color:red;text-decoration: underline;text-decoration-color: red;-moz-text-decoration-color: red;">@'+longest.sequence+'</p>');
                    }
                                   
                            
                }
                $scope.swichContent = false;
                $scope.suggestGoogleMapBind = $sce.trustAsHtml($scope.suggestGoogleMap.word.toString());
            }
             
        }
        $scope.done =function(){
             $state.go("content");    

        }

        goTOGooGleMap = function(targetCoordinatesPlace) {

            console.log("targetCoodinatesPlace-->"+targetCoordinatesPlace);
          
            for(var i = 0 ; i<AppModules.coordinatesPlace.length;i++){
                console.log(AppModules.coordinatesPlace[i].place.sequence);
                    if(targetCoordinatesPlace == AppModules.coordinatesPlace[i].place.sequence){
                        AppModules.individualOfcoordinatesPlace = AppModules.coordinatesPlace[i].coordinatesPlace;
                    }
            }
          
            $state.go("googleMap");
        }
        
        $scope.timeUpdate=[];
 
        $scope.$watch( 
            // ฟังก์ชั่นนี้จะ return ค่าที่ทำการติดตามอยู่ โดยจะถูกเรียกทุกครั้งที่มีการเรียก digest()
            function () {
                return $scope.timeUpdate.date;
            },// ฟังก์ชั่นนี้จะถูกเรียกใช้ เมื่อมีการเปลี่ยนแปลงค่า
            function ( newValue, oldValue ) { 
                console.log(newValue);
            }
        );
   
        
        goTOTime = function(timeseq,dateInput){
            for(var i = 0 ;i<arraySuggetTime.length;i++){
              if(timeseq==arraySuggetTime[i].timeSeq){
                var date = arraySuggetTime[i].time[0].get('date');
                var month = arraySuggetTime[i].time[0].get('month');
                var year = arraySuggetTime[i].time[0].get('year');
                $scope.time = new Date(year, month, date, 14, 57, 0);
                
              }
            }
            AppModules.dateInput = dateInput;
        }
     

})
