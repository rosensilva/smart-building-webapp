
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}



btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
  ourRequest.open('GET', 'https://10.100.4.28:5000/cat',true);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();

});







function renderHTML(data) {
  var htmlString = data;

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}


btn2.addEventListener("click", function() {

  var ourRequest = new XMLHttpRequest();
  param = "date=2016-10-10&time=10:10"
  

   var xhr = createCORSRequest('POST', 'https://10.100.4.28:5000/getpredict');
 
  if (!xhr) {
    alert("error at CROS");
    throw new Error('CORS not supported');
  }
  xhr.send();
  function callOtherDomain() {
  if(invocation) {    
    invocation.open('POST', 'https://10.100.4.28:5000/getpredict', true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
  ourRequest.open('POST', 'https://10.100.4.28:5000/getpredict',true);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send(param);

});