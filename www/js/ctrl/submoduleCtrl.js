angular.module('moduleControlles')
.controller("submoduleCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup) {

var text3 = ['จันทร์ นี้ ไป โร ','มีนา 29 ไป สอบ 9 โมง ','เมษา จ่ายค่าบ้าน ','วันที่ 5 มีนาคม  ',' ตอนเย็นวันจะไปกินข้าว',' พุทธ นี้ ไป แมคโคร ตอนตี 3',' ของวันมะรืน ','ในวันแรกของเดือนมกราจะไป ดูหนัง ','อีก 15 นาทีไป โร','อีก 15 นาทีหลังเที่ยงคืนของวันศุกร์จะนอน ','วันที่ 29 กุมภาพันธ์ เป็นวันเกิด','วันจันทร์ ที่ 12 เดือน กุมภา ไปนอก','วันศุกร์ 24 มีนา ','วันที่ 2  ธันวา','9:00 น. วันจันทร์คืนหนังสือนะ','วันจันทร์ ที่ 12  11:00 นาฬิกา']

const cutNull = function (s){
  return s!==null&& s!==undefined 
}
const isSpace = function(v){         
       return (v!=="")&&(v!==" ")&&(v!=="   ")
}
const cutNumber = function(v) {
  return !(/^([0-9]|[0-9][0-9])/.test(v)) 
}

function timeRegex(s) {
     const regexTime =  /([1-2][0-9]|[0-9])(   |  | |)โมง/gi
     const regexTime2 = /(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])/gi
     const regexTime3 = /(1?[0-9]|2[0-3]):[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi
     const regexTime4 = [ regexTime, regexTime2, regexTime3 ]
     const resultTimeRegex = regexTime4.map((v)=> s.match(v)).filter(cutNull) 
     console.log('resulttime',resultTimeRegex)
     return  resultTimeRegex[0]
}
 
//for extract date from sentense parameter is array of sentense 
function dateRegex (s) { 
     const answer = {}
     const regexPattern = [ /(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)/gi     
     ,/(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|กุมภาพันธ์|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)/gi
     ,/(วันที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)/gi
     ,/(วันที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)/gi
     ,/(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|)(   |  | |)(แรก|พรุ่งนี้|มะรืน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)/gi 
     ,/(วัน|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์|แรก|พรุ่งนี้|มะรืน|)(   |  | |)(เดือน|ของเดือน|)(   |  | |)(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา|)(   |  | |)(คม|ยน|)(   |  | |)(ที่|)(   |  | |)([1-3][0-9]|[0-9]|)/gi 
     ,]
      
    const resulRegex = regexPattern.map((v)=> s.match(v).filter(isSpace))      
    console.log(resulRegex)
    const size = resulRegex.map((v)=> v.length )   
    return resulRegex[size.indexOf(Math.min(...size))].map((c) => c.trim()).filter(cutNumber) 
}


const ab=text3.map( dateRegex )
const ac=text3.map( timeRegex )

console.log('=========================Date===================================')
ab.forEach((v)=>{
  console.log(v)
})

console.log("===========================Time================================")
ac.forEach((v) =>{
  console.log(v)
})

console.log("========start test =================")
console.log(ab.map((v) => convertDateToNumber(v)) )

//console.log(ac.map((v) => convertTime(v)) )

function convertDateToNumber( s ) { 
    console.log(s)
    const date = [/จันทร์/,/อังคาร/,/พุทธ/,/พฤหัส/,/ศุกร์/,/เสาร์/,/อาทิตย์/]
    const dateNumbers = /(\d\d|\d)/
    const month = [/มกรา/,/กุมภา/,/มีนา/,/เมษา/,/พฤษภา/,/มิถุนา/,/กรกฎา/,/สิงหา/,/กันยา/,/ตุลา/,/พฤศจิกา/,/ธันวา/]
   
    const dateresult= date.map( (v , j)=> {
      if(v.test(s) !== false )
      {
        return j+1
      }    
    }).filter(cutNull)
    const monthresult = month.map( (v , j)=>{
     if(  v.test(s) !== false )
      {
        return j+1
      }
  }).filter(cutNull)
    
    const dateNumberresult = s.map((v)=>{     
      const cv= v.match(dateNumbers) 
      if(cv !== null) 
      return  cv[0]      
     else return '' } ).filter(isSpace) 
    
   const result= { 'datenumber':  parseInt( dateNumberresult[0]) , 'date': dateresult[0] ,  'month': monthresult[0]  }
   console.log(result)

 
}


function convertTime( s ) {
    if (s===[] ) return 
     const regexTime =  /([1-2][0-9]|[0-9])(   |  | |)โมง/gi


     if(regexTime.test(s) !== false )
     {
       const result = /(\d\d|\d)/
       const resultMatch = s.match(result)
       console.log(resultMatch[0])
     }

     const regexTime2 = /(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])/gi

     const regexTime3 = /(1?[0-9]|2[0-3]):[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi

}
    var dataTime=[];
    var textInput = "วันนี้ไปกินข้าวตอน 6 โมง 10 นาที";
    var newStr = "";
    newStr = textInput;
      /*
    textInput =  textInput.split(" ");


  
    for(var i = 0;i<textInput.length;i++){
        newStr =  newStr+ textInput[i];
    }
*/
dataTime.push({ hour : 6 ,minute : 10,time:""});
var currentDate = new Date();
var hour = currentDate.getHours();
var minute = currentDate.getMinutes();
for(var i = 0 ;i<dataTime.length;i++){
    var patternInput = new RegExp(dataTime[i].hour+"[ |  |   ]"+"โมง"+"[ |   |    ]"+dataTime[i].minute);
    if(hour>dataTime[i].hour&&minute>dataTime[i].minute){
        dataTime[i].time=="เย็น";
        $scope.newtextInput = newStr.replace(patternInput,dataTime[i].hour+" โมง "+'<a href="#" onclick="selectTime();"> เย็น </a>'+dataTime[i].minute);   
    }else{
        dataTime[i].time=="เช้า";
        $scope.newtextInput = newStr.replace(patternInput,dataTime[i].hour+" โมง "+'<a href="#" onclick="selectTime();"> เช้า </a>'+dataTime[i].minute);   
    }
        $scope.newtextInput = $sce.trustAsHtml($scope.newtextInput);
}

for(var i = 0 ;i<dataTime.length;i++){
 var confirmPopup = $ionicPopup.confirm({
            title: 'คำแนะนำ',
            template: '<center style="color:black">เวลาเป้าหมายของคุณคือ<br>'+dataTime[i].hour+" โมง"+dataTime[i].time+" "+dataTime[i].minute+" นาที</center>",
            buttons: [
                {   text: 'SUBMIT',
                    type: 'button-positive'
        
                },
                {   text: 'EDIT',
                    type: 'button-assertive'
                },
                 
            ]
        });

        confirmPopup.then(function(res) {
            if(res) {
            console.log('Submit');
            } else {
            selectTime();
            console.log('Edit');
            }
        });
}

selectTime =function(){
    for(var i = 0 ;i<dataTime.length;i++){
        if(dataTime[i].time=="เย็น"){
            $scope.newtextInput = newStr.replace(patternInput,dataTime[i].hour+" โมง "+'<select><option>เย็น</option><option>เช้า</option></select>'+dataTime[i].minute);
        }else{
            $scope.newtextInput = newStr.replace(patternInput,dataTime[i].hour+" โมง "+'<select><option>เช้า</option><option>เย็น</option></select>'+dataTime[i].minute);
        }   
        $scope.newtextInput = $sce.trustAsHtml($scope.newtextInput);
    }
}

 

});