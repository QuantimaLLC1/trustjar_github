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
	GLOB.uniqueId = getPageId()

	// Overlay to disable controls. This is activated when the client sends a Firebase message 
	// to the server. Once the server responds, the overlay is removed.
	var td;
	function disableControls () {
		$( "#disableControls" ).removeClass( "hidden" );
		// Displays a message if the server hasn't responded after a certain amount of time. 
		// For the unit test, the delay is set for 4 seconds. In production, it should be at least 30 seconds. 
		td = setTimeout(
		function () { 
			$( "#technicalDifficulties" ).removeClass( "hidden" )
		}, 4000);
	}

	// Removes the 'disable controls' overlay along with the 'technical difficulties' overlay. Called when the client 
	// detects a new message on the server branch.
	function enableControls () {
		$( "#disableControls" ).addClass( "hidden" );
		$( "#technicalDifficulties" ).addClass( "hidden" );
		clearTimeout(td);
	}

	// Replaces a list of contacts with an 'edit profile' form in the header.
	$(document).on('click', '#editProfileLink', function(){
		$('#editProfileForm').show(); 
		$('#profileContactsContainer').hide()
	});

	// Cancels the 'edit profile' form and restores the default view.
	$(document).on('click', '#cancelEditProfileBtn', function(){
		$('#editProfileForm').hide(); 
		$('#profileContactsContainer').show()
	});

	// Replaces a list of contacts in a relationship with an 'edit contacts' form. Allows a user to edit a contact list in a relationship.
	$(document).on('click', '.editContactsForm', function(){
		var relationshipId = this.id.replace('EditContacts' , '')
		var showForm = '#' + relationshipId + 'EditContactsForm';
		$(showForm).show();
		var hideForm = '#' + relationshipId + 'ContactList';
		$(hideForm).hide();
		return false;
	});

	// Hides the 'edit contacts' form in a relationship and restores the default view when user clicks the 'cancel' button.
	$(document).on('click', '.cancelEditContactsForm', function(){
		var relationshipId = this.id.replace('CancelEditContacts' , '')
		var showForm = '#' + relationshipId + 'ContactList';
		$(showForm).show();
		var hideForm = '#' + relationshipId + 'EditContactsForm';
		$(hideForm).hide();
	});

	// When a user clicks the 'Change' button within an "Edit contacts" form in a relationship, this passes the specified relationship ID to 
	// the 'confirm' button in the confirmation dialog.
	$(document).on('click', '.editRelationshipContactsBtn', function(){
		thisRelationshipId = this.id.replace('ChangeBtn','ConfirmChange');
		$('#confirmChangeBtn').attr("id", thisRelationshipId)
	});

	// When a user clicks an 'unverified' link in the profile, this passes the contact ID to 
	// the 'confirm' button in the confirmation dialog. When that button is clicked, it will pass on the contact ID to Firebase.
	$(document).on('click', '.unverifiedLink', function(){
		thisContact = ($(this).attr("class").split(' ')[1]).replace('Verify', '')
		$('.resendVerification').removeAttr('id');
		$('.resendVerification').attr("id", thisContact + "ResendBtn")
	});


	// When a user clicks an 'unconfirmed' link in a relationship or in the 'edit relationship' form, this passes the contact ID to 
	// the 'confirm' button in the confirmation dialog. When that button is clicked, it will pass on the contact ID to Firebase.
	$(document).on('click', '.unconfirmedLink', function(){
		thisContact = ($(this).attr("class").split(' ')[1]).replace('Confirm', '')
		$('.counterpartyResend').removeAttr('id');		
		$('.counterpartyResend').attr("id", thisContact + "ConfirmBtn")
	});


	// When a user clicks a 'remove relationship' link, this passes the relationship ID to 
	// the 'confirm' button in the confirmation dialog
	$(document).on('click', '.removeRelationship', function(){
		thisRelationshipId = this.id.replace('RemoveRelationship','');
		$('#confirmRemoveRelationshipBtn').attr("id", thisRelationshipId + "ConfirmRemoveRelationship")
	});


	// When a user clicks a 'Become exclusive' link, this passes the relationship ID to 
	// the 'confirm' button in the confirmation dialog
	$(document).on('click', '.becomeExclusive', function(){
		thisRelationshipId = this.id.replace('BecomeExclusiveBtn','');
		$('#confirmBecomeExclusiveBtn').attr("id", thisRelationshipId + "ConfirmBecomeExclusiveBtn")
	});

// UNIQUE ID PLACEHOLDER
	function getPageId() {
			// This is a placeholder. In the real world, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

	// Placeholder for a function to receive an external URL and change to that page without initializing the DOM.
	// For now we just confirm in the unit test that the URL can be retrieved from the changePage function.
	function goToNewPage(newURL){
		GLOB.goToNewURL = newURL;
	}

	// Build a relationship module. This dynamically creates an entire relationship module dynamically based on information 
	// received by Firebase and processed by listeners elsewhere in this document. We do this because the number of possible
	// relationships on this page will vary from user to user, including the possibility that zero relationships are in a user's dashboard.
	function buildDashboard(requestor, counterparty, relationship){
				$('#relationshipColumn').append(
					"<div id='" + relationship + "Div' class=' well dashboardWell1'>" +
						// First row contains the requestor and counterparty names and the '<->' icon
						"<div id='relationshipNames' class='row'>" + 
							"<div id='" + relationship + "RequestorName' class='col-md-5' style='text-align:right'>" +
									"<h4 class='relationshipRequestorName'>" + 
										requestor + 
									"</h4>" +
								"</div>" +
								"<div class='col-md-2' style='text-align:center'>" +
									"<span class='glyphicon glyphicon-resize-horizontal' aria-hidden='true' style='font-size:60px; position:relative; top:-10px'></span>" +
								"</div>" +
								"<div id='" + relationship + "CounterpartyName' class='col-md-5'>" +
										"<h4>" + 
											counterparty + 
										"</h4>" +
								"</div>" +
							"</div>" +
							"<div id='" + relationship + "ContactList' class='row' style='position:relative; top:-30px'>" +
								"<div class='col-md-5'>" + 
									// This gets populated with the linst of verified requestor contacts that have been included in this relationship.
									"<div id='" +  relationship +  "RequestorContactList' style='text-align:right'>" +   
									"</div>" +
								"</div>" + 
								"<div class='col-md-2' style='text-align:center'>" + 
								"</div>" + 
								"<div class='col-md-5'>" + 
									// This gets populated with the linst of confirmed and unconfirmed counterparty contacts that are included in the relationship.
									"<div id='" +  relationship +  "CounterpartyContactList'>" +   
									"</div>" +
								"</div>" +
							"</div>" +

							"<div id='" + relationship + "EditContactsForm' style='position:relative; top:-20px; display:none; border:1px solid; padding:10px'>" +
								"<div class='row'>" +
									"<div class='col-md-5'>" + 
										// As part of the 'Edit contacts' form, this is populated with ALL verified and unverified contacts in the user's profile, to allow inclusion in or removal from the relationship.
										// Unconfirmed contacts can't be included but are presented as a visual cue to remind the user to verify them.
										"<div id='" +  relationship +  "RequestorContactForm' style='text-align:right' class='requestorContactForm'>" +   
										"</div>" +
									"</div>" + 
									"<div class='col-md-2' style='text-align:center'>" + 
									"</div>" + 
									"<div class='col-md-5'>" + 
										// As part of the 'Edit contacts' form, this is populated with ALL confirmed and unconfirmed counterparty contacts, to allow removal from the relationship.
										"<div id='" +  relationship +  "CounterpartyContactForm'>" +  
											// Allows the user to add a counterparty contact to an existing relationship.
											"<input id='" + relationship + "AddCounterpartyContact' type='text' class='form-control' placeholder='Add a new phone or email'>" + 
										"</div>" +
									"</div>" +
								"</div>" +
								// This row contains the change / cancel buttons for the form.
								"<div class='row'>" +
									"<div class='col-md-12' style='text-align:center'>" + 
										"Your partner will be notified of all changes.<br>" +
										"<a href='#' data-toggle='modal' id='" + relationship + "ChangeBtn' data-target='#confirmeditRelationshipContacts' class='btn btn-primary btn-sm editRelationshipContactsBtn'>" + 
											"Change" +
										"</a>" +
										"<button id='" + relationship + "CancelEditContacts' type='submit' class='btn btn-primary btn-sm cancelEditContactsForm'>" +
											"Cancel" +
										"</button>" +
									"</div>" + 
								"</div>" +
							"</div>" +
							// The links along the bottom of the relationship module: Edit contacts, Become exclusive, or Remove relationship.
							"<div class='center' style='font-size:16px; position:relative; top:-10px'>" +
								"<a href='#' id='" + relationship + "EditContacts' class='editContactsForm'>" +   
									"Edit contacts" +
								"</a><span class='becomeExclusiveSpan'>&nbsp;&nbsp; | &nbsp;&nbsp;" +
								"<a href='#' id='" + relationship + "BecomeExclusiveBtn' class='becomeExclusive' data-toggle='modal' data-target='#dashboardBecomeExclusive'>" +
									"Become exclusive" +
								"</a></span>" +
								"</a>&nbsp;&nbsp; | &nbsp;&nbsp;" +
								"<a href='#' id='" + relationship + "RemoveRelationship' class='removeRelationship' data-toggle='modal' data-target='#dashboardRemoveRelationship'>" + 
									"Remove relationship" +
								"</a>" +
							"</div>" +
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
	GLOB.pageDataRef = GLOB.serverRef.child('pageData');
	// Reference for all server-generated 'system alert' messages.
	GLOB.serverAlertRef = GLOB.serverRef.child('serverAlert');

// FIREBASE SERVER FUNCTIONS
	// Page display listeners
	GLOB.displayRef.on('child_added', function(childSnapshot, prevChildName) {
		// Retrieve the unique ID from the Firebase message
		var val = childSnapshot.val();
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
				$('#splashDiv').fadeOut(300);
				// if another pageTemplate is being displayed, fade it out
				$('.pageTemplate').each(function() {
					var pageId = '#' + this.id;
					if ( $(pageId).css('display') == 'block') {
						$(pageId).fadeOut(300);
						// Remove the 'disable controls' overlay if one is present
						enableControls();
					}
				});
				// fade the new page in, allowing for the old page to fade out first
				setTimeout(function() {
					$(showNew).fadeIn(300);
					$('.anonHeader').fadeIn(300);
					$('.footer').fadeIn(300);
					$('#whatIsTrustjar').fadeIn(300)
				}, 300);
			}
		}
	});

	// Server sets the page to be displayed
	GLOB.displayRef.on('child_changed', function(childSnapshot, prevChildName) {
		// Retrieve the unique ID from the Firebase message
		var val = childSnapshot.val();
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
				$('#splashDiv').fadeOut(300);
				// if another page template is being displayed, fade it out
				$('.pageTemplate').each(function() {
					var pageId = '#' + this.id;
					if ( $(pageId).css('display') == 'block') {
						$(pageId).fadeOut(300);
						// Remove the 'disable controls' overlay if one is present
						enableControls();
					}
				});
				// fade the new page in, allowing for the old page to fade out first
				setTimeout(function() {
					$(showNew).fadeIn(300);
					$('.anonHeader').fadeIn(300);
					$('.footer').fadeIn(300);
					$('#whatIsTrustjar').fadeIn(300)
				}, 300);
			}
		}
	});



	// Page data functions
	GLOB.pageDataRef.on('child_added', function(childSnapshot, prevChildName) {
		// Retrieve the data snapshot from the Firebase message
		var val = childSnapshot.val();

		// PAGE LEVEL DATA
			GLOB.relationshipType = val.relationshipType;
			// Place the relationship type where it belongs in the main page template.
			$('#relationshipType').html(GLOB.relationshipType);
			// If the relationship is exclusive, hide the "Add a new relationship" form and 'Become exclusive' links within relationship modules. There may be other layout rules applied pending Creative.
			if (GLOB.relationshipType == 'exclusive') {
				$('#newRelationshipContainer').hide();
				$('.becomeExclusiveSpan').hide();
				$('#relationshipTypeHeader').html('Exclusive relationship');				
			};

			// If the relationship is casual, show the "Add a new relationship" form and 'Become exclusive' links within relationship modules. There may be other layout rules applied pending Creative.
			if (GLOB.relationshipType == 'casual') {
				$('#newRelationshipContainer').show();
				$('#relationshipTypeHeader').html('Casual relationships');				
			};

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
				$('#editProfileContactList').append(" <div><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox' checked> <label>" + contact + "</label></div>")
				$('#newRelationshipFormContacts').append(" <div><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox' type='checkbox'> <label>" + contact + "</label></b></div>")
			});

			//Assign the array of unverified profile contacts to a global variable. 
			GLOB.unverifiedProfileContacts = val.unverifiedProfileContacts;
			// Format and append all unverified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// A link is appended to each to allow the user to resend a 'verify' notification. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
				$('#profileContacts').append(" <div class='pending'>" + contact + " (<a href='#' id='" + contact + "UnverifiedProfile' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>)</div>")
				$('#editProfileContactList').append(" <div class='pending'><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox' checked> <label>" + contact + "</label> (<a href='#' id='" + contact + "UnverifiedProfileEdit' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>)</div>")
				$('#newRelationshipFormContacts').append(" <div class='pending'><b><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox' type='checkbox' disabled> <label>" + contact + "</label> (<a href='#' id='" + contact + "NewRelationshipUnverified' data-toggle='modal'class='unverifiedLink " + contact + "Verify' data-target='#resendVerification'>unverified</a>)</b></div>")
			});

			//RELATIONSHIP LEVEL DATA
			// Initialize the entire relationship column
			$('#relationshipColumn').html('');
			// Assign the set of relationship data in the Firebase message to a global variable.
			GLOB.relationshipData = val.relationshipLevelData;

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
				// Incorporate the relationship identifier into the ID of the HTML element that  will contain the requestor contacts to be included in the 'Edit contacts' form.
				var requestorContactFormId = '#' + thisRelationship + "RequestorContactForm"
				// Retrieve the list of included requestor contacts for this relationship as a comma delimited string. Only verified contacts can be in a relationship as defined by the
				// 'includedRequestorContacts' portion of the Firebase message, and all such contacts must be a subset of verified profile contacts.
				var includedRequestorContacts = eval("GLOB.relationshipData." + thisRelationship + ".includedRequestorContacts");
				// Retrieve the list of unverified requestor contacts for this relationship as a comma delimited string. These will populate the 'Edit contacts' form.
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
				buildDashboard(GLOB.profileName, counterpartyName, thisRelationship);

				// If the relationship is exclusive, hide the "Become exclusive" link within the relationship. This must be done after the relationship div is constructed.
				if (GLOB.relationshipType == 'exclusive') {
					$('.becomeExclusiveSpan').hide();
				};

				// For each contact in the includedRequestorContacts list, create a display element and add it to the default relationship display.
				$(includedRequestorContacts).each(function (i, contact) {
					$(requestorContactListId).append(" <div><b>" + contact + "</b></div>")
				});

/*				// For each contact in the unverifiedRequestorContacts list, create a display element, including a checkbox and an 'unverified' link and add it to the default relationship display.
				$(unverifiedRequestorContacts).each(function (i, contact) {
					$(requestorContactListId).append(" <div class='pending'><b>(<a href='#' id='" + contact + "Unverified' data-toggle='modal' data-target='#counterpartyResend'>unverified</a>) " + contact + "</b></div>")
				});
*/				

				// For each contact in the verifiedProfileContacts list, create a display element including a checkboxand add it to the requestor section of the 'Edit contacts' form.
				$(GLOB.verifiedProfileContacts).each(function (i, contact) {
					$(requestorContactFormId).append(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' class='pull-right " + thisRelationship + "RequestorCheckbox'><label>" + contact + "&nbsp;</label></div>")
					// if the requestor contact is already part of the "included Requestor Contacts" list, pre-check the checkbox associated with it to reflect the default display.
					if(jQuery.inArray(contact, includedRequestorContacts) !== -1){
						contactCheckbox = "#" + contact + thisRelationship + "Checkbox";
						// Strip the special characters from the ID string. This allows the user to enter characters that are used as standard notation for emails and phone numbers without creating an error.
						formattedContactCheckbox = contactCheckbox.replace('@', '\\@').replace('.', '\\.').replace('-', '\\-').replace('(', '\\(').replace(')', '\\)')
						// Use the stripped ID string to check the checkbox corresponding to an already added contact.
						$( formattedContactCheckbox ).prop( "checked", true );
					}
				});

				// For each contact in the unverifiedProfileContacts list, create a display element, including a checkbox and an 'unverified' link and add it to the requestor section of the 'Edit contacts' form.
				$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
					$(requestorContactFormId).append(" <div class='pending'><input id='" + contact  + thisRelationship + "Checkbox' type='checkbox' disabled class='pull-right'>(<a href='#' id='" + thisRelationship + contact + "UnverifiedEditRelationship' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>) <label>" + contact + "&nbsp;</label></div>")
				});

				// For each contact in the confirmedCounterpartyContacts list, create a display element including a checkbox and add it to the default display and the requestor section of the 'Edit contacts' form.
				// .before is used to make sure the list appears above the "add a new phone or email" text input field.
				$(confirmedCounterpartyContacts).each(function (i, contact) {
					$(counterpartyContactListId).append(" <div><b>" + contact + "</b></div>")
					$(addCounterpartyField).before(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' checked> <label>" + contact + "</label></div>")
				});

				// For each contact in the unconfirmedCounterpartyContacts list, create a display element, including a checkbox and an 'unconfirmed link', and add it to the default display and the counterparty section of the 'Edit contacts' form.
				// .before is used to make sure the list appears above the "add a new phone or email" text input field.
				$(unconfirmedCounterpartyContacts).each(function (i, contact) {
					$(counterpartyContactListId).append(" <div class='pending'><b>" + contact + " (<a href='#' id='" + thisRelationship + contact + "Unconfirmed' data-toggle='modal' data-target='#counterpartyResend' class='unconfirmedLink " + contact + "Confirm'>unconfirmed</a>)</b></div>")
					$(addCounterpartyField).before(" <div class='pending'><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' checked> <label>" + contact + "</label> (<a href='#' id='" + contact + "UnconfirmedEditForm' data-toggle='modal' data-target='#counterpartyResend' class='unconfirmedLink " + contact + "Confirm'>unconfirmed</a>)</div>")
				});
			};

	});


	// Page data functions
	GLOB.pageDataRef.on('child_changed', function(childSnapshot, prevChildName) {
		// Retrieve the data snapshot from the Firebase message
		var val = childSnapshot.val();

		// PAGE LEVEL DATA
			GLOB.relationshipType = val.relationshipType;
			// Place the relationship type where it belongs in the main page template.
			$('#relationshipType').html(GLOB.relationshipType);
			// If the relationship is exclusive, hide the "Add a new relationship" form and 'Become exclusive' links within relationship modules. There may be other layout rules applied pending Creative.
			if (GLOB.relationshipType == 'exclusive') {
				$('#newRelationshipContainer').hide();
				$('.becomeExclusiveSpan').hide();
				$('#relationshipTypeHeader').html('Exclusive relationship');				
			};

			// If the relationship is casual, show the "Add a new relationship" form and 'Become exclusive' links within relationship modules. There may be other layout rules applied pending Creative.
			if (GLOB.relationshipType == 'casual') {
				$('#newRelationshipContainer').show();
				$('#relationshipTypeHeader').html('Casual relationships');				
			};

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
				$('#editProfileContactList').append(" <div><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox' checked> <label>" + contact + "</label></div>")
				$('#newRelationshipFormContacts').append(" <div><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox' type='checkbox'> <label>" + contact + "</label></b></div>")
			});

			//Assign the array of unverified profile contacts to a global variable. 
			GLOB.unverifiedProfileContacts = val.unverifiedProfileContacts;
			// Format and append all unverified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// A link is appended to each to allow the user to resend a 'verify' notification. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
				$('#profileContacts').append(" <div class='pending'>" + contact + " (<a href='#' id='" + contact + "UnverifiedProfile' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>)</div>")
				$('#editProfileContactList').append(" <div class='pending'><input id='" + contact + "Checkbox' type='checkbox' class='profileCheckbox' checked> <label>" + contact + "</label> (<a href='#' id='" + contact + "UnverifiedProfileEdit' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>)</div>")
				$('#newRelationshipFormContacts').append(" <div class='pending'><b><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox' type='checkbox' disabled> <label>" + contact + "</label> (<a href='#' id='" + contact + "NewRelationshipUnverified' data-toggle='modal'class='unverifiedLink " + contact + "Verify' data-target='#resendVerification'>unverified</a>)</b></div>")
			});

			//RELATIONSHIP LEVEL DATA
			// Initialize the entire relationship column
			$('#relationshipColumn').html('');
			// Assign the set of relationship data in the Firebase message to a global variable.
			GLOB.relationshipData = val.relationshipLevelData;

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
				// Incorporate the relationship identifier into the ID of the HTML element that  will contain the requestor contacts to be included in the 'Edit contacts' form.
				var requestorContactFormId = '#' + thisRelationship + "RequestorContactForm"
				// Retrieve the list of included requestor contacts for this relationship as a comma delimited string. Only verified contacts can be in a relationship as defined by the
				// 'includedRequestorContacts' portion of the Firebase message, and all such contacts must be a subset of verified profile contacts.
				var includedRequestorContacts = eval("GLOB.relationshipData." + thisRelationship + ".includedRequestorContacts");
				// Retrieve the list of unverified requestor contacts for this relationship as a comma delimited string. These will populate the 'Edit contacts' form.
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
				buildDashboard(GLOB.profileName, counterpartyName, thisRelationship);

				// If the relationship is exclusive, hide the "Become exclusive" link within the relationship. This must be done after the relationship div is constructed.
				if (GLOB.relationshipType == 'exclusive') {
					$('.becomeExclusiveSpan').hide();
				};

				// For each contact in the includedRequestorContacts list, create a display element and add it to the default relationship display.
				$(includedRequestorContacts).each(function (i, contact) {
					$(requestorContactListId).append(" <div><b>" + contact + "</b></div>")
				});

/*				// For each contact in the unverifiedRequestorContacts list, create a display element, including a checkbox and an 'unverified' link and add it to the default relationship display.
				$(unverifiedRequestorContacts).each(function (i, contact) {
					$(requestorContactListId).append(" <div class='pending'><b>(<a href='#' id='" + contact + "Unverified' data-toggle='modal' data-target='#counterpartyResend'>unverified</a>) " + contact + "</b></div>")
				});
*/				

				// For each contact in the verifiedProfileContacts list, create a display element including a checkboxand add it to the requestor section of the 'Edit contacts' form.
				$(GLOB.verifiedProfileContacts).each(function (i, contact) {
					$(requestorContactFormId).append(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' class='pull-right " + thisRelationship + "RequestorCheckbox'><label>" + contact + "&nbsp;</label></div>")
					// if the requestor contact is already part of the "included Requestor Contacts" list, pre-check the checkbox associated with it to reflect the default display.
					if(jQuery.inArray(contact, includedRequestorContacts) !== -1){
						contactCheckbox = "#" + contact + thisRelationship + "Checkbox";
						// Strip the special characters from the ID string. This allows the user to enter characters that are used as standard notation for emails and phone numbers without creating an error.
						formattedContactCheckbox = contactCheckbox.replace('@', '\\@').replace('.', '\\.').replace('-', '\\-').replace('(', '\\(').replace(')', '\\)')
						// Use the stripped ID string to check the checkbox corresponding to an already added contact.
						$( formattedContactCheckbox ).prop( "checked", true );
					}
				});

				// For each contact in the unverifiedProfileContacts list, create a display element, including a checkbox and an 'unverified' link and add it to the requestor section of the 'Edit contacts' form.
				$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
					$(requestorContactFormId).append(" <div class='pending'><input id='" + contact  + thisRelationship + "Checkbox' type='checkbox' disabled class='pull-right'>(<a href='#' id='" + thisRelationship + contact + "UnverifiedEditRelationship' data-toggle='modal' data-target='#resendVerification' class='unverifiedLink " + contact + "Verify'>unverified</a>) <label>" + contact + "&nbsp;</label></div>")
				});

				// For each contact in the confirmedCounterpartyContacts list, create a display element including a checkbox and add it to the default display and the requestor section of the 'Edit contacts' form.
				// .before is used to make sure the list appears above the "add a new phone or email" text input field.
				$(confirmedCounterpartyContacts).each(function (i, contact) {
					$(counterpartyContactListId).append(" <div><b>" + contact + "</b></div>")
					$(addCounterpartyField).before(" <div><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' checked> <label>" + contact + "</label></div>")
				});

				// For each contact in the unconfirmedCounterpartyContacts list, create a display element, including a checkbox and an 'unconfirmed link', and add it to the default display and the counterparty section of the 'Edit contacts' form.
				// .before is used to make sure the list appears above the "add a new phone or email" text input field.
				$(unconfirmedCounterpartyContacts).each(function (i, contact) {
					$(counterpartyContactListId).append(" <div class='pending'><b>" + contact + " (<a href='#' id='" + thisRelationship + contact + "Unconfirmed' data-toggle='modal' data-target='#counterpartyResend' class='unconfirmedLink " + contact + "Confirm'>unconfirmed</a>)</b></div>")
					$(addCounterpartyField).before(" <div class='pending'><input id='" + contact + thisRelationship + "Checkbox' type='checkbox' checked> <label>" + contact + "</label> (<a href='#' id='" + contact + "UnconfirmedEditForm' data-toggle='modal' data-target='#counterpartyResend' class='unconfirmedLink " + contact + "Confirm'>unconfirmed</a>)</div>")
				});
			};

	});

	// Server alert functions
	GLOB.serverAlertRef.on('child_added', function(childSnapshot, prevChildName) {
		// Retrieve the alert string from the Firebase message
		var val = childSnapshot.val();
		// If the alert comtent is empty, hide the server alert
		if (val == "") {
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


	GLOB.serverAlertRef.on('child_changed', function(childSnapshot, prevChildName) {
		// Retrieve the alert string from the Firebase message
		var val = childSnapshot.val();
		// If the alert comtent is empty, hide the server alert
		if (val == "") {
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
		$("#helpLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Help');
			GLOB.footerRef.child('help').once('value', function(childSnapshot, prevChildName) {
					var val = childSnapshot.val();
					var helpCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
					$("#modalBody").html(helpCopy);
			});
		});

		// Retrieves Privacy Policy content and opens the Privacy Policy overlay
		$("#privacyLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Privacy Policy');
			GLOB.footerRef.child('privacy').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var privacyCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(privacyCopy);
			});
		});

		// Retrieves Terms and Conditions content and opens the Terms and Conditions overlay
		$("#termsLink").click(function(){
			$("#footerOverlay").modal({backdrop: true});
			$("#modalHeader").html('trustjar Terms and Conditions');
			GLOB.footerRef.child('terms').once('value', function(childSnapshot, prevChildName) {
				var val = childSnapshot.val();
				var termsCopy = val.copy.replace('data:text/html;charset=utf-8,', '');
				$("#modalBody").html(termsCopy);
			});
			});

		// Retrieves 'Contact Us' content and opens the Contact Us overlay.
		$("#contactLink").click(function(){
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

	// User submits a new relationship
		function newRelationshipFormSubmit () {
			// If a profile contact is checked, include it in the array to be sent to Firebase
			if ($('.newRelationshipCheckbox').is(':checked')){
				var newRelationshipCheckboxes = []
				$('input.newRelationshipCheckbox:checkbox:checked').each(function () {
					// Strip the checkbox identifier so only the contact info is being sent to Firebase
					var newRelationshipRequestorContact = $(this).attr('id').replace('NewRelationshipCheckbox','');
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
			} else {
				// If no boxes are checked, return a javascript alert.
				alert('At least one of your contacts must be selected.');
			};
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User submits edits to their profile
		function profileFormSubmit () {
			// If a profile contact is checked, include it in the array to be sent to Firebase
			if ($('.profileCheckbox').is(':checked')){
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
					"newProfileContact" : $('#newProfileContact').val()
				} ); 
				// disable user controls
				disableControls ();
			} else {
				// If no boxes are checked, return a javascript alert.
				alert('You must have at least one verified contact in your profile.');
			};
			return false; // We don't want the form to trigger a page load. We want to do that through jQuery. 
		}

	// User requests that an verify notification be resent to one of their own contacts.
		$('.resendVerification').on('click', function() {
			// Strip the 'confirm' button's ID so only the the ID of the relationship is sent to Firebase
			var thisContact = this.id.replace('ResendBtn','');
			// Send the contact to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "resendProfileVerificationRequest",
				"sendToContact": thisContact
			}); 
			// Disable user controls
			disableControls ();
		});



	// User requests that an invite notification be resent to a counterparty.
		$('.counterpartyResend').on('click', function() {
			// Strip the 'confirm' button's ID so only the counterparty contact is sent to Firebase
			var thisContact = this.id.replace('ConfirmBtn','');
			// Send the contact to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "resendCounterpartyConfirmationRequest",
				"sendToContact": thisContact
			}); 
			// Disable user controls
			disableControls ();
		});



	// User removes a relationship from their dashboard
		$('.confirmRemoveRelationship').on('click', function() {
			// Strip the 'confirm' button's ID so only the relationship ID is sent to Firebase
			var thisRelationship = this.id.replace('ConfirmRemoveRelationship','');

			GLOB.clientRef.push( {  
				"msgType" : "removeRelationship",
				"relationship": thisRelationship
			}); 
			// Disable user controls
			disableControls ();
		});

	// User changes the contacts included in a relationship
		$('.confirmRelationshipChange').on('click', function() {
			// Strip the 'confirm' button's full ID to derive the ID of the relationship being changed
			var thisRelationship = this.id.replace('ConfirmChange','');

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

	// User requests to close their account from the 'Edit profile' form.
		$('#confirmCloseAccount').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "closeAccount"
			}); 
			// Disable user controls
			disableControls ();
		});

	// User requests that a relationship be changed from casual to exclusive. This must be the only relationship in the Dashboard, otherwise the server
	// will respond with an error alert.
		$('.confirmBecomeExclusive').on('click', function() {
			var thisRelationship = this.id.replace('ConfirmBecomeExclusiveBtn','');
			GLOB.clientRef.push( {  
				"msgType" : "becomeExclusive",
				"relationshipId": thisRelationship
			}); 
			// Disable user controls
			disableControls ();
		});


/*  CODE THAT MAY BE USED FOR DASHBOARD PAGES
		// Add another contact field to the user's profile. Called if user is entering multiple contacts at once.
		function addProfileContact () {
			$( "#addContactProfile" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
		}

		// Add another contact field to the current request form. Called if user is entering multiple contacts at once.
		function addContact () {
			$( "#addContactDash" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
		}
*/