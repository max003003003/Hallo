angular.module('moduleControlles')
.service('$wordCut',function() {
    

const regexDay = /(|วัน)(| |  |   |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)/gi
const regexDay2 = /(วัน|)(| |  |   |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(ที่|)(   |  | |)([0-9]|[0-9][0-9]|)/gi
const regexTime =  /([0-9]|[0-9][0-9])(| |  |   |)โมง/gi
const regexTime2 = /(ตี|บ่าย)(| |  |   |)([0-9]|[0-9][0-9])/gi
const regexTime3 = /([0-9]|[0-9][0-9])(|  |   )(.|:)(|  |   )([0-9][0-9])(| |  |   )(น|น.|นาฬิกา|)/gi
const regexDate = /วันที่(| |  |   )([1-9]|[0-9][0-9])/gi
const regexMonth = /(|เดือน)(| |  |   )(มกรา|กุมภา|มีนา|เมษา|พฤษภา|มิถุนา|กรกฎา|สิงหา|กันยา|ตุลา|พฤศจิกา|ธันวา)(คม|ยน|)/gi
const regexDay3 = /(วัน|วันที่|)(   |  | |)(จันทร์|อังคาร|พุทธ|พฤหัส|ศุกร์|เสาร์|อาทิตย์)(   |  | |)(ที่)(   |  | |)([0-9]|[0-9][0-9]|)/gi

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
}
var text3 = [ '31 เมษายน','10 ไป10','7 โมงเช้า 6โมงเจอกัน ','10.00 บ่าย 3 บ่าย 4 โมง 3 ทุ่ม 9.56 น. ตี 2  6 โมงเย็น ','จันทร์ นี้ ไป โร 9 โมง  11:00 น.' ,'7 โมงงง','ธันวา','มีนา 29 ไป สอบ 9 โมง ','เมษา จ่ายค่าบ้าน ','วันที่  5มีนาคม  ',' ตอนเย็นวันจะไปกินข้าว',' พุทธ นี้ ไป แมคโคร ตอนตี 3',' ของวันมะรืน ','ในวันแรกของเดือนมกราจะไป ดูหนัง ','อีก 15 นาทีไป โร','อีก 15 นาทีหลังเที่ยงคืนของวันศุกร์จะนอน ','วันที่ 29 กุมภาพันธ์ เป็นวันเกิด','วันจันทร์ ที่ 12 เดือน กุมภา ไปนอก','วันศุกร์ 24 มีนา ','วันที่ 2  ธันวา','9:00 น. วันจันทร์คืนหนังสือนะ','วันที่ 12  11:00 นาฬิกา','15 เมษา','วัน อังคาร  24 พฤษภา']
const cutNull = function (s){  
  return s!==null && s!==undefined 
}
const isSpace = function(v){ 
             
       return (v!=="")&&(v!==" ")&&(v!=="   ")
}
const cutNumber = function(v) {
  return !(/^[0-9]*$/.test(v))
}


function timeRegex(s) {
     const regexTime =  /([1-2][0-9]|[0-9])(   |  | |)(โมง|ทุ่ม)(   |  | |)(เย็น|เช้า|)/gi
     const regexTime2 = /(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])(   |  | |)(โมง|ทุ่ม|)/gi
     const regexTime3 = /(1?[0-9]|2[0-3])(:|.)[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi
     const regexTime4 = [ regexTime, regexTime2, regexTime3 ]
     const resultTimeRegex = regexTime4.map((v)=> s.match(v)).filter(cutNull).flatMap( (v) => v )  
     //console.log('resulttime',resultTimeRegex)   
     return  resultTimeRegex
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
    //console.log(resulRegex)
    const size = resulRegex.map((v)=> v.length )   
    return resulRegex[size.indexOf(Math.min(...size))].map((c) => c.trim()).filter(cutNumber) 
}
function createTimeWithCheck( timeR, hr ){
    if(timeR.length==2){
              return { 'H':(parseInt( timeR[0])+hr).toString() , 'm':timeR[1] }
    }else {
              return { 'H':(parseInt( timeR[0])+hr).toString(), 'm': 0 }
    } 
} 
function convertTimeToNumber( s ) {
     const timeNumber =   /(\d\d|\d)/gi
     const mong = /โมง/
     const bai = /บ่าย/
     const tee = /ตี/
     const toom = /ทุ่ม/
     const shao = /เช้า/
     const yen = /เย็น/       
     const ac= s.map( (v) =>{    
     const timeR= v.match(timeNumber)    
     if( bai.test(v) || yen.test(v) ) {
        return createTimeWithCheck(timeR,12)           
     }else if(tee.test(v)) {
        return createTimeWithCheck(timeR,0)    
     }else if(toom.test(v)) {       
        return createTimeWithCheck(timeR,18)    
     }else if( mong.test(v)) {     
        if(timeR[0]<6){
          return createTimeWithCheck(timeR,6) 
        }else if(timeR[0]!=6 ){
                   return createTimeWithCheck(timeR,0)    
              }else{
                    if(timeR.length==2){
                      return { 'H':timeR[0] , 'm':timeR[1] , 'o' : 'chao or yen' }
                    }else {
                      return { 'H':timeR[0], 'm': 0 , 'o' : 'chao or yen'  }
                    }
             }             
    }else{
       return createTimeWithCheck(timeR,0)    
     }      
  })   
   const result = {'input': s, 'result': ac}
  // console.log('ttt',result)
  return result
}

function convertDateToNumber( s ) {   //return {input,[]result }
   // console.log(s)
    const date = [/จันทร์/,/อังคาร/,/พุทธ/,/พฤหัส/,/ศุกร์/,/เสาร์/,/อาทิตย์/]
    const dateNumbers = /(\d\d|\d)/
    const month = [/มกรา/,/กุมภา/,/มีนา/,/เมษา/,/พฤษภา/,/มิถุนา/,/กรกฎา/,/สิงหา/,/กันยา/,/ตุลา/,/พฤศจิกา/,/ธันวา/]
    const dateEng = ['monday','tuesday','wednes','thursday','friday','saturday','sunday']
   
     const dateresult= date.map( (v , j)=> {
      if(v.test(s) !== false )
      {
        return j+1
      }    
    }).filter(cutNull)
    const monthresult = month.map( (v , j)=>{
     if(  v.test(s) !== false )
      {
        return j
      }
  }).filter(cutNull)
    
    const dateNumberresult = s.map((v)=>{     
      const cv= v.match(dateNumbers) 
      if(cv !== null) 
      return  cv[0]      
     else return '' } ).filter(isSpace)     
   const result= { 'datenumber':  parseInt( dateNumberresult[0]) , 'date': dateresult[0] ,  'month': monthresult[0]  }
  // console.log(result)
  const timeObj=  { 'time': result  , 'strDate': s }
  return timeObj 
}


function convertTime( s ) {
    if (s===[] ) return 
     const regexTime =  /([1-2][0-9]|[0-9])(   |  | |)โมง/gi 

     if(regexTime.test(s) !== false )
     {
       const result = /(\d\d|\d)/
       const resultMatch = s.match(result)
      // console.log(resultMatch[0])
     }

     const regexTime2 = /(ตี|บ่าย)(   |  | |)([1-2][0-9]|[0-9])/gi
     const regexTime3 = /(1?[0-9]|2[0-3]):[0-5][0-9](   |  | |)(นาฬิกา|น.|)/gi

}
  
 function createTimeObject(date,h,m)
 {      
        // วันที่ 12  or  วัน จันทร์ ที่ 15  ==> เดือนนี้
      if( ( !isNaN(date.datenumber) && date.date === undefined && date.month === undefined ) || ( !isNaN(date.datenumber) && date.date !== undefined && date.month === undefined ) ) {          
          const dateR = moment().date(date.datenumber).hour(parseInt(h)).minute(parseInt(m))
          return dateR
          //console.log('Match Date number ',dateR)
      } else if ( isNaN(date.datenumber) && date.date !== undefined && date.month === undefined) {  // วัน อังคาร   ==> เดือนนี้        
              if( moment().isoWeekday() >= date.date ) {        
                  const dateR = moment().add(1,'week').isoWeekday(date.date).hour(parseInt(h)).minute(parseInt(m))
                  return dateR
              } else  {
                const dateR = moment().isoWeekday(date.date).hour(parseInt(h)).minute(parseInt(m))
                return dateR
              }           
                //console.log('Match day of week',dateR)
    } else  if( isNaN(date.datenumber) && date.date === undefined && date.month !== undefined)     {            // มีนาคม ==> วันแรก ของ เดือนนั้นๆ
            const dateR = moment().month(date.month).date(1).hour(parseInt(h)).minute(parseInt(m))
            return dateR
            //console.log('Match Month  ',dateR)
    } else if( !isNaN(date.datenumber) && date.date !== undefined && date.month === undefined)   {          
          const dateR = moment().date(date.datenumber).hour(parseInt(h)).minute(parseInt(m))
          return dateR
          //console.log('Match Date number ',dateR)
    } else if( ( !isNaN(date.datenumber) && date.date !== undefined && date.month !== undefined ) || (!isNaN(date.datenumber) && date.date === undefined && date.month !== undefined) )  {  //วัน จันทร์ 14 มีนา or 15 เมษา  => มีวันที่แล้ว
          const dateR = moment().date(date.datenumber).month(date.month).hour(parseInt(h)).minute(parseInt(m))
          return dateR
          //console.log('datenumber date month',dateR)
    } else if(  isNaN(date.datenumber) && date.date === undefined && date.month === undefined ) { //ไม่ระบุ วันที่  
        const dateR = moment().hour(parseInt(h)).minute(parseInt(m))       
        return dateR
      }
}
function mergeAndCreateDateAndTime ( time, date) 
{
     if(time.result.length!=0){
        return time.result.map( (v) => {         
          if(v !== undefined )                 
          return createTimeObject(date.time,v.H,v.m)
        })
     } else {        
       if( date.strDate.length!=0)
          return  date.strDate.map((v) => {
              return createTimeObject(date.time,7,0)
           })
       
     }

}
function thaiRegexTime( v ) {           
          const resultTime  = convertTimeToNumber(timeRegex(v))
          const resultDate =  convertDateToNumber(dateRegex(v))
          //console.log("-----------------------------------------")
          //console.log('input ',v)         
          const a = mergeAndCreateDateAndTime(resultTime,resultDate)
         // console.log('output',a)
          //console.log("-----------------------------------------")

          const result =  {'input': v , 'output': a ,'resultdate':resultDate.strDate,'resultTime':resultTime.input }
          //console.log(result) 
         return   result
}

this.splitWordWithPlusSign=function(s){
    const input = s.split("+")
    return  input.map( v =>  thaiRegexTime(v) )
    
}

const testSet1 = text3.map( (v) =>  thaiRegexTime(v)  )


})