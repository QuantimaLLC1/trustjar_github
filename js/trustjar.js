// HOUSEKEEPING FUNCTIONS FOR PROGRAMMING PURPOSES
  // Create a global variable array to separate our globals from the rest of the DOM.
  GLOB = [];

  // Function to reset Firebase
   var reset = function() {
      // Remove any previous listeners
      GLOB.trustjarRef.off();
      GLOB.trustjarRef.remove();
      location.reload(true);
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


function animateLogotype() {
setTimeout(function(){ $("#logotype").css({'font-weight':300})}, 25)
setTimeout(function(){ $("#logotype").css({'font-weight':400})}, 50)
setTimeout(function(){ $("#logotype").css({'font-weight':600})}, 75)
setTimeout(function(){ $("#logotype").css({'font-weight':700})}, 100)
setTimeout(function(){ $("#logotype").css({'font-weight':900})}, 125)
setTimeout(function(){ $("#logotype").css({'font-weight':200})}, 150)

 $( "#landingWrapper" ).fadeIn( 100 );


setTimeout(function(){ $("#t").css({'font-weight':300})}, 500)

setTimeout(function(){ $("#t").css({'font-weight':400})}, 550)
setTimeout(function(){ $("#r").css({'font-weight':300})}, 550)

setTimeout(function(){ $("#t").css({'font-weight':600})}, 600)
setTimeout(function(){ $("#r").css({'font-weight':400})}, 600)
setTimeout(function(){ $("#u").css({'font-weight':300})}, 600)

setTimeout(function(){ $("#t").css({'font-weight':700})}, 650)
setTimeout(function(){ $("#r").css({'font-weight':600})}, 650)
setTimeout(function(){ $("#u").css({'font-weight':400})}, 650)
setTimeout(function(){ $("#s").css({'font-weight':300})}, 650)

setTimeout(function(){ $("#t").css({'font-weight':900})}, 700)
setTimeout(function(){ $("#r").css({'font-weight':700})}, 700)
setTimeout(function(){ $("#u").css({'font-weight':600})}, 700)
setTimeout(function(){ $("#s").css({'font-weight':400})}, 700)
setTimeout(function(){ $("#t2").css({'font-weight':300})}, 700)

setTimeout(function(){ $("#t").css({'font-weight':700})}, 750)
setTimeout(function(){ $("#r").css({'font-weight':900})}, 750)
setTimeout(function(){ $("#u").css({'font-weight':700})}, 750)
setTimeout(function(){ $("#s").css({'font-weight':600})}, 750)
setTimeout(function(){ $("#t2").css({'font-weight':400})}, 750)
setTimeout(function(){ $("#j").css({'font-weight':300})}, 750)

setTimeout(function(){ $("#t").css({'font-weight':600})}, 800)
setTimeout(function(){ $("#r").css({'font-weight':700})}, 800)
setTimeout(function(){ $("#u").css({'font-weight':900})}, 800)
setTimeout(function(){ $("#s").css({'font-weight':700})}, 800)
setTimeout(function(){ $("#t2").css({'font-weight':600})}, 800)
setTimeout(function(){ $("#j").css({'font-weight':400})}, 800)
setTimeout(function(){ $("#a").css({'font-weight':300})}, 800)

setTimeout(function(){ $("#t").css({'font-weight':400})}, 850)
setTimeout(function(){ $("#r").css({'font-weight':600})}, 850)
setTimeout(function(){ $("#u").css({'font-weight':700})}, 850)
setTimeout(function(){ $("#s").css({'font-weight':900})}, 850)
setTimeout(function(){ $("#t2").css({'font-weight':700})}, 850)
setTimeout(function(){ $("#j").css({'font-weight':600})}, 850)
setTimeout(function(){ $("#a").css({'font-weight':400})}, 850)
setTimeout(function(){ $("#r2").css({'font-weight':300})}, 850)

setTimeout(function(){ $("#t").css({'font-weight':300})}, 900)
setTimeout(function(){ $("#r").css({'font-weight':400})}, 900)
setTimeout(function(){ $("#u").css({'font-weight':600})}, 850)
setTimeout(function(){ $("#s").css({'font-weight':700})}, 900)
setTimeout(function(){ $("#t2").css({'font-weight':900})}, 900)
setTimeout(function(){ $("#j").css({'font-weight':700})}, 900)
setTimeout(function(){ $("#a").css({'font-weight':600})}, 900)
setTimeout(function(){ $("#r2").css({'font-weight':400})}, 900)

setTimeout(function(){ $("#r").css({'font-weight':300})}, 950)
setTimeout(function(){ $("#u").css({'font-weight':400})}, 950)
setTimeout(function(){ $("#s").css({'font-weight':600})}, 950)
setTimeout(function(){ $("#t2").css({'font-weight':700})}, 950)
setTimeout(function(){ $("#j").css({'font-weight':900})}, 950)
setTimeout(function(){ $("#a").css({'font-weight':700})}, 950)
setTimeout(function(){ $("#r2").css({'font-weight':600})}, 950)

setTimeout(function(){ $("#u").css({'font-weight':300})}, 1000)
setTimeout(function(){ $("#s").css({'font-weight':400})}, 1000)
setTimeout(function(){ $("#t2").css({'font-weight':600})}, 1000)
setTimeout(function(){ $("#j").css({'font-weight':700})}, 1000)
setTimeout(function(){ $("#a").css({'font-weight':900})}, 1000)
setTimeout(function(){ $("#r2").css({'font-weight':700})}, 1000)

setTimeout(function(){ $("#s").css({'font-weight':300})}, 1050)
setTimeout(function(){ $("#t2").css({'font-weight':400})}, 1050)
setTimeout(function(){ $("#j").css({'font-weight':600})}, 1050)
setTimeout(function(){ $("#a").css({'font-weight':700})}, 1050)
setTimeout(function(){ $("#r2").css({'font-weight':900})}, 1050)

setTimeout(function(){ $("#t2").css({'font-weight':300})}, 1100)
setTimeout(function(){ $("#j").css({'font-weight':400})}, 1100)
setTimeout(function(){ $("#a").css({'font-weight':600})}, 1100)
setTimeout(function(){ $("#r2").css({'font-weight':700})}, 1100)

setTimeout(function(){ $("#j").css({'font-weight':300})}, 1150)
setTimeout(function(){ $("#a").css({'font-weight':400})}, 1150)
setTimeout(function(){ $("#r2").css({'font-weight':600})}, 1150)

setTimeout(function(){ $("#a").css({'font-weight':300})}, 1200)
setTimeout(function(){ $("#r2").css({'font-weight':400})}, 1200)

setTimeout(function(){ $("#r2").css({'font-weight':300})}, 1250)

};



// Initialize all tooltips (bootstrap)
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



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
// Toggle password visibility when the 'hide password' box is checked
  $('#landing1HidePassword').change(function() {
    if($(this).is(':checked')){
      console.log("CCCCheckeddddddd");
      $('.password').attr({type:"password"});
    } else {
      console.log("UNCheckeddddddd");
      $('.password').attr({type:"text"});
    } 
  });


// Disable the home (icon) link if the user is on the home page (logged out version)
if (document.location.href.match(/[^\/]+$/)[0] == 'home.html') {
   $("#home").removeAttr("href");
};

// Code to insert anonymous header (with login fields)
$('.identHeader').append( 
  "<div class='container-fluid'>" +
    "<div class='navbar-header'>" +
      "<p class='navbar-right navbar-toggle'><a href='home.html' class='navbar-link'>Sign out</a></p>" +
       "<a href='dashboard.html' id='dashboardHome' class='navbar-brand'>trustjar</a>" +
      "</p>" +
    "</div>" +
    "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>" +
      "<ul class='nav navbar-nav navbar-right'>" +
        "<li><a href='home.html' type='button' style='margin: 7px 7px 7px 0px; border: 1px solid #333333; border-radius: 5px; padding: 10px;''>Sign out</a>" +
        "</li>" +
      "</ul>" +
    "</div>" +
  "</div>"
);

// Disable the home (icon) link if the user is on the home page (logged in version)
if (document.location.href.match(/[^\/]+$/)[0] == 'dashboard.html') {
   $("#dashboardHome").removeAttr("href");
};

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

GLOB.serverRef = GLOB.trustjarRef.child('server');
GLOB.clientRef = GLOB.trustjarRef.child('client');
GLOB.authRef = GLOB.trustjarRef.child('authentication');
GLOB.homePageDataRef = GLOB.trustjarRef.child('server/home');
GLOB.blankServerRef = GLOB.trustjarRef.child('server/blank');
GLOB.loginRef = GLOB.trustjarRef.child('login');
GLOB.pageRef = GLOB.trustjarRef.child('global');
GLOB.homeRequestServerRef = GLOB.serverRef.child('home/homeRequestSubmit');
GLOB.registerPageDataRef = GLOB.serverRef.child('register');
GLOB.registerSubmitRef = GLOB.clientRef.child('register');
GLOB.landing1PageDataRef = GLOB.serverRef.child('landing1');
GLOB.landing1SubmitRef = GLOB.clientRef.child('landing1');
GLOB.homeSubmitRequestRef = GLOB.clientRef.child('home');
GLOB.serverLanding1Ref = GLOB.serverRef.child('landing1');
GLOB.clientLanding1Ref = GLOB.clientRef.child('landing1');
GLOB.serverLanding2Ref = GLOB.serverRef.child('landing2');
GLOB.clientLanding2Ref = GLOB.clientRef.child('landing2');
GLOB.footerRef = GLOB.trustjarRef.child('footer');
GLOB.displayRef = GLOB.trustjarRef.child('currentPage');
GLOB.notificationRef = GLOB.trustjarRef.child('notifications');


// Server sets the page to be displayed
GLOB.displayRef.on('child_added', function(childSnapshot, prevChildName) {
  // Retrieve the JSON string stored in alertMsg  
  var val = childSnapshot.val();
  var showNew = "#" + val;
  $(".splash").fadeOut(200);
  $('.pageDiv').each(function() {
    var pageId = '#' + this.id;
    if ( $(pageId).css('display') == 'block') {
      $(pageId).fadeOut(500);
    }
  setTimeout(function() {
      $(showNew).fadeIn(500);
      $('.anonHeader').fadeIn(500);
      $('.footer').fadeIn(500);
    }, 210);
  });
});


// Server sets the page to be displayed
GLOB.displayRef.on('child_changed', function(childSnapshot, prevChildName) {
  // Retrieve the JSON string stored in alertMsg  
  var val = childSnapshot.val();
  var showNew = "#" + val;
  $(".splash").fadeOut(200);
  $('.pageDiv').each(function() {
    var pageId = '#' + this.id;
    if ( $(pageId).css('display') == 'block') {
      $(pageId).fadeOut(250);
    }
  setTimeout(function() {
      $(showNew).fadeIn(500);
      $('.anonHeader').fadeIn(500);
      $('.footer').fadeIn(500);
    }, 260);
  });
});

// Server confirms receipt of Step 1 information from user by sending a Firebase message
// to populate the Step 1 summary and contact info for the user in the Step 2 form. This version
// is triggered the first time this data is sent to Firebase.
GLOB.homePageDataRef.on('child_added', function(childSnapshot, prevChildName) {
  // Retrieve the unique ID from the Firebase message
  var val = childSnapshot.val();
  if (val.serverAlert == "") {
    $("#homeServerAlertContent").html(val.serverAlert);
    $("#homeServerAlert").hide();
    $("#homeServerAlertContent").html('');
  } else {
    $("#disableControls").removeClass( "overlay" );
    $("#homeServerAlert").show();
    $("#homeServerAlertContent").html(val.serverAlert);
  };
});

// Server confirms receipt of Step 1 information from user by sending a Firebase message
// to populate the Step 1 summary and contact info for the user in the Step 2 form. This version 
// is used if existing Firebase data for these vaules is being modified.
GLOB.homePageDataRef.on('child_changed', function(childSnapshot, prevChildName) {
  // Retrieve the unique ID from the Firebase message
  var val = childSnapshot.val();
  if (val.serverAlert == "") {
    $("#homeServerAlert").hide();
    $("#homeServerAlertContent").html('');
  } else {
    $("#disableControls").removeClass( "overlay" );
    $("#homeServerAlert").show();
    $("#homeServerAlertContent").html(val.serverAlert);
  };
});





// Notification function. Notification will display only on the currently active pageDiv.
GLOB.notificationRef.on('child_added', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  if (val !== "") {
    $("#disableControls").removeClass( "overlay" );
    $(".notice").show();
    $(".noticeContent").html(val);
  } else {
    $(".notice").hide();
    $(".noticeContent").html('');
  };
});


// Notification function. Notification will display only on the currently active pageDiv.
GLOB.notificationRef.on('child_changed', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  if (val !== "") {
    $("#disableControls").removeClass( "overlay" );
    $(".notice").show();
    $(".noticeContent").html(val);
  } 
  else {
    $(".notice").hide();
    $(".noticeContent").html('');
  };
});

// homeDiv: populate Step 2 data, hide Step 1, show Step 2
GLOB.blankServerRef.on('child_added', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  GLOB.blankTitle = val.blankTitleData;
  GLOB.blankCopy = val.blankCopyData;
    $("#blankTitle").html(GLOB.blankTitle);
    $("#blankCopy").html(GLOB.blankCopy);
    $( "#disableControls" ).removeClass( "overlay" );
});


// homeDiv: populate Step 2 data, hide Step 1, show Step 2
GLOB.blankServerRef.on('child_changed', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  GLOB.blankTitle = val.blankTitleData;
  GLOB.blankCopy = val.blankCopyData;
    $("#blankTitle").html(GLOB.blankTitle);
    $("#blankCopy").html(GLOB.blankCopy);
    $( "#disableControls" ).removeClass( "overlay" );
});

// homeDiv: populate Step 2 data, hide Step 1, show Step 2
GLOB.registerPageDataRef.on('child_added', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  GLOB.registerUserContact = val.userContactData;
  GLOB.registerRelationshipType = val.relationshipTypeData;
  GLOB.registerCounterpartyContact = val.counterpartyContactData;
  GLOB.registerPasscode = val.passcodeData;
  $("#registerUserContact").html(GLOB.registerUserContact);
  // $("#homeServerUserContact2").val(GLOB.homeRequestUserContact);
  $("#registerPasscode").html(GLOB.registerPasscode);
  $("#registerRelationshipType").html(GLOB.registerRelationshipType);
  $("#registerCounterpartyContact").html(GLOB.registerCounterpartyContact);
  $( "#disableControls" ).removeClass( "overlay" );
  $("#registerServerAlertContent").html(val.serverAlert);
  if (val.serverAlert == "") {
    $("#registerServerAlert").hide();
  } else {
    $("#registerServerAlert").show();
  };
  $("#disableControls").removeClass( "overlay" );
});


// homeDiv: populate Step 2 data, hide Step 1, show Step 2
GLOB.registerPageDataRef.on('child_changed', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  GLOB.registerUserContact = val.userContactData;
  GLOB.registerRelationshipType = val.relationshipTypeData;
  GLOB.registerCounterpartyContact = val.counterpartyContactData;
  GLOB.registerPasscode = val.passcodeData;
  $("#registerUserContact").html(GLOB.registerUserContact);
  // $("#homeServerUserContact2").val(GLOB.homeRequestUserContact);
  $("#registerPasscode").html(GLOB.registerPasscode);
  $("#registerRelationshipType").html(GLOB.registerRelationshipType);
  $("#registerCounterpartyContact").html(GLOB.registerCounterpartyContact);
  $( "#disableControls" ).removeClass( "overlay" );
  $("#registerServerAlertContent").html(val.serverAlert);
  if (val.serverAlert == "") {
    $("#registerServerAlert").hide();
  } else {
    $("#registerServerAlert").show();
  };
  $("#disableControls").removeClass( "overlay" );
});

  // Populate landing1.html 
GLOB.landing1PageDataRef.on('child_added', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  $("#disableControls").removeClass( "overlay" ); // in case the server's responding to a user action on this page like an error
  // if multiple contacts are sent by the server, they will be sent as a comma-delimited list. Replace the commas with the <br>
  // tag so they can stack in the display.
  var requestingPartyContacts = val.requestorContactData.replace(/,/g, '<br>');
  var counterpartyContacts = val.counterpartyContactData.replace(/,/g, '<br>');
  GLOB.landing1Passcode = val.passcodeData;
  $("#landing1RequestorName").html(val.requestorName);
  $("#landing1Requestor").html(requestingPartyContacts);
  $("#landing1RelationshipType1").html(val.relationshipTypeData);
  $("#landing1Counterparty").html(counterpartyContacts);
  $("#landing1ConfirmContacts").html(val.counterpartyContactData);
  $("#landing1Counterparty").append('<br><b>' + val.thisCounterpartyContactData + '</b>');
  $("#landing1Counterparty2").html(val.thisCounterpartyContactData);
  if (val.relationshipTypeData == "casual") {
    $("#landing1RelationshipType2").html("a casual");
    $("#landing1CasualContent").removeClass("hidden");
    $("#landing1CasualContent2").removeClass("hidden");
  };
  if (val.relationshipTypeData == "exclusive") {
    $("#landing1RelationshipType2").text("an exclusive");
    $("#landing1CasualContent").addClass("hidden");
    $("#landing1CasualContent2").addClass("hidden");
  };
});

  // Populate landing1.html 
GLOB.landing1PageDataRef.on('child_changed', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  $("#disableControls").removeClass( "overlay" ); // in case the server's responding to a user action on this page like an error
  // if multiple contacts are sent by the server, they will be sent as a comma-delimited list. Replace the commas with the <br>
  // tag so they can stack in the display.
  var requestingPartyContacts = val.requestorContactData.replace(/,/g, '<br>');
  var counterpartyContacts = val.counterpartyContactData.replace(/,/g, '<br>');
  $("#landing1RequestorName").html(val.requestorName);
  $("#landing1Requestor").html(requestingPartyContacts);
  $("#landing1RelationshipType1").html(val.relationshipTypeData);
  $("#landing1Counterparty").html(counterpartyContacts);
  $("#landing1ConfirmContacts").html(val.counterpartyContactData);
  $("#landing1Counterparty").append('<br><b>' + val.thisCounterpartyContactData + '</b>');
  $("#landing1Counterparty2").html(val.thisCounterpartyContactData);
  if (val.relationshipTypeData == "casual") {
    $("#landing1RelationshipType2").html("a casual");
    $("#landing1CasualContent").removeClass("hidden");
    $("#landing1CasualContent2").removeClass("hidden");
  };
  if (val.relationshipTypeData == "exclusive") {
    $("#landing1RelationshipType2").text("an exclusive");
    $("#landing1CasualContent").addClass("hidden");
    $("#landing1CasualContent2").addClass("hidden");
  };
});


  // Populate landing2.html 
GLOB.serverLanding2Ref.on('child_added', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  if (val.thisPage = 'landing2.html') {
    $("#disableControls").removeClass( "overlay" ); // in case the server's responding to a user action on this page like an error
    // Hide the checkboxes used for conflicts by default, and remove the 'required' attribute. 
    // They will be displayed if the server confirms there is a conflict.
    $('#landing2ExclusiveCheckbox').prop('required', false);
    $("#landing2ConfirmExclusiveConflict").addClass( "hidden" );
    $('#landing2CasualCheckbox').prop('required', false);
    $("#landing2ConfirmCasualConflict").addClass( "hidden" );
    // if multiple contacts are sent by the server, they will be sent as a comma-delimited list. Replace the commas with the <br>
    // tag so they can stack in the display.
    var requestingPartyContacts = val.landing2RequestingPartyContacts.replace(/,/g, '<br>');
    var counterpartyContacts = val.landing2CounterpartyContacts.replace(/,/g, '<br>');
    $("#landing2RequestingParty").html(requestingPartyContacts);
    $("#landing2RelationshipType").html(val.landing2RelationshipType);
    $("#landing2Counterparty").html(counterpartyContacts);
    $("#landing2ConfirmContacts").html(val.landing2CounterpartyContacts);
    if ((val.conflict == true) && (val.landing2RelationshipType == "exclusive")) {
      $("#landing2ConfirmExclusiveConflict").removeClass( "hidden" );
      $('#landing2ExclusiveCheckbox').attr('required', 'required');
    };
    if ((val.conflict == true) && (val.landing2RelationshipType == "casual")) {
      $("#landing2ConfirmCasualConflict").removeClass( "hidden" );
      $('#landing2CasualCheckbox').attr('required', 'required');
    };
  };
});

  // Populate landing2.html 
GLOB.serverLanding2Ref.on('child_changed', function(childSnapshot, prevChildName) {
  var val = childSnapshot.val();
  if (val.thisPage = 'landing2.html') {
    $("#disableControls").removeClass( "overlay" ); // in case the server's responding to a user action on this page like an error
    // Hide the checkboxes used for conflicts by default, and remove the 'required' attribute. 
    // They will be displayed if the server confirms there is a conflict.
    $('#landing2ExclusiveCheckbox').prop('required', false);
    $("#landing2ConfirmExclusiveConflict").addClass( "hidden" );
    $('#landing2CasualCheckbox').prop('required', false);
    $("#landing2ConfirmCasualConflict").addClass( "hidden" );
    // if multiple contacts are sent by the server, they will be sent as a comma-delimited list. Replace the commas with the <br>
    // tag so they can stack in the display.
    var requestingPartyContacts = val.landing2RequestingPartyContacts.replace(/,/g, '<br>');
    var counterpartyContacts = val.landing2CounterpartyContacts.replace(/,/g, '<br>');
    $("#landing2RequestingParty").html(requestingPartyContacts);
    $("#landing2RelationshipType").html(val.landing2RelationshipType);
    $("#landing2Counterparty").html(counterpartyContacts);
    $("#landing2ConfirmContacts").html(val.landing2CounterpartyContacts);
    if ((val.conflict == true) && (val.landing2RelationshipType == "exclusive")) {
      $("#landing2ConfirmExclusiveConflict").removeClass( "hidden" );
      $('#landing2ExclusiveCheckbox').attr('required', 'required');
    };
    if ((val.conflict == true) && (val.landing2RelationshipType == "casual")) {
      $("#landing2ConfirmCasualConflict").removeClass( "hidden" );
      $('#landing2CasualCheckbox').attr('required', 'required');
    };
  };
});




// Send Step 1 data to Firebase when user selects submit
function headerSubmitLogin () {
      GLOB.loginRef.push( {  
        "loginId" : $('#loginId').val(),
        "password" : $('#loginPassword').val()
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}



// Send Step 1 data to Firebase when user selects submit
function homeSubmitRequest () {
      GLOB.homeSubmitRequestRef.push( {  
        "userContact" : $('#homeUserContact').val(),
        "relationshipType" : $("input[name=homeRelationshipType]:checked").val(),
        "counterpartyContact" : $('#homeCounterpartyContact').val(),
      } ); 
      $( "#disableControls" ).addClass( "overlay" );
      return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}


// Send Step 2 data to Firebase when user selects submit. Form will display an alert if the password 
// values don't match.
function registerForm () {
  var Name = $('#registerName').val()
  GLOB.registerSubmitRef.push( {  
    "name" : $('#registerName').val(),
    "TOS" : $('#registerTOS').prop( "checked" )
  }); 
  $( "#disableControls" ).addClass( "overlay" );
  return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}

// Submit login credentials to confirm identity (via page body form) in landing1Div
function landing1Submit () {
  GLOB.clientLanding1Ref.push( {  
    "passcode" : GLOB.landing1Passcode,
  } ); 
  $( "#disableControls" ).addClass( "overlay" );
  return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}


// Submit login credentials to confirm identity (via page body form) in landing1Div
function landing2SubmitCredentials () {
  GLOB.clientLanding2Ref.push( {  
    "loginEmail" : $('#landing2EmailCredentials').val(),
    "password" : $('#landing2PasswordCredentials').val(),
    "defaultCheckbox" : $('#landing2DefaultCheckbox').prop( "checked" ),
    "casualConflict" : $( "#landing2CasualCheckbox" ).prop( "checked" ),
    "exclusiveConflict" : $('#landing2ExclusiveCheckbox').prop( "checked" ),
  } ); 
  $( "#disableControls" ).addClass( "overlay" );
  return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
}

// Send Step 2 data to Firebase when user selects submit. Form will display an alert if the password 
// values don't match.
function landing2Register () {
  var password1 = $('#landing2Password1').val()
  var password2 = $('#landing2Password2').val()
  if(password1 != password2) {
    alert("Your passwords Don't Match. Please correct and resubmit.");
    return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
  } else {
    GLOB.clientLanding2Ref.push( {  
      "loginId" : $('#landing2RegLoginId').val(),
      "landing2Password1" : $('#landing2Password1').val(),
      "landing2Password2" : $('#landing2Password2').val(),
      "addContact" : $( "#landing2AddContact" ).prop( "checked" ),
    } ); 
    $( "#disableControls" ).addClass( "overlay" );
    return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
  };
}


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
  $( "#forgothomeRequest" ).hide();
  $( "#contactChanged" ).hide();
  $( "#forgotStep2" ).show();
}

// Displays the Registration form in landing2.html
function landing2ShowRegister () {
  $( "#landing2Register" ).removeClass( "hidden" );
  $( "#landing2Credentials" ).addClass( "hidden" );
}

// Displays the login credentials form in landing2.html
function landing2ShowCredentials () {
  $( "#landing2Register" ).addClass( "hidden" );
  $( "#landing2Credentials" ).removeClass( "hidden" );
}

/*
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

*/
/*
    // Script to import footer
    var link = document.querySelector('link[rel="import"]');

    // Clone the footer template in the import.
    var template = link.import.querySelector('homeFooterTemplate');
    var clone = document.importNode(template.content, true);

    document.querySelector('#homeFooter').appendChild(clone);



// $(".footerContent").get("./footer.html"); 


    function initialize() {
      // Send authentication credentials if they're present
        GLOB.authRef.push( {  
          "authToken" : "test",
        } ); 
      // Confirm that the page is ready in the Javascript console
    }

    window.onload = initialize();




    function initialize() {
      // Remove any previous listeners
      GLOB.trustjarRef.off();
      GLOB.trustjarRef.remove();

    }
*/


