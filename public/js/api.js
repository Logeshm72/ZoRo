//IIFE for exposing API
(function anonAPI(global) {
  var API = {
    getrooms: getrooms
  };
  global.API = API;

  function getrooms(date, resolve, reject) {
    var searchUrl = "https://challenges.1aim.com/roombooking/getrooms";
    var params = {
      date: date
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        try {
          var retData = [];
          var data = JSON.parse(xmlHttp.responseText);
          //Loop over all data
            resolve(data);
        } catch (e) {
        //   console.log("asdsad");
            reject("There was some error");
        }
      }
    };
    xmlHttp.open("POST", searchUrl, true);
    xmlHttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    xmlHttp.send(JSON.stringify(params));
  }
})(window);
