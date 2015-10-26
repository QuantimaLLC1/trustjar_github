// HOUSEKEEPING FUNCTIONS FOR PROGRAMMING PURPOSES
  // Create a global variable array to separate our globals from the rest of the DOM.
  GLOB = [];

  // Function to reset Firebase
   var reset = function() {
      // Remove any previous listeners
      GLOB.trustjarRef.off();
      GLOB.trustjarRef.remove();
      window.location = 'index.html';
    }




// CODE REQUIRED FOR UNIT TEST
  // This allows us to run the unit test as an array of individual test components.
  // The unit tests are in an array, allTests, defined as allTests = [ function() { ... }, function() { ... }, etc ]
  // runAllTests iterates through the functions in the array sequentially, 
  // and determines a pause interval between each function as specified within the unit test.
   function runAllTests( allTests, startTestNum, endTestNum ) {
     var returnVal = null;
     function runAllTests1( allTests, testNum ) {
      if( testNum == endTestNum ) {
        return( true );
      }
      var func = allTests[ testNum ];
      var pauseLength = func();
      if( pauseLength == -1 ) {
        return( false );
      };
      pauser = setTimeout(
        function() {
          runAllTests1( allTests, testNum + 1 );
        },
        pauseLength
      ); 
    };
    // Give subscribe enough time to work, then run tests
    setTimeout(
      function() {
        runAllTests1( allTests, startTestNum );
      },
      1000
    );
  };

/*
// CODE TO INITIALIZE CLIENT FOR UNIT TEST
  // Set the initial Firebase reference based on whether the client is authenticated or not.
  // Retrieve the value stored with the key "f30sUserId" in localStorage. This is a value sent 
  // by the f30s server to the client via Firebase as an authentication token.
  GLOB.currentUserId = window.localStorage.getItem("trustjarUserId");
  // If there's already a value for f30sUserId in localStorage:
  if (GLOB.currentUserId != null) {
    // Redefine the primary reference to use the f30UserID value as the primary Firebase reference for all 
    // client-server communications.
    GLOB.trustjarRef = new Firebase('https://trustjar.firebaseio.com/' + GLOB.currentUserId)
  // If there's no value, the user has not been authenticated, so we'll create an arbitrary Firebase reference
  // so the DOM can load.
  } else {
    // create an arbitrary reference so the client can initialize. This reference will
    // be reset once the client is authenticated.
    GLOB.trustjarRef = new Firebase('https://trustjar.firebaseio.com/placeholder');
  };
*/



// Code to insert anonymous header (with login fields)
$('.anonHeader').append( 
  "<div class='container'>" +
    "<div class='navbar-header'>" + 
      "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>" + 
        "<span class='sr-only'>Toggle navigation</span>" + 
        "<span style='color:#fff'>Sign in</span>" +
      "</button>" + 
      "<a class='navbar-brand' href='index.html' style='font-size:32px'>trustjar</a>" +
    "</div>" +
    "<div id='navbar' class='navbar-collapse collapse'>" + 
      "<form class='navbar-form navbar-right' action='' onsubmit='return goToDashboard();'' data-ajax='false'>" + 
        "<div class='form-group'>" +
          "<input type='text' placeholder='email or mobile phone' class='form-control' style='margin-bottom:10px'>" +
          "<input type='password' placeholder='password' class='form-control' style='margin-bottom:10px'>" +
          "<a href='dashboard.html'><button type='submit' class='btn btn-success' style='margin-bottom:10px'>Sign in</button></a>" +
          "<br>" +
          "<div class='checkbox' style='color:#ffffff'>" +
            "<label>" +
              "<input type='checkbox' style='float:left; margin-right:5px'>Remember me" +
            "</label>" +
            "<a href='forgotPw.html' style='color:#46bcde; margin-left:85px'>Forgot password</a>" +
          "</div>" +
        "</div>" +
      "</form>" +
    "</div><!--/.navbar-collapse -->" +
  "</div>"
);


// Code to insert anonymous header (with login fields)
$('.identHeader').append( 
  "<div class='container-fluid'>" +
    "<div class='navbar-header'>" +
      "<p class='navbar-right navbar-toggle'><a href='index.html' class='navbar-link'>Sign out</a></p>" +
       "<a class='navbar-brand' href='dashboard.html'>trustjar</a>" +
      "</p>" +
    "</div>" +
    "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>" +
      "<ul class='nav navbar-nav navbar-right'>" +
        "<li><a href='index.html' type='button' style='margin: 7px 7px 7px 0px; border: 1px solid #333333; border-radius: 5px; padding: 10px;''>Sign out</a>" +
        "</li>" +
      "</ul>" +
    "</div>" +
  "</div>"
);


// Code to insert footer to all templates
$('.footer').append( 
  "<div class='container'>" +
    "<div class='navbar-header'>" + 
      "<a href='content.html'>Help</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='content.html'>Privacy policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='content.html'>Terms and conditions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='content.html'>Contact us</a>" + 
      "<p>© Quantima 2015. All rights reserved.</p>" + 
    "</div>" +
  "</div>"
);












GLOB.trustjarRef = new Firebase("https://trustjar.firebaseio.com");

/*
GLOB.trustjarRef.authAnonymously(function(error, authData) {
  remember: "sessionOnly"
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
*/

// Initialize all tooltips (bootstrap)
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

GLOB.indexSubmitStep1Ref = GLOB.trustjarRef.child('client/index/step1Submit');
GLOB.serverRef = GLOB.trustjarRef.child('server');
GLOB.clientRef = GLOB.trustjarRef.child('client');
GLOB.indexServerRef = GLOB.trustjarRef.child('index/server');
GLOB.pageRef = GLOB.trustjarRef.child('global');




// Server sets the page to be displayed
GLOB.serverRef.on('child_added', function(childSnapshot, prevChildName) {
  // Retrieve the JSON string stored in alertMsg  
  var val = childSnapshot.val();
  var curPage = document.location.href.match(/[^\/]+$/)[0]
  // If a message to change the current page is received, change to that page.  
  if (curPage != val.thisPage) {
    window.location = val.thisPage;
  };
  if (val.indexStep == 2) {
    $("#indexServerUserContact").html(val.indexUserContactData);
    $("#indexServerUserContact2").html(val.indexUserContactData);
    $("#indexServerRelationshipType").html(val.indexRelationshipTypeData);
    $("#indexServerCounterpartyContact").html(val.indexCounterpartyContactData);
    $( "#indexStep1" ).hide();
    $( "#step1done" ).show();
    $( "#indexStep2" ).show();
    $( "#disableControls" ).removeClass( "overlay" );
  };
  if (val.indexStep == 1) {
    $("#indexUserContact").val($("#indexServerUserContact").html());
    $("#indexCounterpartyContact").val($("#indexServerCounterpartyContact").html());
    $("#indexCasual").prop( "checked", true );
    $("#indexCasual").parent('label').addClass('active');
    $( "#indexStep1" ).show();
    $( "#step1done" ).hide();
    $( "#indexStep2" ).hide();
  };
});

// Server sets the page to be displayed
GLOB.serverRef.on('child_changed', function(childSnapshot, prevChildName) {
  // Retrieve the JSON string stored in alertMsg  
  var val = childSnapshot.val();
  var curPage = document.location.href.match(/[^\/]+$/)[0]
  // If a message to change the current page is received, change to that page.  
  if (curPage != val.thisPage) {
    window.location = val.thisPage;
  };
  if (val.indexStep == 2) {
    $("#indexServerUserContact").html(val.indexUserContactData);
    $("#indexServerUserContact2").html(val.indexUserContactData);
    $("#indexServerRelationshipType").html(val.indexRelationshipTypeData);
    $("#indexServerCounterpartyContact").html(val.indexCounterpartyContactData);
    $( "#indexStep1" ).hide();
    $( "#step1done" ).show();
    $( "#indexStep2" ).show();
    $( "#disableControls" ).removeClass( "overlay" );
  };
  if (val.indexStep == 1) {
    $("#indexUserContact").val($("#indexServerUserContact").html());
    $("#indexCounterpartyContact").val($("#indexServerCounterpartyContact").html());
    $("#indexCasual").prop( "checked", true );
    $("#indexCasual").parent('label').addClass('active');
    $( "#indexStep1" ).show();
    $( "#step1done" ).hide();
    $( "#indexStep2" ).hide();
  };
});










// Add another contact field to the current request form
function indexSubmitStep1 () {
      GLOB.indexSubmitStep1Ref.push( {  
        "userContact" : $('#indexUserContact').val(),
        "relationshipType" : $("input[name=indexRelationshipType]:checked").val(),
        "counterpartyContact" : $('#indexCounterpartyContact').val(),
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}

// Add another contact field to the current request form
function indexEditStep1 () {
  $("#indexUserContact").val($("#indexServerUserContact").html());
  $("#indexCounterpartyContact").val($("#indexServerCounterpartyContact").html());
  $("#indexCasual").prop( "checked", true );
  $("#indexCasual").parent('label').addClass('active');
  $( "#indexStep1" ).show();
  $( "#step1done" ).hide();
  $( "#indexStep2" ).hide();
}

// Add another contact field to the current request form
GLOB.indexServerRef.on('child_added', function(childSnapshot, prevChildName) {
  // Retrieve the unique ID from the Firebase message
  var val = childSnapshot.val();
  $("#indexServerUserContact").html(val.indexUserContactData);
  $("#indexServerUserContact2").html(val.indexUserContactData);
  $("#indexServerRelationshipType").html(val.indexRelationshipTypeData);
  $("#indexServerCounterpartyContact").html(val.indexCounterpartyContactData);
  $( "#indexStep1" ).hide();
  $( "#step1done" ).show();
  $( "#indexStep2" ).show();
  $( "#disableControls" ).removeClass( "overlay" );
});


// Add another contact field to the current request form
GLOB.indexServerRef.on('child_changed', function(childSnapshot, prevChildName) {
  // Retrieve the unique ID from the Firebase message
  var step1Data = childSnapshot.val();
  $("#indexServerUserContact").html(step1Data.indexUserContactData);
  $("#indexServerUserContact2").html(step1Data.indexUserContactData);
  $("#indexServerRelationshipType").html(step1Data.indexRelationshipTypeData);
  $("#indexServerCounterpartyContact").html(step1Data.indexCounterpartyContactData);
  $( "#indexStep1" ).hide();
  $( "#step1done" ).show();
  $( "#indexStep2" ).show();
  $( "#disableControls" ).removeClass( "overlay" );
});











// Add another contact field to the current request form
function addProfileContact () {
  $( "#addContactProfile" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}

// Add another contact field to the current request form
function addContact () {
  $( "#addContactDash" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}
/*
// Add another contact field to the current request form
function indexEditStep1 () {
  $( "#indexStep1" ).show();
  $( "#step1done" ).hide();
  $( "#indexStep2" ).hide();
  $("#userContact").val('aaaron@gmail.com');
  $("#otherContact").val('bbrown@aol.com');
  $("#indexCasual").prop( "checked", true );
  $("#indexCasual").parent('label').addClass('active');
}

// Add another contact field to the current request form
function indexShowStep2 () {
  $( "#indexStep1" ).hide();
  $( "#step1done" ).show();
  $( "#indexStep2" ).show();
}
*/

// Add another contact field to the current request form
function forgotShowStep2 () {
  $( "#forgotStep1" ).hide();
  $( "#contactChanged" ).hide();
  $( "#forgotStep2" ).show();
}

// Add another contact field to the current request form
function landing2ShowRegister () {
  $( "#landing2Register" ).show();
  $( "#landing2Login" ).hide();
}

// Add another contact field to the current request form
function landing2ShowLogin () {
  $( "#landing2Login" ).show();
  $( "#landing2Register" ).hide();
}

// Confirmation dialog for acceptance of an exclusive relationship when it will create a conflict. It asks twice for confirmation.
function exclusiveConfirmation () {
    var confirmExclusive1 = confirm("WARNING: You're accepting an exclusive relationship while connected to a casual relationship. Both parties will be notified and they will receive each other's contact information. To avoid this, please remove the casual relationship from your dashboard before accepting this relationship. Are you sure you want to continue? ");
    if (confirmExclusive1 == true) {
        var doubleCheck = confirm  ("There is no undoing the notifications that are about to be sent. ARE YOU ABSOLUTELY SURE?")
      if (doubleCheck == true) {
          window.location.assign("dashboard.html")
      };
    };
}

// Confirmation dialog for acceptance of an exclusive relationship when it will create a conflict. It asks twice for confirmation.
function goToDashboard () {
     window.location.assign("dashboard.html")
     return false;
}


/*
    // Script to import footer
    var link = document.querySelector('link[rel="import"]');

    // Clone the footer template in the import.
    var template = link.import.querySelector('homeFooterTemplate');
    var clone = document.importNode(template.content, true);

    document.querySelector('#homeFooter').appendChild(clone);
*/


// $(".footerContent").get("./footer.html"); 





/*
    function initialize() {
      // Remove any previous listeners
      GLOB.trustjarRef.off();
      GLOB.trustjarRef.remove();

    }

    window.onload = initialize();
*/

