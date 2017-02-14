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



		// This function changes sizing and position of animal images and other page elements depending on the page width.
		function responsiveAnimals() {	
	    // Get the full page URL and split its components into an array 
	    var splitThisPageURL = window.location.pathname.split('/');
	    // Get the page name by removing the last value from the array and returning it
	    var thisPageName = splitThisPageURL.pop();
	    // Repeat the above to get the parent directory name
	    var thisPageParent = splitThisPageURL.pop();

	if (thisPageParent == "dashboard") {
		// Array of 1000 px animals for the splash screen
		GLOB.splashAnimals = ['../images/animals/bunnies_1000x1000.jpg', '../images/animals/elephants_1000x1000.jpg', '../images/animals/rhinos_1000x1000.jpg', '../images/animals/tortoises_1000x1000.jpg', '../images/animals/pigs_1000x1000.jpg', '../images/animals/penguins_1000x1000.jpg', '../images/animals/hamsters_1000x1000.jpg', '../images/animals/bunny_tortoise_1000x1000.jpg', '../images/animals/cat_dog_1000x1000.jpg', '../images/animals/goldfish_1000x1000.jpg'];
		// Array of 300px animals for the splash page at smaller sizes and for the dashboard header
		GLOB.headerAnimals = ['../images/animals/bunnies_300x300.jpg', '../images/animals/elephants_300x300.jpg', '../images/animals/rhinos_300x300.jpg', '../images/animals/tortoises_300x300.jpg', '../images/animals/pigs_300x300.jpg', '../images/animals/penguins_300x300.jpg', '../images/animals/hamsters_300x300.jpg', '../images/animals/bunny_tortoise_300x300.jpg', '../images/animals/cat_dog_300x300.jpg', '../images/animals/goldfish_300x300.jpg'];
		// Array of 200px animals for the footer
		GLOB.footerAnimals = ['../images/animals/bunnies_200x200.jpg', '../images/animals/elephants_200x200.jpg', '../images/animals/rhinos_200x200.jpg', '../images/animals/tortoises_200x200.jpg', '../images/animals/pigs_200x200.jpg', '../images/animals/penguins_200x200.jpg', '../images/animals/hamsters_200x200.jpg', '../images/animals/bunny_tortoise_200x200.jpg', '../images/animals/cat_dog_200x200.jpg', '../images/animals/goldfish_200x200.jpg'];
		// Select a random animal for each page location
	} else {
	
		// Array of 1000 px animals for the splash screen
		GLOB.splashAnimals = ['images/animals/bunnies_1000x1000.jpg', 'images/animals/elephants_1000x1000.jpg', 'images/animals/rhinos_1000x1000.jpg', 'images/animals/tortoises_1000x1000.jpg', 'images/animals/pigs_1000x1000.jpg', 'images/animals/penguins_1000x1000.jpg', 'images/animals/hamsters_1000x1000.jpg', 'images/animals/bunny_tortoise_1000x1000.jpg', 'images/animals/cat_dog_1000x1000.jpg', 'images/animals/goldfish_1000x1000.jpg'];
		// Array of 300px animals for the splash page at smaller sizes and for the dashboard header
		GLOB.headerAnimals = ['images/animals/bunnies_300x300.jpg', 'images/animals/elephants_300x300.jpg', 'images/animals/rhinos_300x300.jpg', 'images/animals/tortoises_300x300.jpg', 'images/animals/pigs_300x300.jpg', 'images/animals/penguins_300x300.jpg', 'images/animals/hamsters_300x300.jpg', 'images/animals/bunny_tortoise_300x300.jpg', 'images/animals/cat_dog_300x300.jpg', 'images/animals/goldfish_300x300.jpg'];
		// Array of 200px animals for the footer
		GLOB.footerAnimals = ['images/animals/bunnies_200x200.jpg', 'images/animals/elephants_200x200.jpg', 'images/animals/rhinos_200x200.jpg', 'images/animals/tortoises_200x200.jpg', 'images/animals/pigs_200x200.jpg', 'images/animals/penguins_200x200.jpg', 'images/animals/hamsters_200x200.jpg', 'images/animals/bunny_tortoise_200x200.jpg', 'images/animals/cat_dog_200x200.jpg', 'images/animals/goldfish_200x200.jpg'];
		// Select a random animal for each page location
	}





		GLOB.randomizer = Math.floor(Math.random() * GLOB.headerAnimals.length)
		GLOB.randomHeaderAnimal = GLOB.headerAnimals[Math.floor(Math.random() * GLOB.headerAnimals.length)]
		GLOB.randomSplashAnimal = GLOB.splashAnimals[Math.floor(Math.random() * GLOB.splashAnimals.length)]
		// For the footer animal, we'll do the same but the image is in the page and not the background so we can just replace it.
		var randomFooterAnimal = GLOB.footerAnimals[Math.floor(Math.random() * GLOB.footerAnimals.length)]
		$('#footerAnimals').attr('src', randomFooterAnimal)




			// For larger page widths, use the 300px animal images in the header and position them per Creative (dashboard only)
			if (window.matchMedia("(min-width: 992px)").matches) {
				$('#dashboard').css("background", "url(" + GLOB.randomHeaderAnimal + ") no-repeat calc(50% + 350px) top");
				// dashboard: right-justify the requestor checkboxes in the relationship form. We do this here instead of in the 
				// CSS because we're adding and removing the entire Bootstrap class itself. (dashboard only)
				$('.pseudo-checkbox-1-Label').addClass('pull-right');
			}
			// For smaller page widths, remove the header animals (dashboard only)
			if (window.matchMedia("(max-width: 991px)").matches) {
				$('#dashboard').css("background", "url('')");
				// change the text justification for checkboxes to match default responsive behavior. We do this here instead 
				// of in the CSS because we're adding and removing the entire Bootstrap class itself. (dashboard only)
				$('.pseudo-checkbox-1-Label').removeClass('pull-right');
			}
			// For smaller page widths, use a smaller animal for the splash screen
			if (window.matchMedia("(max-width: 639px)").matches) {
				$('#splashBackground').css("background", "url(" + GLOB.randomHeaderAnimal + ") no-repeat calc(50%)");
			}
			// For larger page widths, user a full-sized splash animal
			if (window.matchMedia("(min-width: 640px)").matches) {
				$('#splashBackground').css("background", "url(" + GLOB.randomSplashAnimal + ") no-repeat calc(50%)");
			}
		}


	// Initialize all tooltips (required by bootstrap)
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		})

	// Toggle show / hide passcode field for login, landingExistingUser, and Dashboard page elements. This removes the mask
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

	// Overlay to disable controls. This is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed.
	var td;
	function disableControls () {
	$( "#disableControlsOverlay" ).modal('show')
	// The 'technical difficulties' overlay appears if the 'disable controls' overlay is active for 
	// too long, meaning there's been a disruption in client / server communication. Recommended delay time
	// is a minimum of 30 seconds; to facilitate the unit test it's currently set for 4 seconds and should be
	// changed before launch.
	td = setTimeout(
		function () { 
			$( "#technicalDifficulties" ).removeClass( "hidden" )
		}, 4000);
	}

	// Overlay to enable controls. Called when the client detects a new message on the server branch.
		function enableControls () {
			$( "#disableControlsOverlay" ).modal('hide')
			$( "#technicalDifficulties" ).addClass( "hidden" );
			// Clear the tech difficulties timeout so it's not triggered when this function is called before the disableControls 
			// setTimeout is executed.
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

	// Retrieve the session ID from Firebase and assign it to a global variable. 
	// We'll use it to create the main branch for client / server communications.
	// This is a placeholder until server implementation is complete.
		GLOB.uniqueId = getSessionId()

	// Open the tab containing Our Rules of Good Behavior in the content module.
		$(".goodBehavior").click(function(){
			$('#contentTabs a[href="#whyTrustjarCopy"]').tab('show')
		});

// SESSION ID PLACEHOLDER
	function getSessionId() {
			// This is a placeholder. In the real world, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

// FIREBASE REFERENCES
	// Set our primary static Firebase key path
	GLOB.trustjarRef = new Firebase("https://trustjarTemp.firebaseio.com/");
    // Set the branch for all client messages to Firebase
	GLOB.clientRef = GLOB.trustjarRef.child('sessions/fromClient/' + GLOB.uniqueId);
	// Set the branch for all server messages to Firebaser
	GLOB.serverRef = GLOB.trustjarRef.child('sessions/fromServer/' + GLOB.uniqueId);
	// Set the current page / page template display
	GLOB.displayRef = GLOB.serverRef.child('currentPage');
	// Used to read footer content on a common public branch set by Firebase. May change pending server implementation.
	GLOB.footerRef = GLOB.trustjarRef.child('commonBranch/footer');
	// Firebase reference for all dashboard page data.
	GLOB.dashboardPageDataRef = GLOB.serverRef.child('dashboardPageData');
	// Reference for all server-generated 'system alert' messages.
	GLOB.serverAlertRef = GLOB.serverRef.child('serverAlert');
// SERVER FIREBASE FUNCTIONS
/*
	// List of page template IDs. If a value for currentPage in Firebase doesn't match one of the page templates in this list,
	// return a "badPageName" message to the server. 
		var pageTemplateList = [
			"home",
			"homeConfirmation",
			"requestPasscode",
			"requestPasscodeConfirmation",
			"landingRequestorNew",
			"cancelLandingRequestorNew",
			"landingRequestorExisting",
			"cancelLandingRequestorExisting",
			"landingRequestorMerge",
			"cancelLandingRequestorMerge",
			"landingCounterpartyNew",
			"cancelLandingCounterpartyNew",
			"landingCounterpartyExisting",
			"cancelLandingCounterpartyExisting",
			"landingCounterpartyMerge",
			"cancelLandingCounterpartyMerge",
			"dashboard"
		]

*/		// THis function is used for pages that require no page data to populate them.
		function landingPageDataHandler( pageData ) {
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
				var checkURL = val.substring(0,3)
				if( checkURL == 'URL' ) {
					var newPage = val.substring(4);
					if( document.location.href == newPage ) {
						return false;
					} else {
						window.location.replace(newPage);
					}
				} else {
					// if the handler function returns a value that's not in the pageTemplateList, call the badPageName function and return the value received.
					// to tell the server via Firebase.
					var arrayOfIds = $.map($(".pageTemplate"), function(n, i){
						return n.id;
					});
					if($.inArray(val, arrayOfIds) == -1) {
						alert(val);
						badPageName( val );
					} else {
						// Disable a link if the link refers to the current page and restore it if we leave that page template during the session.
						// This only applies to the home page and the requestPasscode page.
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

						// If we're loading a landing page, create the Firebase reference and the listener that will call the landingPageData handler
						// and then call the handler.
						if (val.substr(0,7) == 'landing') {
							// Create a Firebase reference for landing page data
							var trustjarLandingRef = new Firebase (GLOB.serverRef + '/landingPageData');
							// Retrieve the data at the new Firebase reference
							trustjarLandingRef.once('value', function(dataSnapshot) {
								var val = dataSnapshot.val();
								// Send the retrieved data to the corresponding handler function
								return (landingPageDataHandler (val))
							});
						}
						// Hide any previous page template from display
						$('.pageTemplate').hide();
						// prepend '#' to the currentPage value (val) so we can display it
						var newPageTemplate = "#" + val;
						// display the specified template
						$(newPageTemplate).show();
						// Remove the 'disable controls' overlay if present
						enableControls();
						// if the display is still showing the splash page, fade it out. 'Splash' is not part of the pageTemplate class
						// because 'pageTemplate's are hidden by default and the splash is displayed by default on page load.
						// The timeout allows the splash page animation to complete.
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
				"msgType": "pageError",
				"errorType": "badPageName",
				"messageReceived" : pageName
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

// INITIALIZATION FUNCTIONS

	$(document).ready(function() {
	    // Retrieve and display randomized animals
	    responsiveAnimals();
	    // check whenever page width is resized to handle dynamic elements in responsive design
	    $(window).resize(responsiveAnimals);
	    // run the logotype animation on page load
	    window.onload = animateLogotype(); 

	    // Since both the homepage and the dashboard page have the page name "index.html", we want to distinguish 
	    // the dashboard index from the homepage index. So in that case, the message sent to Firebase should be "dashboard/index.html".
	    // Get the full page URL and split its components into an array 
	    var splitThisPageURL = window.location.pathname.split('/');
	    // Get the page name by removing the last value from the array and returning it
	    var thisPageName = splitThisPageURL.pop();
	    // Repeat the above to get the parent directory name
	    var thisPageParent = splitThisPageURL.pop();
	    // If the parent directory is "dashboard", append that back onto the page name
		if (thisPageParent == "dashboard") {
			theCurrentSourcePage = "dashboard/" + thisPageName
		} else {
		// Otherwise just return the page name
			theCurrentSourcePage = thisPageName
		};
		// send the pageReady message along with the name of the source page to Firebase.
	    GLOB.clientRef.push({  
	    	"msgType" : "pageReady",
	    	"sourcePage": theCurrentSourcePage
	    }); 
	});