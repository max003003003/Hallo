angular.module('moduleControlles')
.run(function(AppModules) {
        console.info('AppModules ready !!');
}).value("AppModules", {
     
    coordinatesPlace: [],
    individualOfcoordinatesPlace : "",
    listNoteForRender :[{detail:"วันอังคาร ไป @โรบินสันนะครับ +วันพุทธ ไป @พัทยา",seq:0}],
    getDate:"",
    seqNote:"",
    dateInput:"",
    registerData:"",
    detailNote:""

}).service('AppModuleService', function($http, $rootScope, AppModules, AVALabel, $ionicPopup, $ionicLoading,
        IonicClosePopupService, CartModules, UtilsModules) {
        return {
        
        }
})