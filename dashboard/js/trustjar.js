// Create a global variable array to identify our globals variables throughout the code
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
			// Declare the unit test function to be executed by its order in the array
			var func = allTests[ testNum ];
			// Check the value returned by the unit test function
			var pauseLength = func();
			// Stop the unit test if pauseLength is -1. We use this to stop the unit test if an error has taken place.
			if( pauseLength == -1 ) {
				return( false );
			};
			// Otherwise, set a pause based on the value of pauseLength in milliseconds before executing the next unit test function.
			// This allows completion of tasks in the current unit test component before the next unit test component is executed. 
			pauser = setTimeout(
				function() {
					runAllTests1( allTests, testNum + 1 );
				},
				pauseLength
			); 
		};
		// Run tests
		runAllTests1( allTests, startTestNum );
	};

// NON-FIREBASE FUNCTIONS

	// This function pre-loads the animal image arrays as global variables to be called by responsiveAnimals() and other functions. 
	// Since the dashboard html file is in a different directory, we need to adjust the relative directory structure for the image 
	// assets when that page is loaded. 
	$(function () {
		// Get the full page URL and split its components into an array 
	    var splitThisPageURL = window.location.pathname.split('/');
	    // Get the page name by removing the last value from the array and returning it
	    var thisPageName = splitThisPageURL.pop();
	    // Repeat the above to get the parent directory name. If we're using the dashboard HTML file, this value will be 'dashboard' as in 'dashboard/index.html'.
	    var thisPageParent = splitThisPageURL.pop();
	    // If the dashboard page is being served, change the relative directory structure to retrieve the animal images
		if (thisPageParent == "dashboard") {
			// Array of 1000 px animals for the splash screen
			GLOB.splashAnimals = ['../images/animals/bunnies_1000x1000.jpg', '../images/animals/elephants_1000x1000.jpg', '../images/animals/rhinos_1000x1000.jpg', '../images/animals/tortoises_1000x1000.jpg', '../images/animals/pigs_1000x1000.jpg', '../images/animals/penguins_1000x1000.jpg', '../images/animals/hamsters_1000x1000.jpg', '../images/animals/bunny_tortoise_1000x1000.jpg', '../images/animals/cat_dog_1000x1000.jpg', '../images/animals/goldfish_1000x1000.jpg'];
			// Array of 300px animals for the splash page at smaller sizes and for the dashboard header
			GLOB.headerAnimals = ['../images/animals/bunnies_300x300.jpg', '../images/animals/elephants_300x300.jpg', '../images/animals/rhinos_300x300.jpg', '../images/animals/tortoises_300x300.jpg', '../images/animals/pigs_300x300.jpg', '../images/animals/penguins_300x300.jpg', '../images/animals/hamsters_300x300.jpg', '../images/animals/bunny_tortoise_300x300.jpg', '../images/animals/cat_dog_300x300.jpg', '../images/animals/goldfish_300x300.jpg'];
			// Array of 200px animals for the footer
			GLOB.footerAnimals = ['../images/animals/bunnies_200x200.jpg', '../images/animals/elephants_200x200.jpg', '../images/animals/rhinos_200x200.jpg', '../images/animals/tortoises_200x200.jpg', '../images/animals/pigs_200x200.jpg', '../images/animals/penguins_200x200.jpg', '../images/animals/hamsters_200x200.jpg', '../images/animals/bunny_tortoise_200x200.jpg', '../images/animals/cat_dog_200x200.jpg', '../images/animals/goldfish_200x200.jpg'];
		// For all other pages, retrieve the animals from the default directory structure
		} else {
			// Array of 1000 px animals for the splash screen
			GLOB.splashAnimals = ['images/animals/bunnies_1000x1000.jpg', 'images/animals/elephants_1000x1000.jpg', 'images/animals/rhinos_1000x1000.jpg', 'images/animals/tortoises_1000x1000.jpg', 'images/animals/pigs_1000x1000.jpg', 'images/animals/penguins_1000x1000.jpg', 'images/animals/hamsters_1000x1000.jpg', 'images/animals/bunny_tortoise_1000x1000.jpg', 'images/animals/cat_dog_1000x1000.jpg', 'images/animals/goldfish_1000x1000.jpg'];
			// Array of 300px animals for the splash page at smaller sizes and for the dashboard header
			GLOB.headerAnimals = ['images/animals/bunnies_300x300.jpg', 'images/animals/elephants_300x300.jpg', 'images/animals/rhinos_300x300.jpg', 'images/animals/tortoises_300x300.jpg', 'images/animals/pigs_300x300.jpg', 'images/animals/penguins_300x300.jpg', 'images/animals/hamsters_300x300.jpg', 'images/animals/bunny_tortoise_300x300.jpg', 'images/animals/cat_dog_300x300.jpg', 'images/animals/goldfish_300x300.jpg'];
			// Array of 200px animals for the footer
			GLOB.footerAnimals = ['images/animals/bunnies_200x200.jpg', 'images/animals/elephants_200x200.jpg', 'images/animals/rhinos_200x200.jpg', 'images/animals/tortoises_200x200.jpg', 'images/animals/pigs_200x200.jpg', 'images/animals/penguins_200x200.jpg', 'images/animals/hamsters_200x200.jpg', 'images/animals/bunny_tortoise_200x200.jpg', 'images/animals/cat_dog_200x200.jpg', 'images/animals/goldfish_200x200.jpg'];
			// Select a random animal for each page location
		}

		// Select a random image from each of the animal images arrays for header, splash and footer. 
		GLOB.randomHeaderAnimal = GLOB.headerAnimals[Math.floor(Math.random() * GLOB.headerAnimals.length)]
		GLOB.randomSplashAnimal = GLOB.splashAnimals[Math.floor(Math.random() * GLOB.splashAnimals.length)]
		GLOB.randomFooterAnimal = GLOB.footerAnimals[Math.floor(Math.random() * GLOB.footerAnimals.length)]
	});

	// This function changes sizing and position of animal images and other page elements depending on the page width.
	function responsiveAnimals() {	
		// For the footer animal, the image is in the page and not the background so we can just add it to the page. 
		// In the header and splash screens, the animal is placed in the background via CSS. This is the only animal 
		// image element whose placement and / or size isnt affected by responsive design.
		$('#footerAnimals').attr('src', GLOB.randomFooterAnimal)

		// For larger page widths, use the random 300px animal image in the header and position per Creative (dashboard only)
		if (window.matchMedia("(min-width: 992px)").matches) {
			$('#dashboard').css("background", "url(" + GLOB.randomHeaderAnimal + ") no-repeat calc(50% + 350px) top");
			// dashboard only: right-justify the requestor checkboxes in the relationship form. We do this here instead of in the 
			// CSS because we're adding and removing the entire Bootstrap class itself.
			$('.pseudo-checkbox-1-Label').addClass('pull-right');
		}
		// For smaller page widths, remove the header animals (dashboard only)
		if (window.matchMedia("(max-width: 991px)").matches) {
			$('#dashboard').css("background", "url('')");
			// dashboard only: change the text justification for checkboxes to match default responsive behavior. We do this here instead 
			// of in the CSS because we're adding and removing the entire Bootstrap class itself.
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

	// Toggle show / hide passcode field for login, landingRequestorExisting, landingCounterpartyExisting, 
	// and Dashboard page elements. This removes the mask from the passcode field so the user can visually 
	// confirm that it's correct.
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

	// Function to redirect to another HTML page when a message is received on the 'currentPage' key of the page display function
		function goToAnotherPage(pageName) {
			// Get name of the HTML page received by the function. Since the first four characters of this string
			// are expected to be "URL:" we strip those from the received value.
			var newPage = pageName.substring(4);
			// If the client is already on this page, do nothing
			if( document.location.href == newPage ) {
				return false;
			} else {
			// Otherwise redirect the client to the new page
				window.location.replace(newPage);
			}
		}

		// Remove a link if the link in quesion refers to the page it's on or restore a link if 
		// we leave the page in question during the same session.
		function disableEnableLinks(pageName) {
			// If we're on the requestPasscode page, remove the 'request passcode' link
			if( pageName == "requestPasscode" ) {
				$('#requestPasscodeLink').hide()
			}
			// When the user completes the requestPasscode form, the display will change to a confirmation screen without
			// leaving the session. In that case, we restore the link that was removed by the previous code.
			if( pageName == "requestPasscodeConfirmation" ) {
				$('#requestPasscodeLink').show()
			}
			// If we're on the home page, disable the logo 'home' link
			if( pageName == "home" ) {
				$("#headerLogoLink").removeClass("goHome");
			}
			// When the user completes the home page form, the display will change to a confirmation screen without
			// leaving the session. In that case, we restore the link that was removed by the previous code.
			if( pageName == "homeConfirmation" ) {
				$("#headerLogoLink").addClass("goHome");
			}
		};

	// This function is used to populate and display landing page data for the six landing page variants.
	function landingPageDataHandler( pageData ) {
		// Display any instructional landing page form copy if specified in the Firebase message.
		if (pageData.landingFormCopy !== undefined) {
			$("#landingFormCopy").html(pageData.landingFormCopy);
		};
		// Populate the user contact with the userContact page data. In a landingRequestor page, this will
		// be the requestor contact, in a landingCounterparty page, this will be the counterparty contact.
		$("#landingUserContact").html(pageData.userContact);
		// Display the contact to which the request is addressed
		$("#landingTOSContact").html(pageData.userContact);
		// newPasscode is for landingRequestorNew and landingCounterpartyNew only.
		// If a newPasscode was included in the Firebase message, display it in the New User form
		if (pageData.newPasscode !== undefined) {
			$("#landingNewUserPasscode").html(pageData.newPasscode);
		};
		// requestorContacts and relationshipType are for the landingCounterparty pages only.
		// If they're included in the Firebase message, display them in the counterparty subhead.			
		if (pageData.requestorContacts !== undefined) {
			var requestorContacts = pageData.requestorContacts.replace(/,/g, '<br />');
			$("#landingRequestor").html(requestorContacts);
			$("#landingRequestorName").html(pageData.requestorName);
			$("#landingRequestorName2").html(pageData.requestorName);
			$("#landingRelationshipType1").html(pageData.relationshipType);
		};
		// relationshipType is for the landingCounterparty pages only.
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

	// Declare a variable for the timeout interval for the 'technical difficulties' overlay in disableControls() (see below). 
	// This is also used to stop the timeout event by the enableControls() function.
	var technicalDifficultiesOverlay;
	// Display a modal overlay to disable controls. This is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed by enableControls().
	function disableControls () {
	$( "#disableControlsOverlay" ).modal('show')
	// The 'technical difficulties' overlay appears if the disableControls overlay is active for 
	// too long, meaning there's been a disruption in client / server communication. Recommended delay time
	// is a minimum of 30 seconds; to facilitate the unit test it's currently set for 4 seconds and should be
	// changed before launch.
	technicalDifficultiesOverlay = setTimeout(
		function () { 
			$( "#technicalDifficulties" ).removeClass( "hidden" )
		// Recommended delay time is a minimum of 30 seconds; to facilitate the unit 
		// test it's currently set for 4 seconds and should bechanged before launch.
		}, 4000);
	}

	// Overlay to enable controls. Called when the client detects a new message on the server branch.
		function enableControls () {
			$( "#disableControlsOverlay" ).modal('hide')
			$( "#technicalDifficulties" ).addClass( "hidden" );
			// Clear the tech difficulties timeout. If enableControls() is called before the timeout is executed, it's no 
			// longer necessary.
			clearTimeout(technicalDifficultiesOverlay);
		}

		// When a user closes a server alert, fade it out and remove it.
		$("div.alert").on("click", "button.close", function() {
		    $(this).parent().animate({opacity: 0}, 500).hide('slow');
		});

	// Splash screen load animation. Changes color of each letter in the logo.
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

// SESSION ID PLACEHOLDER
	function getSessionId() {
			// This is a placeholder. In the real world, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

// FIREBASE REFERENCES
	// Set our primary Firebase reference
	GLOB.trustjarRef = new Firebase("https://trustjar-46e35.firebaseio.com/");
	// All subsequent references will incorporate the unique ID received when the page is built
    // Set the branch for all client messages to Firebase
	GLOB.clientRef = GLOB.trustjarRef.child('sessions/fromClient/' + GLOB.uniqueId);
	// Set the branch for all server messages to Firebaser
	GLOB.serverRef = GLOB.trustjarRef.child('sessions/fromServer/' + GLOB.uniqueId);
	// Set the current HTML page or page template display
	GLOB.displayRef = GLOB.serverRef.child('currentPage');
	// Used to read footer content on a common public branch set by Firebase. May change pending server implementation.
	GLOB.footerRef = GLOB.trustjarRef.child('commonBranch/footer');
	// Firebase reference for all dashboard page data. The page data handler itself is in dashboard.js in the /dashboard directory.
	GLOB.dashboardPageDataRef = GLOB.serverRef.child('dashboardPageData');
	// Firebase reference for all landing page data. May be used to populate page data for one of six possible landing pages.
	GLOB.landingPageDataRef = GLOB.serverRef.child('landingPageData');
	// Reference for all server-generated 'system alert' messages.
	GLOB.serverAlertRef = GLOB.serverRef.child('serverAlert');

// SERVER FIREBASE FUNCTIONS

	// Page display function
		GLOB.displayRef.on('value', function(dataSnapshot) {
			// Retrieve the unique ID from the Firebase message
			var val = dataSnapshot.val();
			// Only execute the function if there is data at this reference
			if (val !== null) {		
				var checkURL = val.substring(0,4)
				if( checkURL == 'URL:' ) {
					goToAnotherPage (val);
				} else {
					// If 'val' doesn't match a div with class "pageTemplate" in the page, the page won't display properly.
					// So if that happens we want to notify the system via Firebase.
					// Create an array of all IDs with class "pageTemplate" in the page. These are the approved primary page display elements for a given page. 
					var arrayOfPageTemplateIds = $.map($(".pageTemplate"), function(n, i){
						return n.id;
					});
					// If 'val' doesn't match any values in the array of pageTemplate IDs with class pageTemplate, send a "bad page name" message to Firebase
					if($.inArray(val, arrayOfPageTemplateIds) == -1) {
						pageError( val );
					} else {
						// Disable a link if the link refers to the current page and restore it if we leave that page template during the session.
						// This only applies to the home page and the requestPasscode page.
						disableEnableLinks (val);
						// If we're loading a landing page, create the Firebase reference and the listener that will call the landingPageData handler
						// and then call the handler. We do this to avoid introducing an unnecessary listener if the page called isn't a landing page.
						if (val.substr(0,7) == 'landing') {
							enableLandingPageDataHandler() 
						}
						// Hide any previous page template from display
						$('.pageTemplate').hide();
						// prepend '#' to the currentPage value so we can display it
						var newPageTemplate = "#" + val;
						// display the specified template
						$(newPageTemplate).show();
						// Remove the 'disable controls' overlay if present
						enableControls();
						// if the display is still showing the splash page, fade it out. 'Splash' is not part of the pageTemplate class
						// because pageTemplate divs are hidden by default and the splash is displayed by default on page load.
						// The timeout allows the splash page animation to complete before the specified pageTemplate is displayed.
						setTimeout(function() {
							$('#splash').fadeOut(200);
						}, 1400);
					}
				}
			}
		});

	// If the page being called is a landing page, create a listener for landing page data
		function enableLandingPageDataHandler(landingPageData) {
			// Create a Firebase reference for landing page data
			var trustjarLandingRef = new Firebase (GLOB.serverRef + '/landingPageData');
			// Retrieve the data at the new Firebase reference
			trustjarLandingRef.once('value', function(landingPageData) {
				var val = landingPageData.val();
				// Send the retrieved data to the corresponding handler function
				return (landingPageDataHandler (val))
			});
		}

	// Server alert functions
		GLOB.serverAlertRef.on('child_added', function(childSnapshot) {
			// Retrieve the new alert's key / value pair from the Firebase message
			var key = childSnapshot.key()
			var val = childSnapshot.val();
			// Generate and append an HTML alert element to the existing display
			$('#serverAlertOverlay').append(
				// We use the key as an ID and to return it to Firebase when the 'close' element is clicked.
				'<div id="' + key + 'Container" class="alert fade in">' +
					'<div class="alert-header">' +
						'<button id="' + key + 'CloseBtn" type="button" class="close alertClose" data-dismiss="alert" aria-label="Close" data-alert-id="' + key + '">&times;</button>' + // close element
						'<h4 class="alert-title">Server alert!</h4>' +
					'</div>' +
					'<div id="'+ key + 'Content" class="modal-body alertContent">' + val + // the actual alert copy will appear here
					'</div>' +
				'</div><p>'	
			);
			// Display the alert overlay	
			$('#serverAlertContainer').modal('show');
			// Enable the controls if they've been disabled by user action
			enableControls();
		});

	// Close alert overlay function
		// When a "close alert" element is clicked in a server alert: 
		$(document).on('click', '.alertClose', function() {
		// Send a message to Firebase to notify the system that a user closed an alert with the specified ID.
			GLOB.clientRef.push( {
				"msgType": "closeAlert",
				"alertId" : $(this).data('alert-id')
			}); 
		// if it's the last alert on display in the overlay, close the overlay. We need a timeout to give the element a chance to fade out.
			setTimeout(function(){
				if ($(".alert").is(":visible") == false) {
					$('#serverAlertContainer').modal('hide');
				};
			}, 150);
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
		function pageError( pageName ) {
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

// CLIENT FIREBASE FUNCTIONS - PAGE BODY

	// User submits 'existing user' landing page form to approve a landing page request. 
	// Used by landingRequestorExisting and landingCounterpartyExisting page templates.
		function landingExistingUserSubmit () {
			var thisMsgType = $("#landingExistingUserSubmitBtn").data('msgtype')
			GLOB.clientRef.push( {  
				"msgType": thisMsgType,
				"passcode" : $('#landingExistingUserPasscode').val(),
				"TOSCheckbox" : $('#landingExistingUserTOSCheckbox').prop( "checked" )
			} ); 
			// Disable user controls
			disableControls ()
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User submits 'new user' landing page form to approve a landing page request.
	// Used by landingRequestorNew and landingCounterpartyNew page templates.
		function landingNewUserSubmit () {
			var thisMsgType = $("#landingNewUserSubmitBtn").data('msgtype')
			GLOB.clientRef.push( {  
				"msgType": thisMsgType,
				"profileName" : $('#landingNewUserName').val(),
				"TOSCheckbox" : $('#landingNewUserTOSCheckbox').prop( "checked" ),
			} ); 
			// Disable user controls
			disableControls ()
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User selects 'cancel' on a landing page form which opens the 'cancel request' modal confirmation dialog.
		$(".landingCancelBtn").click(function(){
			$(".landingCancelOverlay").modal({backdrop: true});
		});


	// Several clickable elements send a Firebase message containing only a value for "msgType" This function reads
	// the value contained in the 'data-msgtype' attribute of the clicked element and passes it on as the msgType value.
		$(document).on('click', '.msgTypeElement', function() {
			GLOB.clientRef.push( {  
				"msgType" : $(this).data('msgtype')
			}); 
			// Disable user controls
			disableControls ();
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