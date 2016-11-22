// HOUSEKEEPING FUNCTIONS FOR PROGRAMMING PURPOSES
	// Create a global variable array to separate our globals from the rest of the DOM.
	GLOB = [];


// Function to initialize unit test. Clears the Firebase queue, clears all content from the dashboard and
// resets the view to the splash screen.
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

// For the footer animal, we'll do the same but the image is in the page and not the background so we can just replace it.
// $('#footerAnimals').attr('src', randomFooterAnimal)
//$('#splashBackground').css("background", "url(" + randomSplashAnimal + ") no-repeat calc(50%)");

// For the footer animal, we'll do the same but the image is in the page and not the background so we can just replace it.
var randomFooterAnimal = GLOB.footerAnimals[Math.floor(Math.random() * GLOB.footerAnimals.length)]
$('#footerAnimals').attr('src', randomFooterAnimal)





// PAGE DATA FUNCTIONS
	// Define the functions for populating pages with server-generated page data.

	// Make a map of page names and corresponding page data functions for easy lookup.
	// If the page specified by Firebase isn't listed in the eventListenersMap, 
	// a "bad page" message will be returned to Firebase. More pages may be added to this 
	// map as content is developed.
		var eventListenersMap = {
			"dashboard" : noPageData,
		}

		// This function is used for pages that require no page data to populate them.
		// In the case of the Dashboard, all data elements are subject to dynamic modification,
		// so Dashboard uses listeners to manage data and only calls this as a way of preserving 
		// the eventsListenersMap pending final disposition of pages / content in the HTML file 
		// containing the dashboard.
		function noPageData( pageData ) {
		};


// NON-FIREBASE FUNCTIONS

	// Initialize all tooltips (required by bootstrap)
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})

	// Retrieve the unique ID from Firebase and assign it to a global variable. 
	// We'll use it to create the main branch for client / server communications.
	// This may be changed following server implementation.
	GLOB.uniqueId = getSessionId()

	// Overlay to disable controls. This is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed.
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


	// Toggle show / hide passcode field for 'edit profile' form. This removes the mask
	// from the passcode field so the user can visually confirm that it's correct.
	$('#dashboardShowHide').on('click', function() {
		var showHideState = $("#dashboardShowHide").html();
			if (showHideState == 'show') {
				$("#dashboardPasscode").attr("type", "text");
				$("#dashboardShowHide").html("hide");
			}
			if (showHideState == 'hide') {
				$("#dashboardPasscode").attr("type", "password");
				$("#dashboardShowHide").html("show");
			}
	});

	// Replaces a list of contacts with an 'edit profile' form in the header.
	$(document).on('click', '#editProfileLink', function(){
		$('#profileFormContainer').toggleClass(); 
	});

	// Cancels the 'edit profile' form and restores the default view.
	$(document).on('click', '#cancelEditProfileBtn', function(){
		$('#profileFormContainer').toggleClass(); 
	});

	// Replaces a list of contacts in a relationship with an 'edit relationship' form. Allows a user to edit a contact list in a relationship.
	$(document).on('click', '.editContactsForm', function(){
		var relationshipId = $(this).data('relationship');
		var showForm = '#' + relationshipId + 'EditContactsForm';
		$(showForm).show();
		var hideForm = '#' + relationshipId + 'ContactList';
		$(hideForm).hide();
		return false;
	});

	// Hides the 'edit relationship' form in a relationship and restores the default view when user clicks the 'cancel' button.
	$(document).on('click', '.cancelEditContactsForm', function(){
		var relationshipId = $(this).data('relationship');
		var showForm = '#' + relationshipId + 'ContactList';
		$(showForm).show();
		var hideForm = '#' + relationshipId + 'EditContactsForm';
		$(hideForm).hide();
	});

	// When a user clicks the 'Change' button within an "edit relationship" form in a relationship, this passes the specified relationship ID to 
	// the 'confirm' button in the confirmation dialog.
	$(document).on('click', '.editRelationshipContactsBtn', function(){
		var thisContact = $(this).data('relationship');
		$('#confirmChangeBtn').data('relationship', thisContact)
	});

	// When a user clicks an 'unverified' link in the profile, this passes the contact ID to 
	// the 'confirm' button in the confirmation dialog. When that button is clicked, it will pass on the contact ID to Firebase.
	$(document).on('click', '.unverifiedLink', function(){
		var unverifiedContact = $(this).data('contact')
		$('#resendVerificationBtn').data('contact', unverifiedContact)
	});


	// When a user clicks an 'unconfirmed' link in a relationship or in the 'edit relationship' form, this passes the contact ID to 
	// the 'confirm' button in the confirmation dialog. When that button is clicked, it will pass on the contact ID to Firebase.
	$(document).on('click', '.unconfirmedLink', function(){
		var unverifiedContact = $(this).data('contact')
		$('#counterpartyResendBtn').data('contact', unverifiedContact)
	});


	// When a user clicks a 'remove relationship' link, this passes the relationship ID to the 'confirm' button in the confirmation dialog
	$(document).on('click', '.removeRelationship', function(){
		thisRelationshipId = $(this).data('relationship')
		$('#confirmRemoveRelationshipBtn').data('relationship', thisRelationshipId)
	});

// UNIQUE ID PLACEHOLDER
	function getSessionId() {
			// This is a placeholder. In the real world, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

	// Placeholder for a function to receive an external URL and change to that page without initializing the DOM.
	// For now we just confirm in the unit test that the URL can be retrieved from the changePage function.
	function goToNewPage(newURL){
		GLOB.goToNewURL = newURL;
	}


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






	// Build a relationship module. This dynamically creates an entire relationship module dynamically based on information 
	// received by Firebase and processed by listeners elsewhere in this document. We do this because the number of possible
	// relationships on this page will vary from user to user, including the possibility that zero relationships are in a user's dashboard.
	function buildRelationship(requestor, counterparty, relationship){
		$('#relationshipColumn').append(
			"<div id='" + relationship + "Div' class=' well relationshipModule'>" +

				// First row contains the requestor and counterparty names and the '<->' icon
				"<div id='relationshipNames' class='row boxHeader'>" + 
					// Requestor name
					"<div id='" + relationship + "RequestorName' class='col-md-5 textRight'>" +
						"<div class='relationshipRequestorName'>" + 
							requestor + 
						"</div>" +
					"</div>" +
					"<div class='col-md-2' class='center'>" +
					"</div>" +
					// Counterparty name
					"<div id='" + relationship + "CounterpartyName' class='col-md-5'>" +
						"<div class='relationshipCounterpartyName'>" + 
							counterparty + 
						"</div>" +
					"</div>" +
				"</div>" +
				// Contact lists
				"<div id='" + relationship + "ContactList' class='row profileContacts'>" +
				"<hr class='dashed'>" +
					"<div class='col-md-5'>" + 
						// This gets populated with the linst of verified requestor contacts that have been included in this relationship.
						"<div id='" +  relationship +  "RequestorContactList' class='textRight requestorList'>" +   
						"</div>" +
					"</div>" + 
					"<div class='col-md-2 center'>" + 
						"<br><img src='images/arrow.svg'><br><br>" +
					"</div>" + 
					"<div class='col-md-5'>" + 
						// This gets populated with the linst of confirmed and unconfirmed counterparty contacts that are included in the relationship.
						"<div id='" +  relationship +  "CounterpartyContactList'>" +   
						"</div>" +
					"</div>" +
				"</div>" +
				// edit relationship form appears when user clicks 'edit relationship'
				"<div id='" + relationship + "EditContactsForm' class='profileContacts relationshipForm' data-relationship='" + relationship + "'>" +
				"<div class='relationshipFormCopy'>If you remove your contact channels from this relationship, they'll still be available in your Trustjar for other relationships. If you remove your partner's contact channels from the relationship, they'll be permanently removed and you'll have to reconfirm them all over again.</div>" +
					"<div class='row'>" +
						"<div class='col-md-5'>" + 
							// As part of the 'edit relationship' form, this is populated with ALL verified and unverified contacts in the user's profile, to allow inclusion in or removal from the relationship.
							// Unconfirmed contacts can't be included but are presented as a visual cue to remind the user to verify them.
							"<div id='" +  relationship +  "RequestorContactForm' class='requestorContactForm textRight'>" +   
							"</div>" +
						"</div>" + 
						"<div class='col-md-2 center'>" + 
							"<br><img src='images/arrow.svg'><br><br>" +
						"</div>" + 
						"<div class='col-md-5'>" + 
							// As part of the 'edit relationship' form, this is populated with ALL confirmed and unconfirmed counterparty contacts, to allow removal from the relationship.
							"<div id='" +  relationship +  "CounterpartyContactForm' class='profileContacts'>" +  
								// Allows the user to add a counterparty contact to an existing relationship.
								"<input id='" + relationship + "AddCounterpartyContact' type='text' class='form-control' placeholder='Add a new phone or email'>" + 
							"</div>" +
						"</div>" +
					"</div>" +
					// This row contains the change / cancel buttons for the 'edit relationship' form.




					"<div class='row'>" +
						"<div class='col-md-12 center'>" + 
							"Your partner will be notified of all changes. <br>" +
						"</div>" + 
					"</div>" +


				"<div class='row center'>" +
					"<div class='col-md-3'></div>" +

					"<div class='col-md-3'>" +

						"<a href='#' data-toggle='modal' id='" + relationship + "ChangeBtn' data-target='#confirmeditRelationshipContacts' data-relationship='" + relationship + "' class='btn btn-primary btn-sm editRelationshipContactsBtn relationshipButtons'>" + 
							"save changes" +
						"</a>" +
					"</div>" +

					"<div class='col-md-3'>" +
						"<button id='" + relationship + "CancelEditContacts' type='submit' data-relationship='" + relationship + "' class='btn btn-primary btn-sm cancelEditContactsForm relationshipButtons'>" +
							"cancel" +
						"</button>" +
					"</div>" +

					"<div class='col-md-3'></div>" +

				"</div>" +


				"</div>" +













				// The links along the bottom of the relationship module: edit relationship, end relationship.
				"<div class='row center'>" +
					"<div class='col-md-3'></div>" +

					"<div class='col-md-3'>" +

						"<a href='#' id='" + relationship + "EditContacts' class='editContactsForm' data-relationship='" + relationship + "'>" + 
							"<button type='submit' class='btn btn-primary btn-md relationshipButtons'>" +
								"edit relationship" +
							"</button>" +  
						"</a>" + 
					"</div>" +

					"<div class='col-md-3'>" +
						"<a href='#' id='" + relationship + "RemoveRelationship' class='removeRelationship' data-toggle='modal' data-target='#dashboardRemoveRelationship' data-relationship='" + relationship + "'>" + 
							"<button type='submit' class='btn btn-primary btn-md relationshipButtons'>" +
							"end relationship" +
							"</button>" +  
						"</a>" +
					"</div>" +

					"<div class='col-md-3'></div>" +

				"</div>" +
			"</div>"
		);
	}

// FIREBASE REFERENCES
	// Set our static Firebase key path
	GLOB.trustjarRef = new Firebase("https://trustjartemp.firebaseio.com/");
	// The following references are derived when a unique ID is received.
    // Sets the branch for all client messages to Firebase
	GLOB.clientRef = GLOB.trustjarRef.child('sessions/fromClient/' + GLOB.uniqueId);
	// Sets the branch for all server messages to Firebaser
	GLOB.serverRef = GLOB.trustjarRef.child('sessions/fromServer/' + GLOB.uniqueId);
	// Sets the current page / page template display
	GLOB.displayRef = GLOB.serverRef.child('currentPage');
	// Used to read footer content on a common public branch set by Firebase. May change pending server implementation.
	GLOB.footerRef = GLOB.trustjarRef.child('commonBranch/footer');
	// Firebase reference for all dashboard page data.
	GLOB.pageDataRef = GLOB.serverRef.child('dashboardPageData');
	// Reference for all server-generated 'system alert' messages.
	GLOB.serverAlertRef = GLOB.serverRef.child('serverAlert');

// FIREBASE SERVER FUNCTIONS
	// Page display listener
	GLOB.displayRef.on('value', function(dataSnapshot) {
		// Retrieve the unique ID from the Firebase message
		var val = dataSnapshot.val();
		// Check if there's a datasnapshot at this Firebase reference. If not, this will prevent an error on page load.
		if (val !== null) {
			// If the received page template name is in the eventListenersMap, assign it to a variable.
			var handlerFunction = eventListenersMap[ val ];
			// Check if the page referred to is an external URL
			var checkURL = val.substring(0,3)
			if( checkURL == 'URL' ) {
				var newPage = val.substring(4);
				// This function will replace the current one as soon as we have a solution for DOM continuity on HTML page change.
				// For the time being, it's commented out.
				// window.location = newPage

				// In the meantime, we'll call a function for the unit test.
				goToNewPage(newPage)
			} else {
				// If the page template name received by Firebase is not in the eventsListenersMap, return a "bad page" message to Firebase
				if( handlerFunction == null ) {
					badPageName( val );
				} else {
					// prepend '#' to the pageName so we can operate on the corresponding div in the HTML
					var showNew = "#" + val;
					// if the display is still showing the splash page, fade it out. SplashDiv is not part of the pageTemplate class
					// because 'pageTemplate's are hidden by default, and the splash is displayed by default.
//					$('#splash').fadeOut(1300);
					// if another pageTemplate is being displayed, fade it out
					$('.pageTemplate').each(function() {
						var pageId = '#' + this.id;
						if ( $(pageId).css('display') == 'block') {
							$(pageId).fadeOut(1700);
							// Remove the 'disable controls' overlay if one is present
							enableControls();
						}
					});
					// fade the new page in, allowing for the old page to fade out first
					setTimeout(function() {
						$(showNew).fadeIn(300);
						$("#splash").fadeOut(200);

					}, 1400);
				}
			}
		}
	});

	// Page data functions
	GLOB.pageDataRef.on('value', function(dataSnapshot) {
		// Retrieve the data snapshot from the Firebase message
		var val = dataSnapshot.val();
		// Check if there's a datasnapshot at this Firebase reference. If not, this will prevent an error on page load.
		if (val !== null) {

			// Assign the user / requestor's name to a global variable.
			GLOB.profileName = val.profileName;
			// Place the requestor name where it belongs in the header and in each relationship module
			$('#headerProfileName').html(GLOB.profileName);
			$('#editProfileFormName').val(GLOB.profileName);

			// Initialize all page display elements
			$('#profileContacts').html('');
			$('#editProfileContactList').html('')			
			$('#newRelationshipFormContacts').html('')	

			//Assign the array of verified profile contacts to a global variable.
			GLOB.verifiedProfileContacts = val.verifiedProfileContacts;
			// Format all verified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// Append each verified contact to the designated locations mentioned above. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.verifiedProfileContacts).each(function (i, contact) {
				$('#profileContacts').append(" <div>" + contact + "</div>")
				$('#editProfileContactList').append(" <div><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label></div>")
				$('#newRelationshipFormContacts').append(" <div><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox pseudo-checkbox-3 sr-only' type='checkbox' data-contact='" + contact + "'> <label for='" + contact + "NewRelationshipCheckbox'> "  + contact + "</label></b></div>")
			});

			// Populate the element that describes how many contacts are in the user's profile.
			$('#numberOfContacts').html(GLOB.verifiedProfileContacts.length)

			//Assign the array of unverified profile contacts to a global variable. 
			GLOB.unverifiedProfileContacts = val.unverifiedProfileContacts;
			// Format and append all unverified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// A link is appended to each to allow the user to resend a 'verify' notification. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
				$('#editProfileContactList').append(" <div class='pending'><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label> <a href='#' id='" + contact + "UnverifiedProfileEdit' data-toggle='modal' data-target='#resendVerification' data-contact='" + contact + "' class='profileContacts unverifiedLink " + contact + "Verify'><span class='glyphicon glyphicon-send' aria-hidden='true'></span></a></div>")
			});

			//RELATIONSHIP LEVEL DATA
			// Initialize the entire relationship column
			$('#relationshipColumn').html('');

			GLOB.relationshipType = val.relationshipType;
			// If this data set is the relationship type, change the page layout rules to reflect the relationship type.

			// If the relationship is exclusive, hide the "Add a new relationship" form within relationship modules. 
			// The background changes and the relationshis module is adjusted for a full-page view.
			if (GLOB.relationshipType == 'exclusive') {
//				$('#newRelationshipColumn').hide();
				// Display the relationship header in case an earlier state of the page removed it.
//				$('#relationshipTypeHeader').show();
				$('#relationshipTypeHeader').html('EXCLUSIVE RELATIONSHIP');
				// Change the Bootstrap column width so the relationship takes over the page width and adjust fonts accordingly.
//				$('#relationshipColumn').removeClass('col-md-9');
//				$('#relationshipColumn').addClass('col-md-12');
			}

			// If the relationship is casual, show the "Add a new relationship" form and 'Become exclusive' links within relationship modules. 
			if (GLOB.relationshipType == 'casual') {
				$('#newRelationshipColumn').show();
				// Display the relationship header in case an earlier state of the page removed it.
				$('#relationshipTypeHeader').html('CASUAL RELATIONSHIP(S)');
				// Initialize the relationship column in case it was altered by an earlier state
				$('#relationshipColumn').removeClass('col-md-12');
				$('#relationshipColumn').addClass('col-md-9');
			}		
			
			// If there are no relationships, only the new relationship form is displayed. 
			if  ((GLOB.relationshipType !== 'exclusive') && (GLOB.relationshipType !== 'casual')) {
				$('#newRelationshipColumn').show();
				$('#relationshipTypeHeader').hide();
			}

			// Assign the set of relationship data in the Firebase message to a global variable.
			GLOB.relationshipData = val.relationships;
			// If there are existing relationships in the page data:
			if (GLOB.relationshipData !== undefined) {

				// Initialize Bootstrap tooltips
				$('[data-toggle="tooltip"]').tooltip()

				// Define an array for the set of relationship ID's that will define each relationship in the set.
				GLOB.relationshipId = [];

				// Iterate through each relationship ID in the array to derive and displey the subset of relationship date for each relationship.
				GLOB.relationshipId = Object.keys(GLOB.relationshipData);

				for (var i = 0; i < GLOB.relationshipId.length; i++) {

					var thisRelationship = GLOB.relationshipId[i];

					// Retrieve the counterparty name for this relationship
					var counterpartyName = eval("GLOB.relationshipData." + thisRelationship + ".counterpartyName");
					// Incorporate the relationship identifier into the ID of the HTML element that will contain the requestor contact list.
					var requestorContactListId = '#' + thisRelationship + "RequestorContactList"
					// Incorporate the relationship identifier into the ID of the HTML element that  will contain the requestor contacts to be included in the 'edit relationship' form.
					var requestorContactFormId = '#' + thisRelationship + "RequestorContactForm"
					// Retrieve the list of included requestor contacts for this relationship as a comma delimited string. Only verified contacts can be in a relationship as defined by the
					// 'includedRequestorContacts' portion of the Firebase message, and all such contacts must be a subset of verified profile contacts.
					var includedRequestorContacts = eval("GLOB.relationshipData." + thisRelationship + ".includedRequestorContacts");
					// Retrieve the list of unverified requestor contacts for this relationship as a comma delimited string. These will populate the 'edit relationship' form.
					var unverifiedRequestorContacts = eval("GLOB.relationshipData." + thisRelationship + ".unverifiedRequestorContacts");
					// Incorporate the relationship identifier into the ID of the HTML element that will contain the counterparty contact list.
					var counterpartyContactListId = '#' + thisRelationship + "CounterpartyContactList"
					// Incorporate the relationship identifier into the ID of the HTML element that will contain the counterparty contact form.				
					var counterpartyContactFormId = '#' + thisRelationship + "CounterpartyContactForm"
					// Retrieve the list of confirmed counterparty contacts for this relationship as a comma delimited string.
					var confirmedCounterpartyContacts = eval("GLOB.relationshipData." + thisRelationship + ".confirmedCounterpartyContacts");
					// Retrieve the list of unconfirmed counterparty contacts for this relationship as a comma delimited string.				
					var unconfirmedCounterpartyContacts = eval("GLOB.relationshipData." + thisRelationship + ".unconfirmedCounterpartyContacts");
					// Incorporate the relationship identifier into the ID of the HTML element that will contain the "add a new counterparty contact" field.				
					var addCounterpartyField = "#" + thisRelationship + "AddCounterpartyContact"

					// Call the function that renders the HTML comprising a relationship module, using the user's name, the counterparty name, and the relationship identifier.
					// The function called depends on whether the relationship is casual or exclusive.
						buildRelationship(GLOB.profileName, counterpartyName, thisRelationship);

/*					// If the relationship is exclusive, hide the "Become exclusive" link within the relationship. This must be done after the relationship div is constructed.
					if (GLOB.relationshipType == 'exclusive') {
						buildExclusiveDashboard(GLOB.profileName, counterpartyName, thisRelationship);
					};

*/					// For each contact in the includedRequestorContacts list, create a display element and add it to the default relationship display.
					$(includedRequestorContacts).each(function (i, contact) {
						$(requestorContactListId).append(" <div><b>" + contact + "</b></div>")
					});				

					// For each contact in the verifiedProfileContacts list, create a display element including a checkbox and add it to the requestor section of the 'edit relationship' form.
					$(GLOB.verifiedProfileContacts).each(function (i, contact) {
						$(requestorContactFormId).append(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' class='pull-right requestorRelationshipCheckbox " + thisRelationship + "RequestorCheckbox'>&nbsp;<label for='" + contact + thisRelationship + "Checkbox'>" + contact + "&nbsp;</label> </div>")
						// if the requestor contact is already part of the "included Requestor Contacts" list, pre-check the checkbox associated with it to reflect the default display.
						if(jQuery.inArray(contact, includedRequestorContacts) !== -1){
							contactCheckbox = "#" + contact + thisRelationship + "Checkbox";
							// Strip the special characters from the ID string. This allows the user to enter characters that are used as standard notation for emails and phone numbers without creating an error.
							formattedContactCheckbox = contactCheckbox.replace('@', '\\@').replace('.', '\\.').replace('-', '\\-').replace('(', '\\(').replace(')', '\\)')
							// Use the stripped ID string to check the checkbox corresponding to an already added contact.
							$( formattedContactCheckbox ).prop( "checked", true );
						}
					});

					// For each contact in the confirmedCounterpartyContacts list, create a display element including a checkbox and add it to the default display and the requestor section of the 'edit relationship' form.
					// .before is used to make sure the list appears above the "add a new phone or email" text input field.
					$(confirmedCounterpartyContacts).each(function (i, contact) {
						$(counterpartyContactListId).append(" <div><b>" + contact + "</b></div>")
						$(addCounterpartyField).before(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' class='pseudo-checkbox-2 sr-only' checked> <label for='" + contact + thisRelationship + "Checkbox'>&nbsp;" + contact + "</label></div>")
					});

					// For each contact in the unconfirmedCounterpartyContacts list, create a display element, including a checkbox and an 'unconfirmed link', and add it to the default display and the counterparty section of the 'edit relationship' form.
					// .before is used to make sure the list appears above the "add a new phone or email" text input field.
					$(unconfirmedCounterpartyContacts).each(function (i, contact) {
						$(counterpartyContactListId).append(" <div class='pending'><b>" + contact + " <a href='#' id='" + thisRelationship + contact + "Unconfirmed' data-toggle='modal' data-target='#counterpartyResend' data-contact='" + contact + "' class='unconfirmedLink " + contact + "Confirm'><span class='glyphicon glyphicon-send' aria-hidden='true'></span></a></b></div>")
						$(addCounterpartyField).before(" <div class='pending'><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' class='pseudo-checkbox-2 sr-only' checked> <label for='" + contact + thisRelationship + "Checkbox'> " + contact + "</label></div>")
					});
				};
			};			
		}
	});

	// Server alert functions
	GLOB.serverAlertRef.on('value', function(dataSnapshot) {
		// Retrieve the alert string from the Firebase message
		var val = dataSnapshot.val();
		// If the alert comtent is empty, hide the server alert
		if (val == null) {
			$('#serverAlertContainer').modal('hide');
/*			$('#serverAlertContainer').fadeTo(500, 0, function(){
	   		$('#serverAlertContainer').css("visibility", "hidden");   
	   		// The opacity must be reset because opacity was the attribute used for the fade effect.  
	   		$('#serverAlertContainer').css("opacity", "100");   
			});
*/		} else {
		// If the alert comtent is not empty, show the server alert and remove the overlay
		// that disables user controls.
			enableControls();
			$("#serverAlertContent").html(val);
			$('#serverAlertContainer').modal('show');

//			$('#serverAlertContainer').css('visibility', 'visible').hide().fadeIn('slow');
		};

	});

	// Footer content
		// Retrieves help content from Firebase and opens the Help overlay
		$(".helpLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar Help');
			GLOB.footerRef.child('help').once('value', function(childSnapshot, prevChildName) {
					var val = childSnapshot.val();
					var helpCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
					$("#modalBody").html(helpCopy);
			});
		});

		// Retrieves Privacy Policy content and opens the Privacy Policy overlay
		$(".privacyLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar Privacy Policy');
			GLOB.footerRef.child('privacy').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var privacyCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(privacyCopy);
			});
		});

		// Retrieves Terms and Conditions content and opens the Terms and Conditions overlay
		$(".termsLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('trustjar Terms and Conditions');
			GLOB.footerRef.child('terms').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var termsCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(termsCopy);
			});
			});

		// Retrieves 'Contact Us' content and opens the Contact Us overlay.
		$(".contactLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#footerHeader").html('Contact trustjar');
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

	// User submits a new relationship
		function newRelationshipFormSubmit () {
			var newRelationshipCheckboxes = []
			$('input.newRelationshipCheckbox:checkbox:checked').each(function () {
				// Strip the checkbox identifier so only the contact info is being sent to Firebase
//				var newRelationshipRequestorContact = $(this).attr('id').replace('NewRelationshipCheckbox','');
				var newRelationshipRequestorContact = $(this).data('contact');
				// add it to the array
				newRelationshipCheckboxes.push(newRelationshipRequestorContact)
			});
			// Send the array and all other form fields to Firebase. 
			GLOB.clientRef.push( {
				"msgType": "newRelationshipForm",
				"requestorContacts" : newRelationshipCheckboxes,
				"newRelationshipType" : $("input[name='newRelationshipType']:checked").val(),
				"counterpartyContact" : $('#newRelationshipCounterpartyContact').val()
			} ); 
			// disable user controls
			disableControls ()
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}


	// This function allows the 'save profile' confirmation modal to open only if there's a value entered for the required passcode field.
		$('#profileFormSubmitBtn').on('click', function() {
			if ($('#dashboardPasscode').val() !== "") {
				$('#saveProfileConfirm').modal('show');
			};
		});


	// User submits edits to their profile
		$('#confirmSaveProfileBtn').on('click', function() {
		// If a profile contact is checked, include it in the array to be sent to Firebase
			var profileCheckboxes = []
			$('input.profileCheckbox:checkbox:checked').each(function () {
				// Strip the checkbox identifier so only the contact info is being sent to Firebase
				var profileContact = $(this).attr('id').replace('Checkbox','');
				// add it to the array
				profileCheckboxes.push(profileContact)
			});
			// Send the array and all other form fields to Firebase. 
			GLOB.clientRef.push( {
				"msgType": "editProfileForm",
				"profileContacts" : profileCheckboxes,
				"profileName" : $('#editProfileFormName').val(),
				"newProfileContact" : $('#newProfileContact').val(),
				"passcode" : $('#dashboardPasscode').val()
			}); 
			// close the parent form
			$('#editProfileForm').hide(); 
			// disable user controls
			disableControls (); 
		});

	// User requests that an verify notification be resent to one of their own contacts.
		$('#resendVerificationBtn').on('click', function() {
			// Retrieve the contact from the 'data-contact' attribute from the button's tag
			var thisContact = $('#resendVerificationBtn').data('contact')
			// Send the contact to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "resendProfileVerificationRequest",
				"sendToContact": thisContact
			}); 
			// Disable user controls
			disableControls ();
		});

	// User requests that an invite notification be resent to a counterparty.
		$('#counterpartyResendBtn').on('click', function() {
			// Strip the 'confirm' button's ID so only the counterparty contact is sent to Firebase
			var thisContact = $('#counterpartyResendBtn').data('contact')
			// Send the contact to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "resendCounterpartyConfirmationRequest",
				"sendToContact": thisContact
			}); 
			// Disable user controls
			disableControls ();
		});

	// User removes a relationship from their dashboard
		$('#confirmRemoveRelationshipBtn').on('click', function() {
			// Strip the 'confirm' button's ID so only the relationship ID is sent to Firebase
			var thisRelationship = $(this).data('relationship');
			GLOB.clientRef.push( {  
				"msgType" : "removeRelationship",
				"relationshipId": thisRelationship
			}); 
			// Disable user controls
			disableControls ();
		});

	// User changes the contacts included in a relationship
		$('.confirmRelationshipChange').on('click', function() {
			// Strip the 'confirm' button's full ID to derive the ID of the relationship being changed
			var thisRelationship = $(this).data('relationship');
			// REQUESTOR CONTACTS
			// Use this to form the jQuery string that defines the list of requestor checkboxes in this relationship
			var requestorContactListCheck = '#' + thisRelationship + 'RequestorContactForm input[type=checkbox]:checked'
			// Declare the array to store the conteacts that have been checked
			var selectedRequestorContacts = [];
			// Determine which checkboxes in the specified list are checked
			$(requestorContactListCheck).each(function(){
				// Strip the full ID of each selected checkbox to derive the contact and push it to the requestorContacts array
				var thisRequestorContact = $(this).attr('id').replace(thisRelationship + 'Checkbox','');
				selectedRequestorContacts.push(thisRequestorContact)
			})

			// COUNTERPARTY CONTACTS
			// Use this to form the jQuery string that defines the list of counterparty checkboxes in this relationship
			var counterpartyContactListCheck = '#' + thisRelationship + 'CounterpartyContactForm input[type=checkbox]:checked'
			// Declare the array to store the conteacts that have been checked
			var selectedCounterpartyContacts = [];
			// Determine which checkboxes in the specified list are checked
			$(counterpartyContactListCheck).each(function(){
				// Strip the full ID of each selected checkbox to derive the contact and push it to the counterpartyContacts array
				var thisCounterPartyContact = $(this).attr('id').replace(thisRelationship + 'Checkbox','');
				selectedCounterpartyContacts.push(thisCounterPartyContact)
			})

			// ADD A NEW COUNTERPARTY CONTACT
			// Use this to form the jQuery string that defines the list of counterparty checkboxes in this relationship
			var addNewCounterpartyContact = '#' + thisRelationship + 'AddCounterpartyContact'
			// Declare the array to store the conteacts that have been checked
			var newCounterpartyContact = $(addNewCounterpartyContact).val();
			// Send the formatted information to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "editRelationshipContacts",
				"relationshipId": thisRelationship,
				"requestorContacts": selectedRequestorContacts,
				"counterpartyContacts": selectedCounterpartyContacts,
				"newCounterpartyContact": newCounterpartyContact
			}); 
			// close the parent form
//			$('#relationship1EditContactsForm').hide(); 
				var showForm = '#' + thisRelationship + 'ContactList';
				$(showForm).show();
				var hideForm = '#' + thisRelationship + 'EditContactsForm';
				$(hideForm).hide();
			// Disable user controls
			disableControls ();
		});

	// User requests to sign out of the dashboard
		$('#confirmSignOut').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "signOut"
			}); 
			// Disable user controls
			disableControls ();
		});

		// This function allows the 'close account' confirmation modal only if there's a value entered for the required passcode field.
		$('#closeAccountBtn').on('click', function() {
			if ($('#dashboardPasscode').val() !== "") {
				$('#closeAccount').modal('show');
			};
		});

	// Confirmation modal: User requests to close their account from the 'Edit profile' form.
		$('#confirmCloseAccount').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "closeAccount",
				"passcode" : $('#dashboardPasscode').val()
			}); 
			// close the parent form
			$('#editProfileForm').hide(); 
			// Disable user controls
			disableControls ();
		});


// Initialization function
$(document).ready(function() {
    // run test on initial page load
    responsiveAnimals();

    // run test on resize of the window
    $(window).resize(responsiveAnimals);
});