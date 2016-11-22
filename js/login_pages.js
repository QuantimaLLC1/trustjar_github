// Create a global variable array to separate our globals from the rest of the DOM.
	GLOB = [];

// Function to initialize unit test
	var initializeUnitTest = function() {
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
	
// PRE-LOAD RANDOMIZED ANIMAL IMAGES
GLOB.splashAnimals = ['images/animals/bunnies_1000x1000.jpg', 'images/animals/elephants_1000x1000.jpg', 'images/animals/rhinos_1000x1000.jpg', 'images/animals/tortoises_1000x1000.jpg', 'images/animals/pigs_1000x1000.jpg', 'images/animals/penguins_1000x1000.jpg', 'images/animals/hamsters_1000x1000.jpg'];
GLOB.topAnimals = ['images/animals/bunnies_300x300.jpg', 'images/animals/elephants_300x300.jpg', 'images/animals/rhinos_300x300.jpg', 'images/animals/tortoises_300x300.jpg', 'images/animals/pigs_300x300.jpg', 'images/animals/penguins_300x300.jpg', 'images/animals/hamsters_300x300.jpg'];
// GLOB.smallTopAnimals = ['images/animals/bunnies_100x100.jpg', 'images/animals/elephants_100x100.jpg', 'images/animals/rhinos_100x100.jpg', 'images/animals/tortoises_100x100.jpg', 'images/animals/pigs_100x100.jpg', 'images/animals/penguins_100x100.jpg', 'images/animals/hamsters_100x100.jpg'];
GLOB.footerAnimals = ['images/animals/bunnies_200x200.jpg', 'images/animals/elephants_200x200.jpg', 'images/animals/rhinos_200x200.jpg', 'images/animals/tortoises_200x200.jpg', 'images/animals/pigs_200x200.jpg', 'images/animals/penguins_200x200.jpg', 'images/animals/hamsters_200x200.jpg'];
GLOB.randomizer = Math.floor(Math.random() * GLOB.topAnimals.length)
GLOB.randomHeaderAnimal = GLOB.topAnimals[GLOB.randomizer]
//GLOB.randomSmallHeaderAnimal = GLOB.smallTopAnimals[GLOB.randomizer]
GLOB.randomFooterAnimal = GLOB.topAnimals[GLOB.randomizer]
GLOB.randomSplashAnimal = GLOB.splashAnimals[Math.floor(Math.random() * GLOB.splashAnimals.length)]


// This function changes sizing and position of animal images depending on the page width.
function responsiveAnimals() {
	// For larger page widths, use the 300px animal images in the header and position them per Creative
	if (window.matchMedia("(min-width: 992px)").matches) {
		$('#dashboard').css("background", "url(" + GLOB.randomHeaderAnimal + ") no-repeat calc(50% + 350px) top");
		$('.requestorRelationshipCheckbox').addClass('pull-right');
		$('#footerCopy').addClass('footerText')
	}
	// For smaller page widths, use the 100px animal images in the header and change their position
	if (window.matchMedia("(max-width: 991px)").matches) {
//		$('#dashboard').css("background", "url(" + GLOB.randomSmallHeaderAnimal + ") no-repeat calc(98%) 5px");
		$('#dashboard').css("background", "url('')");
		$('.requestorRelationshipCheckbox').removeClass('pull-right');
		$('#footerCopy').removeClass('footerText')
	}
	if (window.matchMedia("(min-width: 640px)").matches) {
		$('.splashText').css({'font-size': '60px'})
		$('#splashBackground').css("background", "url(" + GLOB.randomSplashAnimal + ") no-repeat calc(50%)");
	}
	if (window.matchMedia("(max-width: 639px)").matches) {
		$('.splashText').css({'font-size': '48px', 'letter-spacing': '10px'})
		$('#splashBackground').css("background", "url(" + GLOB.randomHeaderAnimal + ") no-repeat calc(50%)");
	}
}

// NON-FIREBASE FUNCTIONS

	// Initialize all tooltips (required by bootstrap)
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})

	// Retrieve the unique ID from Firebase and assign it to a global variable. 
	// We'll use it to create the main branch for client / server communications.
	GLOB.uniqueId = getSessionId()

	// Toggle show / hide passcode field for login. This removes the mask
	// from the passcode field so the user can visually confirm that it's correct.
	$('#loginShowHide').on('click', function() {
		var showHideState = $("#loginShowHide").html();
			if (showHideState == 'show') {
				$("#loginPasscode").attr("type", "text");
				$("#loginShowHide").html("hide");
			}
			if (showHideState == 'hide') {
				$("#loginPasscode").attr("type", "password");
				$("#loginShowHide").html("show");
			}
	});

	// Toggle show / hide passcode field for landingExistingUsera. This removes the mask
	// from hte passcode field so the user can visually confirm that it's correct.
	$('#landingExistingUseraShowHide').on('click', function() {
		var showHideState = $("#landingExistingUseraShowHide").html();
			if (showHideState == 'show') {
				$("#landingExistingUseraPasscode").attr("type", "text");
				$("#landingExistingUseraShowHide").html("hide");
			}
			if (showHideState == 'hide') {
				$("#landingExistingUseraPasscode").attr("type", "password");
				$("#landingExistingUseraShowHide").html("show");
			}
	});

	function goToNewPage(newURL){
		GLOB.goToNewURL = newURL;
	}


	// Overlay to disable controls. This overlay is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed.
	// It also includes a timer that displays a message if the server hasn't responded after a certain amount of time. 
	// For the unit test, the delay is set for 4 seconds. In production, it should be 30 seconds. 
	var td;
	function disableControls () {
	$( "#disableControlsOverlay" ).modal('show')
	td = setTimeout(
		function () { 
			$( "#technicalDifficulties" ).removeClass( "hidden" )
		}, 4000);
	}

	// Overlay to enable controls. Called when the client detects a new message on the server branch.
	function enableControls () {
		$( "#disableControlsOverlay" ).modal('hide')
		$( "#technicalDifficulties" ).addClass( "hidden" );
		clearTimeout(td);
	}

// SESSION ID PLACEHOLDER
	function getSessionId() {
			// This is a placeholder. In the real world, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

// FIREBASE REFERENCES
	// Set our static Firebase key path
	// The following references will not be overwritten when a unique ID is received.
	GLOB.trustjarRef = new Firebase("https://trustjartemp.firebaseio.com");
	GLOB.clientRef = GLOB.trustjarRef.child('sessions/fromClient/' + GLOB.uniqueId);
	GLOB.serverRef = GLOB.trustjarRef.child('sessions/fromServer/' + GLOB.uniqueId);
	GLOB.displayRef = GLOB.serverRef.child('currentPage');
	GLOB.footerRef = GLOB.trustjarRef.child('commonBranch/footer');
	GLOB.landingPageDataRef = GLOB.serverRef.child('landingPageData'); 
	GLOB.serverAlertRef = GLOB.serverRef.child('serverAlert');


		var eventListenersMap = {
			"home" : noPageData,
			"homeConfirmation" : noPageData,
			"requestPasscodePage" : noPageData,
			"requestPasscodeConfirmation": noPageData,
			"landing" : landingPageHandler,
			"landingCancelConfirmation" : noPageData,
			"blank" : noPageData // This line is for the unit test only and can be reomved during production.
		}


	// Use the page name and the corresponding page handler function (as defined by the eventsListenerMap)
	// The naming conventions were designed so they could be programmatically constructed based on the page name.
	function getDataOnce( pageName, handlerFunction ) {
		// Construct the URL corresponding to the Firebase page data reference, based on the page name.
		var pageDataKeyPath = GLOB.serverRef + '/' + pageName + 'PageData';
		// Create a true Firebase reference based on the URL constructed in the previous line.
		var thisPathRef = new Firebase (pageDataKeyPath);
		// Retrieve the data at the new Firebase reference
		thisPathRef.once('value', function(dataSnapshot) {
			var val = dataSnapshot.val();
			// Send the retrieved data to the corresponding handler function
			return (handlerFunction (val))
		});
	}

		// THis function is used for pages that require no page data to populate them.
		function noPageData( pageData ) {
		};

		// THis function is used for pages that require no page data to populate them.
		function landingPageHandler( pageData ) {
			// Display any landing form copy specified in the Firebase message.
			$("#landingFormCopy").html(pageData.landingFormCopy);
			// Populate the user contact with the userContact page data. In a landingRequestor page, this will
			// be the requestor contact, in a landingCounterparty page, this will be the counterparty contact.
			$("#landingUserContact").html(pageData.userContact);
			// Display the contact for which the request is being processed
			$("#landingFormUserContact").html(pageData.userContact);
			// newPasscode is for the New User form only.
			// If a newPasscode was included in the Firebase message, display it in the New User form
			if (pageData.newPasscode !== undefined) {
				$("#landingNewUserPasscode").html(pageData.newPasscode);
			};
			// requestorContacts and relationshipType are for the counterparty subhead only.
			// If they're included in the Firebase message, display them in the counterparty subhead.			
			if (pageData.requestorContacts !== undefined) {
				var requestorContacts = pageData.requestorContacts.replace(/,/g, '<br>');
				$("#landingRequestor").html(requestorContacts);
				$("#landingRequestorName").html(pageData.requestorName);
				$("#landingRelationshipType1").html(pageData.relationshipType);
			};
			// relationshipType is for the counterparty subhead only.
			// If relationshipType is included in the Firebase message, make sure the counterparty subhead represents 
			// it properly wherever the relationship type (casual or exclusive) is referenced.
			if (pageData.relationshipType !== undefined) {
				if (pageData.relationshipType == "exclusive") {
					$("#landingRelationshipType2").text("an exclusive");
					$("#landingRelationshipType3").text("a casual or exclusive");
					$("#landingExclusiveContent").removeClass("hidden");
					$("#landingCasualContent").addClass("hidden");
					$("#landingCasualContent2").addClass("hidden"); 
				};
				if (pageData.relationshipType == "casual") {
					$("#landingRelationshipType2").text("a casual");
					$("#landingRelationshipType3").text("an exclusive");
					$("#landingCasualContent").removeClass("hidden");
					$("#landingCasualContent2").removeClass("hidden"); 
				};
			};
		};



// FIREBASE SERVER FUNCTIONS
	// Page display functions
	GLOB.displayRef.on('value', function(dataSnapshot) {
		// Retrieve the unique ID from the Firebase message
		var val = dataSnapshot.val();
		if (val !== null) {		
			var handlerFunction = eventListenersMap[ val ];
			var checkURL = val.substring(0,3)
			if( checkURL == 'URL' ) {
				var newPage = val.substring(4);
				// This function will replace the current one as soon as we have a solution for DOM continuity on HTML page change.
				// For the time being, it's commented out.
				// window.location = newPage

				// In the meantime, we'll call a function for the unit test.
				goToNewPage(newPage)
			} else {
				if( handlerFunction == null ) {
					badPageName( val );
				} else {
					// Disable a link if the link refers to the current page and restore it if we
					// leave that page template for the confirmation template.
					if( val == "requestPasscode" ) {
						$('#requestPasscodeLink').hide()
					}
					if( val == "requestPasscodeConfirmation" ) {
						$('#requestPasscodeLink').show()
					}
					if( val == "home" ) {
						$("#headerLogoLink").removeClass("goHome");
					}
					if( val == "homeConfirmation" ) {
						$("#headerLogoLink").addClass("goHome");
					}

					getDataOnce (val, handlerFunction)

					// prepend '#' to the pageName so we can operate on the corresponding div in the HTML
					var showNew = "#" + val;
					$(showNew).show()
					// if the display is still showing the splash page, fade it out. 'Splash' is not part of the pageTemplate class
					// because 'pageTemplate's are hidden by default, and the splash is displayed by default.
					$('#splash').fadeOut(300);
					// if another page div is being displayed, fade it out
					$('.pageTemplate').each(function() {
						var pageId = '#' + this.id;
						if ( $(pageId).css('display') == 'block') {
							$(pageId).fadeOut(100);
							// Remove the 'disable controls' overlay if one is present
							enableControls();
						}
					});
					// fade the new page in, allowing for the old page to fade out first
					setTimeout(function() {
						$(showNew).fadeIn(100);
					}, 200);
				}
			}
		}
	});

	// Server alert functions
	GLOB.serverAlertRef.on('value', function(dataSnapshot) {
		// Retrieve the alert string from the Firebase message
		var val = dataSnapshot.val();
		// If the alert comtent is empty, hide the server alert
		if (val == undefined) {
			$('#serverAlertContainer').fadeTo(500, 0, function(){
	   		$('#serverAlertContainer').css("visibility", "hidden");   
	   		// The opacity must be reset because opacity was the attribute used for the fade effect.  
	   		$('#serverAlertContainer').css("opacity", "100");   
			});
		} else {
		// If the alert comtent is not empty, show the server alert and remove the overlay
		// that disables user controls.
			enableControls();
			$('#serverAlertContainer').css('visibility', 'visible').hide().fadeIn('slow');
		};
		$("#serverAlertContainer").html(val);
	});

	// Footer content
		// Retrieves help content from Firebase and opens the Help overlay
		$(".helpLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Help');
			GLOB.footerRef.child('help').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var helpCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(helpCopy);
			});
		});

		// Retrieves Privacy Policy content and opens the Privacy Policy overlay
		$(".privacyLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Privacy Policy');
			GLOB.footerRef.child('privacy').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var privacyCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(privacyCopy);
			});
		});

		// Retrieves Terms and Conditions content and opens the Terms and Conditions overlay
		$(".termsLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Terms and Conditions');
			GLOB.footerRef.child('terms').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var termsCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(termsCopy);
			});
			});

		// Retrieves 'Contact Us' content and opens the Contact Us overlay.
		$(".contactLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('Contact trustjar');
			GLOB.footerRef.child('contact').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var contactCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(contactCopy);
			});
		});

// FIREBASE CLIENT FUNCTIONS

	// Error functions
	// This is currently set only for the 'bad page name' case below.
		function badPageName( pageName ) {
			// If the client can't find a page that Firebase has specified for it in a page change message, alert Firebase
			GLOB.clientRef.push( {  
				"msgType": "pageDataError",
				"badPageName" : pageName
			} ); 
		}

	// User submits a login from the header
		function headerSubmitLogin () {
					GLOB.clientRef.push( {
						"msgType": "loginForm",
						"loginId" : $('#loginId').val(),
						"passcode" : $('#loginPasscode').val()
					} ); 
					disableControls ()
					return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User submits a login from the header
		function requestPasscodeSubmit () {
					GLOB.clientRef.push( {
						"msgType": "requestPasscode",
						"userContact" : $('#userContact').val(),
					} ); 
					disableControls ()
					return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// New requestor sends 'home' form request to Firebase when user selects submit
		function homeSubmitRequest () {
			var me = $('#homeRequestorContact').val();
			var you = $('#homeCounterpartyContact').val();
			if (me == you) {
				alert("You appear to be creating a relationship with yourself. Please change one of the contacts you entered.")
				return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
			} else {
				GLOB.clientRef.push( {  
					"msgType": "newRequestorForm",
					"newRequestorContact" : $('#homeRequestorContact').val(),
					"relationshipType" : $("input[name=homeRelationshipType]:checked").val(),
					"counterpartyContact" : $('#homeCounterpartyContact').val(),
					"newUserCheckbox" : $('#homeNewUserCheckbox').prop( "checked" )
				}); 
				disableControls ()
				return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
			}
		}

		// User selects "merge" from the "merge or diverge" form
		$('#landingMergeYesBtn').on('click', function() {
			GLOB.clientRef.push( { 
				"msgType" : "mergeYes"
			}); 
			// Disable user controls
			disableControls ()
		});

		// User selects "merge" from the "merge or diverge" form
		$('#landingMergeNoBtn').on('click', function() {
			GLOB.clientRef.push( { 
				"msgType" : "mergeNo"
			}); 
			// Disable user controls
			disableControls ()
		});


		// Counterparty answers the question: "Do you have an existing Trustjar account?"
		$('#isCurrentUser').on('change', function() {
			GLOB.clientRef.push( { 
				"msgType" : "anonymousUserForm",
				"merge" : "yes"
			}); 
			// Disable user controls
			disableControls ()
		});

		// User requests a return to the Home page. We're using a modified version of the event handler
		// because we want the class to be read at the moment of the click event.
		$(document).on('click', '.goHome', function() {
		// $('document.body').on('click', '.goHome', function() {
			GLOB.clientRef.push( {  
				"msgType" : "returnToHomepage"
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});


		// User selects the 'Request Passcode' link in the header
		$('#requestPasscodeLink').on('click', function() {
		// $('document.body').on('click', '.goHome', function() {
			GLOB.clientRef.push( {  
				"msgType" : "requestPasscodeLink"
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});


		// User submits 'request passcode' from the requestPasscode page
		$('#requestPasscodeSubmitBtn').on('click', function() {
		// $('document.body').on('click', '.goHome', function() {
			GLOB.clientRef.push( {  
				"msgType" : "requestPasscodeForm",
				"userContact" : $('#requestPasscodeUserContact').val()
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});

		// Requestor selects 'cancel' on a requestorLanding page form. All versions of the counterparty
		// landing page use this function.
		$("#landingCancelConfirmBtn").click(function(){
			GLOB.clientRef.push( {  
				"msgType": "landingCancel"
			}); 
			// Disable user controls
			disableControls ()
		});


		// Counterparty selects 'cancel' on a landing page form. All versions of the counterparty
		// landing page use this function.
		$("#requestorCancelRequestBtn").click(function(){
			GLOB.clientRef.push( {  
				"msgType": "requestorLandingCancel"
			}); 
			// Disable user controls
			disableControls ()
		});

		$(".landingCancelBtn").click(function(){
			$("#landingCancelRelationshipOverlay").modal({backdrop: true});
		});

		// Counterparty submits landing page form to approve the relationship request. THis function is used 
		// specifically by landingExistingUserForma.
		function landingExistingUserSubmit () {
			GLOB.clientRef.push( {  
				"msgType": "landingExistingUserForm",
				"passcode" : $('#landingExistingUserPasscode').val(),
				"TOSCheckbox" : $('#landingExistingUserTOSCheckbox').prop( "checked" )
			} ); 
			// Disable user controls
			disableControls ()
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}


		// Counterparty submits landing page form to approve the relationship request. THis function is used 
		// specifically by landingExistingUserFormb.
		function landingNewUserSubmit () {
			GLOB.clientRef.push( {  
				"msgType": "landingNewUserForm",
				"profileName" : $('#landingNewUserName').val(),
				"TOSCheckbox" : $('#landingNewUserTOSCheckbox').prop( "checked" ),
			} ); 
			// Disable user controls
			disableControls ()
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}