// Create a global variable array to separate our globals from the rest of the DOM.
	GLOB = [];

// FUNCTION TO INITIALIZE UNIT TEST
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

// NON-FIREBASE FUNCTIONS

	// Randomized animal images
		// Array of 1000 px animals for the splash screen
		GLOB.splashAnimals = ['images/animals/bunnies_1000x1000.jpg', 'images/animals/elephants_1000x1000.jpg', 'images/animals/rhinos_1000x1000.jpg', 'images/animals/tortoises_1000x1000.jpg', 'images/animals/pigs_1000x1000.jpg', 'images/animals/penguins_1000x1000.jpg', 'images/animals/hamsters_1000x1000.jpg'];
		// Array of 300px animals for the splash page at smaller sizes
		GLOB.smallSplashAnimals = ['images/animals/bunnies_300x300.jpg', 'images/animals/elephants_300x300.jpg', 'images/animals/rhinos_300x300.jpg', 'images/animals/tortoises_300x300.jpg', 'images/animals/pigs_300x300.jpg', 'images/animals/penguins_300x300.jpg', 'images/animals/hamsters_300x300.jpg'];
		// Array of 200px animals for the footer
		GLOB.footerAnimals = ['images/animals/bunnies_200x200.jpg', 'images/animals/elephants_200x200.jpg', 'images/animals/rhinos_200x200.jpg', 'images/animals/tortoises_200x200.jpg', 'images/animals/pigs_200x200.jpg', 'images/animals/penguins_200x200.jpg', 'images/animals/hamsters_200x200.jpg'];
		// Select a random animal for each page location
		GLOB.randomizer = Math.floor(Math.random() * GLOB.smallSplashAnimals.length)
		GLOB.randomSmallSplashAnimal = GLOB.smallSplashAnimals[GLOB.randomizer]
		GLOB.randomFooterAnimal = GLOB.smallSplashAnimals[GLOB.randomizer]
		GLOB.randomSplashAnimal = GLOB.splashAnimals[Math.floor(Math.random() * GLOB.splashAnimals.length)]


		// This function changes sizing and position of animal images depending on the page width.
		function responsiveAnimals() {
			// For smaller page widths, use a smaller animal
			if (window.matchMedia("(max-width: 639px)").matches) {
				$('#splashBackground').css("background", "url(" + GLOB.randomSmallSplashAnimal + ") no-repeat calc(50%)");
			}
			// For larger page widths, user a full-sized splash animal
			if (window.matchMedia("(min-width: 640px)").matches) {
				$('#splashBackground').css("background", "url(" + GLOB.randomSplashAnimal + ") no-repeat calc(50%)");
			}
		}

		// For the footer animal, we'll do the same but the image is in the page and not the background so we can just replace it.
		var randomFooterAnimal = GLOB.footerAnimals[Math.floor(Math.random() * GLOB.footerAnimals.length)]
		$('#footerAnimals').attr('src', randomFooterAnimal)


	// Initialize all tooltips (required by bootstrap)
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		})

	// Toggle show / hide passcode field for login and landingExistingUser page elements. This removes the mask
	// from the passcode field so the user can visually confirm that it's correct.
		$('.showHide').on('click', function() {
			var showHideId= '#' + this.id;
			var showHidePasscode = '#' + this.id.replace("ShowHide", "Passcode");
			var showHideState = $(showHideId).html();
			if (showHideState == 'show') {
				$(showHideId).html("hide");
				$(showHidePasscode).attr("type", "text");
			}
			if (showHideState == 'hide') {
				$(showHideId).html("show");
				$(showHidePasscode).attr("type", "password");
			}
		});

	// Placeholder for function which will handle changing from one HTML page to another
		function goToNewPage(newURL){
			GLOB.goToNewURL = newURL;
		}

	// Overlay to disable controls. This overlay is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed.
		var td;
		function disableControls () {
		$( "#disableControlsOverlay" ).modal('show')
		// It also includes a timer that displays a message if the server hasn't responded after a certain amount of time. 
		// For the unit test, the delay is set for 4 seconds. In production, it should be 30 seconds. 
		td = setTimeout(
			function () { 
				$( "#technicalDifficulties" ).removeClass( "hidden" )
			}, 4000);
		}

	// Overlay to enable controls. Called when the client detects a new message on the server branch.
		function enableControls () {
			$( "#disableControlsOverlay" ).modal('hide')
			$( "#technicalDifficulties" ).addClass( "hidden" );
			// Clear the tech difficulties timeout so it's not triggered
			clearTimeout(td);
		}

	// Splash screen load animation. Changed color of each letter in the logo.
		function animateLogotype() {
			setTimeout(function(){ $("#t").addClass('TJ')}, 500);

			setTimeout(function(){ $("#r").addClass('TJ')}, 550);

			setTimeout(function(){ $("#t").removeClass('TJ')}, 600);
			setTimeout(function(){ $("#u").addClass('TJ')}, 600);

			setTimeout(function(){ $("#r").removeClass('TJ')}, 650);
			setTimeout(function(){ $("#s").addClass('TJ')}, 650);

			setTimeout(function(){ $("#u").removeClass('TJ')}, 700)
			setTimeout(function(){ $("#t2").addClass('TJ')}, 700)

			setTimeout(function(){ $("#s").removeClass('TJ')}, 750)
			setTimeout(function(){ $("#j").addClass('TJ')}, 750)

			setTimeout(function(){ $("#t2").removeClass('TJ')}, 800)
			setTimeout(function(){ $("#a").addClass('TJ')}, 800)

			setTimeout(function(){ $("#j").removeClass('TJ')}, 850)
			setTimeout(function(){ $("#r2").addClass('TJ')}, 850)

			setTimeout(function(){ $("#a").removeClass('TJ')}, 900)

			setTimeout(function(){ $("#a").addClass('TJ')}, 950)

			setTimeout(function(){ $("#j").addClass('TJ')}, 1000)
			setTimeout(function(){ $("#r2").removeClass('TJ')}, 1000)

			setTimeout(function(){ $("#t2").addClass('TJ')}, 1050)
			setTimeout(function(){ $("#a").removeClass('TJ')}, 1050)

			setTimeout(function(){ $("#s").addClass('TJ')}, 1100)
			setTimeout(function(){ $("#j").removeClass('TJ')}, 1100)

			setTimeout(function(){ $("#u").addClass('TJ')}, 1150)
			setTimeout(function(){ $("#t2").removeClass('TJ')}, 1150)

			setTimeout(function(){ $("#r").addClass('TJ')}, 1200)
			setTimeout(function(){ $("#s").removeClass('TJ')}, 1200)

			setTimeout(function(){ $("#t").addClass('TJ')}, 1250)
			setTimeout(function(){ $("#u").removeClass('TJ')}, 1250)

			setTimeout(function(){ $("#r").removeClass('TJ')}, 550)

			setTimeout(function(){ $("#r").addClass('TJ')}, 1350)

			setTimeout(function(){ $("#t").removeClass('TJ')}, 1400)
			setTimeout(function(){ $("#u").addClass('TJ')}, 1400)

			setTimeout(function(){ $("#r").removeClass('TJ')}, 1450)
			setTimeout(function(){ $("#s").addClass('TJ')}, 1450)

			setTimeout(function(){ $("#u").removeClass('TJ')}, 1500)
			setTimeout(function(){ $("#t2").addClass('TJ')}, 1500)

			setTimeout(function(){ $("#s").removeClass('TJ')}, 1550)
			setTimeout(function(){ $("#j").addClass('TJ')}, 1550)
		};

	// Retrieve the unique ID from Firebase and assign it to a global variable. 
	// We'll use it to create the main branch for client / server communications.
		GLOB.uniqueId = getSessionId()

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

// SERVER FIREBASE FUNCTIONS

	// Define an events listeners map. This maps page IDs against their respective page data handlers. 
	// Note that in most cases, no page data handler is necessary. This is preserved for potential future use. 
		var eventListenersMap = {
			"home" : noPageData,
			"homeConfirmation" : noPageData,
			"requestPasscode" : noPageData,
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
			if (pageData.landingFormCopy !== undefined) {
				$("#landingFormCopy").html(pageData.landingFormCopy);
			};
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
				var requestorContacts = pageData.requestorContacts.replace(/,/g, '<br />');
				$("#landingRequestor").html(requestorContacts);
				$("#landingRequestorName").html(pageData.requestorName);
				$("#landingRequestorName2").html(pageData.requestorName);
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

	// Page display function
		GLOB.displayRef.on('value', function(dataSnapshot) {
			// Retrieve the unique ID from the Firebase message
			var val = dataSnapshot.val();
			// Only execute the function if there is data at this reference
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
					// if the handler function returns a value that's not in the events listeners map, call the badPageName function
					// to tell the server via Firebase.
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
						// if another page div is being displayed, fade it out
						$('.pageTemplate').each(function() {
							var pageId = '#' + this.id;
							if ( $(pageId).css('display') == 'block') {
								$(pageId).fadeOut(300);
								$(showNew).fadeIn(300);
								// Remove the 'disable controls' overlay if one is present
								enableControls();
							}
						});
						// if the display is still showing the splash page, fade it out. 'Splash' is not part of the pageTemplate class
						// because 'pageTemplate's are hidden by default and the splash is displayed by default on page load.
						setTimeout(function() {
							$('#splash').fadeOut(200);
						}, 1400);
					}
				}
			}
		});

	// Server alert functions
		GLOB.serverAlertRef.on('value', function(dataSnapshot) {
			// Retrieve the alert string from the Firebase message
			var val = dataSnapshot.val();
			// If there is no alert message, clear the content from the server alert and hide it.
			if (val == null) {
				$("#serverAlertContent").html('');
				$('#serverAlertContainer').modal('hide');
			} else {
			// If the alert comtent is not empty, show the server alert and remove the overlay
			// that disables user controls.
				enableControls();
				$("#serverAlertContent").html(val);
				$('#serverAlertContainer').modal('show');
			};
		});

	// Footer content functions
		// Retrieves faq content and populates and opens the footer overlay when the 'faq' link is clicked
		$(".faqLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar frequently asked questions');
			GLOB.footerRef.child('faq').once('value', function(childSnapshot, prevChildName) {
					var val = childSnapshot.val();
					var faqCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
					$("#modalBody").html(faqCopy);
			});
		});

		// Retrieves privacy policy content and populates and opens the footer overlay when the 'privacy' link is clicked
		$(".privacyLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar Privacy Policy');
			GLOB.footerRef.child('privacy').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var privacyCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(privacyCopy);
			});
		});

		// Retrieves Terms and Conditions content and populates and opens the footer overlay when the 'terms' link is clicked
		$(".termsLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar Terms and Conditions');
			GLOB.footerRef.child('terms').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var termsCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(termsCopy);
			});
			});

		// Retrieves contact info and populates and opens the footer overlay when the 'contact' link is clicked
		$(".contactLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('Contact trustjar');
			GLOB.footerRef.child('contact').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var contactCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(contactCopy);
			});
		});

// CLIENT FIREBASE FUNCTIONS - ERROR HANDLING

	// Error functions
	// This is currently set only for the 'bad page name' case below.
		function badPageName( pageName ) {
			// If the client can't find a page that Firebase has specified for it in a page change message, alert Firebase
			GLOB.clientRef.push( {  
				"msgType": "pageDataError",
				"badPageName" : pageName
			} ); 
		}

// CLIENT FIREBASE FUNCTIONS - HEADER

	// User submits a login from the header. This function passes login ID and passcode to Firebase.
		function headerSubmitLogin () {
					GLOB.clientRef.push( {
						"msgType": "loginForm",
						"loginId" : $('#loginId').val(),
						"passcode" : $('#loginPasscode').val()
					} ); 
					disableControls ()
					return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User requests a return to the Home page. Returns the request to Firebase.
		$(document).on('click', '.goHome', function() {
			GLOB.clientRef.push( {  
				"msgType" : "returnToHomepage"
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});

	// User selects the 'Request Passcode' link in the header. Returns the request to Firebase.
		$('#requestPasscodeLink').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "requestPasscodeLink"
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});

// CLIENT FIREBASE FUNCTIONS - PAGE BODY

	// New requestor sends 'home' page form request to Firebase on form submission.
		function homeSubmitRequest () {
			var me = $('#homeRequestorContact').val();
			var you = $('#homeCounterpartyContact').val();
			// Stop the request if the requestor and counterparty IDs are identical.
			if (me == you) {
				alert("You appear to be creating a relationship with yourself. Please change one of the contacts you entered.")
				return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
			} else {
			// send the form contents to Firebase: requestor and counterparty contacts and relationship type, and TOS confirmation.
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

	// User submits 'request passcode' form from the requestPasscode page. Returns the request with the specified contact to Firebase.
		$('#requestPasscodeSubmitBtn').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "requestPasscodeForm",
				"userContact" : $('#requestPasscodeUserContact').val()
			}); 
			// Disable user controls
			disableControls ();
			return false; // We don't want the link to trigger a page load. We want the server to control that to maintain state consistency.
		});

	// User submits 'existing user' landing page form to approve a landing page request.
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

	// User submits 'new user' landing page form to approve a landing page request.
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

	// User selects "yes" from the "merge" form. Returns the request to Firebase.
		$('#landingMergeYesBtn').on('click', function() {
			GLOB.clientRef.push( { 
				"msgType" : "mergeYes"
			}); 
			// Disable user controls
			disableControls ()
		});

	// User selects "no" from the "merge" form. Returns the request to Firebase.
		$('#landingMergeNoBtn').on('click', function() {
			GLOB.clientRef.push( { 
				"msgType" : "mergeNo"
			}); 
			// Disable user controls
			disableControls ()
		});

	// User selects 'cancel' on a landing page form which opens the 'cancel request' modal confirmation dialog.
		$(".landingCancelBtn").click(function(){
			$("#landingCancelRelationshipOverlay").modal({backdrop: true});
		});

	// User confirms 'cancel' request from the modal confirmation dialog which sends a message to Firebase.
		$("#landingCancelConfirmBtn").click(function(){
			GLOB.clientRef.push( {  
				"msgType": "landingCancel"
			}); 
			// Disable user controls
			disableControls ()
		});

// INITIALIZATION FUNCTION
	$(document).ready(function() {
	    // Retrieve and display randomized animals
	    responsiveAnimals();
	    // check whenever page width is resized to handle dynamic elements in responsive design
	    $(window).resize(responsiveAnimals);
	    // run the logotype animation on page load
	    window.onload = animateLogotype()
	});