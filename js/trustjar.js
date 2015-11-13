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
      "<a href='index.html' id='indexHome' class='navbar-brand' style='font-size:32px'>trustjar</a>" +
    "</div>" +
    "<div id='navbar' class='navbar-collapse collapse'>" + 
      "<form class='navbar-form navbar-right' action='' onsubmit='return headerSubmitLogin();' data-ajax='false'>" + 
        "<div class='form-group'>" +
          "<input type='email' id='loginId' placeholder='login ID' class='form-control' style='margin-bottom:10px'>" +
          "<input id='loginPassword' type='password' placeholder='password' class='form-control' style='margin-bottom:10px'>" +
          "<a href='dashboard.html'><button id='login' type='submit' class='btn btn-success' style='margin-bottom:10px'>Sign in</button></a>" +
          "<br>" +
          "<div class='checkbox' style='color:#ffffff'>" +
            "<label>" +
              "<input id='rememberMe' name='rememberMe' type='checkbox' style='float:left; margin-right:5px'>Remember me" +
            "</label>" +
            "<a href='forgotPw.html' style='color:#46bcde; margin-left:85px'>Forgot password</a>" +
          "</div>" +
        "</div>" +
      "</form>" +
    "</div><!--/.navbar-collapse -->" +
  "</div>"
);

// Disable the home (icon) link if the user is on the home page (logged out version)
if (document.location.href.match(/[^\/]+$/)[0] == 'index.html') {
   $("#indexHome").removeAttr("href");
};

// Code to insert anonymous header (with login fields)
$('.identHeader').append( 
  "<div class='container-fluid'>" +
    "<div class='navbar-header'>" +
      "<p class='navbar-right navbar-toggle'><a href='index.html' class='navbar-link'>Sign out</a></p>" +
       "<a href='dashboard.html' id='dashboardHome' class='navbar-brand'>trustjar</a>" +
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

// Disable the home (icon) link if the user is on the home page (logged in version)
if (document.location.href.match(/[^\/]+$/)[0] == 'dashboard.html') {
   $("#dashboardHome").removeAttr("href");
};

// Code to insert footer to all templates
$('.footer').append( 
  "<div class='container'>" +
    "<div class='navbar-header'>" + 
      "<a href='#' id='helpLink'>Help</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" +
      "<a href='#' id='privacyLink'>Privacy policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" +
      "<a href='#' id='termsLink'>Terms and conditions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" +
      "<a href='#' id='contactLink'>Contact us</a>" + 
      "<p>© Quantima 2015. All rights reserved.</p>" + 
    "</div>" +
  "</div>"
);

$('body').append( 
  "<div class='modal fade' id='footerOverlay' role='dialog'>" +
    "<div class='modal-dialog'>" +
      "<div class='modal-content'>" +
        "<div class='modal-header' id='modalHeader'>" +
          "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
          "<h4 class='modal-title'>Trustjar Terms and conditions</h4>" +
        "</div>" +
        "<div class='modal-body' id='modalBody'>" +
        "</div>" +
        "<div class='modal-footer'>" +
          "<button id='modalClose' type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</div>"
);

// FOOTER LINKS
// Opens help overlay
$("#helpLink").click(function(){
  $("#footerOverlay").modal({backdrop: true});
  $("#modalHeader").html('trustjar Help');
  GLOB.footerRef.child('help').once('child_added', function(childSnapshot, prevChildName) {
      var val = childSnapshot.val();
      var helpCopy = val.replace('data:text/html;charset=utf-8,', '');
      $("#modalBody").html(helpCopy);
  });
});

// Opens terms and conditions overlay
$("#privacyLink").click(function(){
  $("#footerOverlay").modal({backdrop: true});
  $("#modalHeader").html('trustjar Privacy Policy');
  GLOB.footerRef.child('privacy').once('child_added', function(childSnapshot, prevChildName) {
      var val = childSnapshot.val();
      var privacyCopy = val.replace('data:text/html;charset=utf-8,', '');
      $("#modalBody").html(privacyCopy);
  });
});

// Opens terms and conditions overlay
$("#termsLink").click(function(){
  $("#footerOverlay").modal({backdrop: true});
  $("#modalHeader").html('trustjar Terms and Conditions');
  GLOB.footerRef.child('terms').once('child_added', function(childSnapshot, prevChildName) {
      var val = childSnapshot.val();
      var termsCopy = val.replace('data:text/html;charset=utf-8,', '');
      $("#modalBody").html(termsCopy);
  });
});

// Opens Contact overlay
$("#contactLink").click(function(){
  $("#footerOverlay").modal({backdrop: true});
  $("#modalHeader").html('Contact trustjar');
  GLOB.footerRef.child('contact').once('child_added', function(childSnapshot, prevChildName) {
      var val = childSnapshot.val();
      var contactCopy = val.replace('data:text/html;charset=utf-8,', '');
      $("#modalBody").html(contactCopy);
  });
});

GLOB.trustjarRef = new Firebase("https://trustjar.firebaseio.com");


// Initialize all tooltips (bootstrap)
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

GLOB.serverRef = GLOB.trustjarRef.child('server');
GLOB.clientRef = GLOB.trustjarRef.child('client');
GLOB.indexServerRef = GLOB.trustjarRef.child('index/server');
GLOB.loginRef = GLOB.trustjarRef.child('login');
GLOB.pageRef = GLOB.trustjarRef.child('global');
GLOB.indexSubmitStep1Ref = GLOB.clientRef.child('index/step1Submit');
GLOB.indexSubmitStep2Ref = GLOB.clientRef.child('index/step2Submit');
GLOB.footerRef = GLOB.trustjarRef.child('footer');




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
    $("#indexServerUserContact2").val(val.indexUserContactData);
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
    $("#indexServerUserContact2").val(val.indexUserContactData);
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

// Send Step 1 data to Firebase when user selects submit
function headerSubmitLogin () {
      GLOB.loginRef.push( {  
        "loginId" : $('#loginId').val(),
        "rememberMe" : $("input[name=rememberMe]:checked").val(),
        "password" : $('#loginPassword').val(),
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}



// Send Step 1 data to Firebase when user selects submit
function indexSubmitStep1 () {
      GLOB.indexSubmitStep1Ref.push( {  
        "userContact" : $('#indexUserContact').val(),
        "relationshipType" : $("input[name=indexRelationshipType]:checked").val(),
        "counterpartyContact" : $('#indexCounterpartyContact').val(),
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}


// Send Step 2 data to Firebase when user selects submit. Form will display an alert if the password 
// values don't match.
function indexSubmitStep2 () {
  var password1 = $('#indexPassword1').val()
  var password2 = $('#indexPassword2').val()
  if(password1 != password2) {
    alert("Your passwords Don't Match. Please correct and resubmit.");
    return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
  } else {
      GLOB.indexSubmitStep2Ref.push( {  
        "userId" : $('#indexServerUserContact2').val(),
        "password" : $('#indexPassword1').val(),
        "confirmPassword" : $('#indexPassword2').val(),
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
  }
}

// Edit submitted Step 1 information. Since this has already been used to prepopulate Step 2, no 
// interaction with server is required.
function indexEditStep1 () {
  $("#indexUserContact").val($("#indexServerUserContact").html());
  $("#indexCounterpartyContact").val($("#indexServerCounterpartyContact").html());
  $("#indexCasual").prop( "checked", true );
  $("#indexCasual").parent('label').addClass('active');
  $( "#indexStep1" ).show();
  $( "#step1done" ).hide();
  $( "#indexStep2" ).hide();
}

// Server confirms receipt of Step 1 information from user by sending a Firebase message
// to populate the Step 1 summary and contact info for the user in the Step 2 form. This version
// is triggered the first time this data is sent to Firebase.
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

// Server confirms receipt of Step 1 information from user by sending a Firebase message
// to populate the Step 1 summary and contact info for the user in the Step 2 form. This version 
// is used if existing Firebase data for these vaules is being modified.
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











// Add another contact field to the user's profile. Called if user is entering multiple contacts at once.
function addProfileContact () {
  $( "#addContactProfile" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}

// Add another contact field to the current request form. Called if user is entering multiple contacts at once.
function addContact () {
  $( "#addContactDash" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}


// Add another contact field to the current request form
function forgotShowStep2 () {
  $( "#forgotStep1" ).hide();
  $( "#contactChanged" ).hide();
  $( "#forgotStep2" ).show();
}

// Displays the Registration form in landing2.html
function landing2ShowRegister () {
  $( "#landing2Register" ).show();
  $( "#landing2Login" ).hide();
}

// Displays the login credentials form in landing2.html
function landing2ShowLogin () {
  $( "#landing2Login" ).show();
  $( "#landing2Register" ).hide();
}

// Double confirmation dialog for acceptance of an exclusive relationship when it will create a conflict. It asks twice for confirmation.
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

