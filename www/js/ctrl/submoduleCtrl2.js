angular.module('moduleControlles')
.controller("submoduleCtrl2", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate) {
   $scope.keyWord_map = [];
    var pyrmont = {lat: 13.168561, lng: 100.927903};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });





$scope.submit = function(){
	var keyWordArray = $scope.keyWord_map.text.split(/ @|@/);
	for(var i =0;i<keyWordArray.length;i++){
	
		//var text = keyWordArray[i].toString();
		if(keyWordArray[i]!=""){
				var request = {
						location: pyrmont,
						radius: '1000',
						query: keyWordArray[i]
					};
				service = new google.maps.places.PlacesService(map);
				service.textSearch(request, callback);
		}
	}
}

  function callback(results, status) {
		
	//	console.log("keyWordArray "+keyWordArray);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
     
        //console.log("input "+$scope.keyWord_map.text)
				
        var longest = longestCommonSubstring($scope.keyWord_map.text,place.name);
         console.log(longest);
				 console.log(place.name);
     if(longest.sequence!=" "){
        //console.log(place);
      }
       
   
   

        createMarker(results[i]);
      }
    }
  }
  function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }
        
  });

function longestCommonSubstring(str1, str2){
	if (!str1 || !str2)
		return {
			length: 0,
			sequence: "",
			offset: 0
		};
 
	var sequence = "",
		str1Length = str1.length,
		str2Length = str2.length,
		num = new Array(str1Length),
		maxlen = 0,
		lastSubsBegin = 0;
 
	for (var i = 0; i < str1Length; i++) {
		var subArray = new Array(str2Length);
		for (var j = 0; j < str2Length; j++)
			subArray[j] = 0;
		num[i] = subArray;
	}
	var thisSubsBegin = null;
	for (var i = 0; i < str1Length; i++)
	{
		for (var j = 0; j < str2Length; j++)
		{
			if (str1[i] !== str2[j])
				num[i][j] = 0;
			else
			{
				if ((i === 0) || (j === 0))
					num[i][j] = 1;
				else
					num[i][j] = 1 + num[i - 1][j - 1];
 
				if (num[i][j] > maxlen)
				{
					maxlen = num[i][j];
					thisSubsBegin = i - num[i][j] + 1;
					if (lastSubsBegin === thisSubsBegin)
					{//if the current LCS is the same as the last time this block ran
						sequence += str1[i];
					}
					else //this block resets the string builder if a different LCS is found
					{
						lastSubsBegin = thisSubsBegin;
						sequence= ""; //clear it
						sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
					}
				}
			}
		}
	}
	return {
		length: maxlen,
		sequence: sequence,
		offset: thisSubsBegin
	};
}