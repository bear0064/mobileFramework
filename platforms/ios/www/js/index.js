var pages = [],
    links = [];
var numLinks = 0;
var numPages = 0;

/*
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
       
    
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();
*/



document.addEventListener("DOMContentLoaded", function () {
    //device ready listener
    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    links = document.querySelectorAll('[data-role="link"]');
    //Take pages
    numLinks = links.length;

    for (var i = 0; i < numLinks; i++) {
        //either add a touch or click listener




        // Listen for the event.
        pages[i].addEventListener('pageshow', mudda, false);







        if (detectTouchSupport()) {
            links[i].addEventListener("touchend", handleTouch, false);
        }
        links[i].addEventListener("click", handleNav, false);
    }
    //add the listener for the back button
    //window.addEventListener("popstate", browserBackButton, false);
    loadPage(null);


});






//handle the touchend event
function handleTouch(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var touch = ev.changedTouches[0]; //this is the first object touched
    var newEvt = document.createEvent("MouseEvent");
    //old method works across browsers, though it is deprecated.
    newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    ev.currentTarget.dispatchEvent(newEvt);
    //send the touch to the click handler
}

//handle the click event
function handleNav(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    var parts = href.split("#");
    loadPage(parts[1]);
    return false;
}

//Deal with history API and switching divs
function loadPage(url) {





    if (url == null) {
        //home page first call
        pages[0].style.display = 'block';
        history.replaceState(null, null, "#home");
    } else {


        for (var i = 0; i < numPages; i++) {



            if (pages[i].id == url) {


                //page needs to show
                pages[i].className = "show";
                var event = new Event('pageshow');
                ///Dispatch the event.
                pages[i].dispatchEvent(event);
                //now add the class active to animate.
                setTimeout(showPage, 10, pages[i]);
                pages[i].style.display = "block";
                history.pushState(null, null, "#" + url);
            } else {


                pages[i].style.display = "none";
                //remove the class active to make it animate off the page
                pages[i].className = "show";
                //animation off the page is set to take 0.4 seconds
                setTimeout(hidePage, 400, pages[i]);
            }
        }

        for (var t = 0; t < numLinks; t++) {
            links[t].className = "";
            if (links[t].href == location.href) {
                links[t].className = "activetab";
            }
        }



    }
}


function mudda(eve) {
    eve.preventDefault();
    if (eve.currentTarget.id == "two") {
        
        console.log('two');
        /***** Geolocation Part******/
      
                if (navigator.geolocation) {

                    var geolocationOptions = {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 60000
                    };
               
                    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
                
                    
                
                } else {
                    alert("Sorry, but your browser does not support location based awesomeness.")
                }
          
            

        } else if (eve.currentTarget.id == "three") {
            console.log('three');
            /*** Read Contacts ***/
            var random = navigator.contacts[Math.floor(Math.random() * navigator.contacts.length)];
            var options = new ContactFindOptions();
            options.filter = random; //leaving this empty will find return all contacts
            options.multiple = false; //return multiple results
            var filter = ["displayName"]; //an array of fields to compare against the options.filter 
            navigator.contacts.find(filter, successFunc, errFunc, options);

            function successFunc(matches) {
                for (var i = 0; i < matches.length; i++) {
                    console.log(matches[i].displayName);
                }
            }
        }    
}










function hidePage(pg) {
    pg.className = "hide";
    //this class replaces show
}

function showPage(pg) {
    pg.classList.add("active");


}

function geolocationSuccess(position) {


    var google_tile = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
        position.coords.longitude + "&zoom=14&size=400x400&markers=color:red|label:Y|" +
        position.coords.latitude + ',' + position.coords.longitude;


    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = 370;
    canvas.height = 300;

    var imageObj = new Image();
    imageObj.src = google_tile;

    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0);

        pages[1].appendChild(canvas);
    }


}

function geolocationError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}










//Need a listener for the popstate event to handle the back button
function browserBackButton(ev) {
    url = location.hash; //hash will include the "#"
    //update the visible div and the active tab
    for (var i = 0; i < numPages; i++) {
        if (("#" + pages[i].id) == url) {
            pages[i].style.display = "block";
        } else {
            pages[i].style.display = "none";
        }
    }
    for (var t = 0; t < numLinks; t++) {
        links[t].className = "";
        if (links[t].href == location.href) {
            links[t].className = "activetab";
        }
    }
}








//Test for browser support of touch events
function detectTouchSupport() {
    msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
    var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
    return touchSupport;
}