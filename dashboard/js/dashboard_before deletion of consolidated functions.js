// PAGE DATA FUNCTIONS
	// Define the functions for populating pages with server-generated page data.

	// Make a map of page names and corresponding page data functions for easy lookup.
	// If the page specified by Firebase isn't listed in the eventListenersMap, 
	// a "bad page" message will be returned to Firebase. More pages may be added to this 
	// map as content is developed.
		var eventListenersMap = {
			"dashboard" : noPageData,
		}

		// This function is used for pages that require no page data to populate them. The Dashboard uses listeners
		// to manage data and only calls this function as a way of preserving the eventsListenersMap approach used 
		// by other pages that, unlike the Dashboard, share a common javascript / jQuery base. This will be finalized
		// pending final disposition of mechanisms to change to external HTML pages.
		function noPageData( pageData ) {
		};

// NON-FIREBASE FUNCTIONS

	// Initialize all tooltips (required by bootstrap)
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})

	// Retrieve the unique ID from Firebase and assign it to a global variable. 
	// We'll use it to create the main branch for client / server communications.
	// This is a placeholder until server implementation is complete.
	GLOB.uniqueId = getSessionId()

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

	// Removes the 'disable controls' overlay and the 'technical difficulties' element. Called when the client 
	// detects a new message on the server branch.
	function enableControls () {
		$( "#disableControlsOverlay" ).modal('hide')
		$( "#technicalDifficulties" ).addClass( "hidden" );
		clearTimeout(td);
	}

	// Toggle show / hide passcode field for 'edit profile' form. This removes the mask
	// from the passcode field so the user can choose to visually confirm that it's correct.
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

	// Toggles display of the 'edit profile' form in the header when the 'edit profile' icon is selected.
	$(document).on('click', '#editProfileLink', function(){
		$('#profileFormContainer').toggleClass(); 
	});

	// Closes the 'edit profile' form when the 'cancel' button is clicked. Since the button is only available 
	// when the form is open, the toggle will always close the form.
	$(document).on('click', '#cancelEditProfileBtn', function(){
		$('#profileFormContainer').toggleClass(); 
	});

	// Replaces a list of contacts in a specified relationship with an 'edit relationship' form, using the element's 
	// data-relationship attribute.
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

	// When a user clicks an 'unverified' link in the profile, this passes the contact channel to the 'confirm' button 
	// in the confirmation dialog, using the data-contact attribute so it can be passed to Firebase on confirmation.
	$(document).on('click', '.unverifiedLink', function(){
		var unverifiedContact = $(this).data('contact')
		$('#resendVerificationBtn').data('contact', unverifiedContact)
	});


	// When a user clicks an 'unconfirmed' link in the profile, this passes the contact channel to the 'confirm' button 
	// in the confirmation dialog, using the data-contact attribute so it can be passed to Firebase on confirmation.
	$(document).on('click', '.unconfirmedLink', function(){
		var unverifiedContact = $(this).data('contact')
		$('#counterpartyResendBtn').data('contact', unverifiedContact)
	});

	// When a user clicks the 'save changes' button within an "edit relationship" form in a relationship, this passes the 
	// specified relationship ID to the 'confirm' button in the confirmation dialog.
	$(document).on('click', '.editRelationshipContactsBtn', function(){
		var thisRelationshipId = $(this).data('relationship');
		$('#confirmChangeBtn').data('relationship', thisRelationshipId)
	});

	// When a user clicks a 'remove relationship' link, this passes the relationship ID to the 'confirm' button in the confirmation dialog
	$(document).on('click', '.removeRelationship', function(){
		var thisRelationshipId = $(this).data('relationship')
		$('#confirmRemoveRelationshipBtn').data('relationship', thisRelationshipId)
	});


	// Toggle the requestor checkbox for requestors in a relationship when the "label" is clicked. (It's actually a pseudo-label using a div. 
	// This is a workaround due to complexities using right-justified pseudo-checkboxes in Bootstrap.)
	$(document).on('click', ".rightJustifiedCheckboxCopy", function() {
		// Use the data-requestor attribute of the div 
		var thisCheckboxId = $(this).data('requestor') + "Checkbox";
   		// Add escape characters to handle phone and email 'punctuation' conventions
   		var formattedCheckboxId = "#" + thisCheckboxId.replace('@', '\\\@').replace('.', '\\\.').replace('-', '\\\-').replace('(', '\\\(').replace(')', '\\)')
   		$(formattedCheckboxId).prop("checked", !$(formattedCheckboxId).prop("checked"));
	});

	// Unique ID placeholder
	function getSessionId() {
			// This is a placeholder. In practice, this will be generated by the server and hard coded into this page
			return(  "UID12345" );
	}

	// Placeholder for a function to receive an external URL and change to that page without initializing the DOM.
	// For now we just confirm in the unit test that the URL can be retrieved from the changePage function.
	function goToNewPage(newURL){
		GLOB.goToNewURL = newURL;
	}
/*
	// Splash screen logo animation
	function animateLogotype() {
		// Initialize the color on the 'TJ' in case the function is repeating after the user clicked on it
		$("#t2").removeClass('TJ');
		$("#j").removeClass('TJ');
		// Change the color of the letters over time to produce the preferred animation
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

*/
	// Build a relationship module. 
	// This dynamically builds an entire relationship module based on information received by Firebase
	// and is called by page data listeners elsewhere in this document. We do this because the number of possible
	// relationships on this page will vary from user to user, including the possibility of zero 
	// relationships are in a user's dashboard. Nested within the module is a form to edit the relationship.
	function buildRelationship(requestor, counterparty, relationship){
		$('#relationshipColumn').append(
			"<div id='" + relationship + "Div' class=' well relationshipModule'>" +

				// First row contains the requestor and counterparty names and the '<->' icon
				"<div id='relationshipNames' class='row boxHeader'>" + 
					// Requestor name
					"<div id='" + relationship + "RequestorName' class='col-md-5 textRight relationshipRequestorName'>" + 
						requestor + 
					"</div>" +
					"<div class='col-md-2' class='center'>" +
					"</div>" +
					// Counterparty name
					"<div id='" + relationship + "CounterpartyName' class='col-md-5 relationshipCounterpartyName'>" +
						counterparty + 
					"</div>" +
				"</div>" +
				// Contact lists
				"<div id='" + relationship + "ContactList' class='row profileContacts'>" +
				"<hr class='dashed'>" +
					// This gets populated with the list of verified requestor contacts that have been included in this relationship.
					"<div id='" +  relationship +  "RequestorContactList' class='col-md-5 textRight requestorList'>" + 
					"</div>" + 
					"<div class='col-md-2 center'>" + 
						"<br><img src='images/arrow.svg' alt='in a relationship with'><br><br>" +
					"</div>" + 
					// This gets populated with the list of confirmed and unconfirmed counterparty contacts that are included in the relationship.
					"<div id='" +  relationship +  "CounterpartyContactList' class='col-md-5'>" + 
					"</div>" +
				"</div>" +
				// edit relationship form. This appears when user clicks 'edit relationship'
				"<div id='" + relationship + "EditContactsForm' class='profileContacts relationshipForm' data-relationship='" + relationship + "'>" +
				"<div class='relationshipFormCopy'>If you remove your contact channels from this relationship, they'll still be available in your Trustjar for other relationships. If you remove your partner's contact channels from the relationship, they'll be permanently removed and you'll have to reconfirm them all over again.</div>" +
					"<div class='row'>" +
						// As part of the 'edit relationship' form, this is populated with verified contacts from the user's profile, 
						// to allow inclusion in or removal from the relationship.
						"<div id='" +  relationship +  "RequestorContactForm' class='col-md-5 requestorContactForm textRight'>" + 
						"</div>" + 
						"<div class='col-md-2 center'>" + 
							"<br><img src='images/arrow.svg' alt='in a relationship with'><br><br>" +
						"</div>" + 
						// As part of the 'edit relationship' form, this is populated with ALL confirmed and unconfirmed counterparty contacts, 
						// to allow inclusion in or removal from the relationship.
						"<div id='" +  relationship +  "CounterpartyContactForm' class='col-md-5 profileContacts'>" + 
							// Allows the user to add a new counterparty contact to an existing relationship.
							"<input id='" + relationship + "AddCounterpartyContact' type='text' class='form-control' placeholder='Add a new phone or email'>" + 
						"</div>" +
					"</div>" +
					// This row contains the change / cancel buttons for the 'edit relationship' form.
					"<div class='row'>" +
						"<div class='col-md-12 center'>" + 
							"Your partner will be notified of all changes. <br>" +
						"</div>" + 
					"</div>" +
					"<div class='row center'>" +
						"<div class='col-md-2'></div>" +
						"<div class='col-md-4'>" +
							"<a href='#' data-toggle='modal' id='" + relationship + "ChangeBtn' data-target='#confirmeditRelationshipContacts' data-relationship='" + relationship + "' class='btn btn-primary btn-sm editRelationshipContactsBtn relationshipButtons'>" + 
								"save changes" +
							"</a>" +
						"</div>" +
						"<div class='col-md-4'>" +
							"<button id='" + relationship + "CancelEditContacts' type='submit' data-relationship='" + relationship + "' class='btn btn-primary btn-sm cancelEditContactsForm relationshipButtons'>" +
								"cancel" +
							"</button>" +
						"</div>" +
						"<div class='col-md-2'></div>" +
					"</div>" +
				"</div>" +
				// The links along the bottom of the relationship module: edit relationship, remove relationship.
				"<div class='row center'>" +
					"<div class='col-md-2'></div>" +
					"<div class='col-md-4'>" +
						"<a href='#' id='" + relationship + "EditContacts' class='editContactsForm' data-relationship='" + relationship + "'>" + 
							"<button type='submit' class='btn btn-primary btn-md relationshipButtons'>" +
								"edit relationship" +
							"</button>" +  
						"</a>" + 
					"</div>" +
					"<div class='col-md-4'>" +
						"<a href='#' id='" + relationship + "RemoveRelationship' class='removeRelationship' data-toggle='modal' data-target='#dashboardRemoveRelationship' data-relationship='" + relationship + "'>" + 
							"<button type='submit' class='btn btn-primary btn-md relationshipButtons'>" +
							"remove relationship" +
							"</button>" +  
						"</a>" +
					"</div>" +
					"<div class='col-md-2'></div>" +
				"</div>" +
			"</div>"
		);
	}

// FIREBASE REFERENCES
/*	// Set our primary static Firebase key path
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

*/// FIREBASE SERVER MESSAGE LISTENERS AND FUNCTIONS
	// Page display listener
/*	GLOB.displayRef.on('value', function(dataSnapshot) {
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
				// This will replace the current one as soon as we have a solution for DOM continuity on HTML page change.
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
					// if another pageTemplate is being displayed, fade it out
					$('.pageTemplate').each(function() {
						var pageId = '#' + this.id;
						if ( $(pageId).css('display') == 'block') {
							$(pageId).fadeOut(1700);
							// Remove the 'disable controls' overlay if one is present
							enableControls();
						}
					});
					setTimeout(function() {
						// fade the new page in, allowing for the old page to fade out first. 
						$(showNew).fadeIn(300);
						// if the display is still showing the splash page, fade it out. 
						$("#splash").fadeOut(200);
					}, 1400);
				}
			}
		}
	});

*/	// Page data listener
	GLOB.dashboardPageDataRef.on('value', function(dataSnapshot) {
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
			// Append each verified profile contact to the designated locations mentioned above. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.verifiedProfileContacts).each(function (i, contact) {
				$('#profileContacts').append(" <div>" + contact + "</div>")
				$('#editProfileContactList').append(" <div><input id='" + contact + "Checkbox' type='checkbox' data-contact='" + contact + "' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label></div>")
				$('#newRelationshipFormContacts').append(" <div><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox pseudo-checkbox-1 sr-only' type='checkbox' data-contact='" + contact + "'> <label for='" + contact + "NewRelationshipCheckbox'> "  + contact + "</label></div>")
			});

			// Populate the element that describes how many contacts are in the user's profile.
			$('#numberOfContacts').html(GLOB.verifiedProfileContacts.length)

			//Assign the array of unverified profile contacts to a global variable. 
			GLOB.unverifiedProfileContacts = val.unverifiedProfileContacts;
			// Format and append all unverified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// A link icon is appended to each to allow the user to resend a 'verify' notification. If the display element is part of a form, add checkboxes
			// so the user can select them.
			$(GLOB.unverifiedProfileContacts).each(function (i, contact) {
				$('#editProfileContactList').append(" <div class='pending'><input id='" + contact + "Checkbox' type='checkbox' data-contact='" + contact + "' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label> <a href='#' id='" + contact + "UnverifiedProfileEdit' data-toggle='modal' data-target='#resendVerification' data-contact='" + contact + "' class='profileContacts unverifiedLink " + contact + "Verify'><img src='images/blueAirplane.svg' alt='resend request' class='resendIcon'></a></div>")
			});

			//RELATIONSHIP LEVEL DATA
			// Initialize the entire relationship column
			$('#relationshipColumn').html('');

			// Assign the relationship type (casual or exclusive) to a global variable
			GLOB.relationshipType = val.relationshipType;

			// If the relationship is exclusive, display the 'EXCLUSIVE RELATIONSHIP' column header.
			if (GLOB.relationshipType == 'exclusive') {
				$('#relationshipTypeHeader').html('EXCLUSIVE RELATIONSHIP');
				$('#relationshipTypeHeader').show();
			}

			// If the relationship is casual, display the 'CASUAL RELATIONSHIP(S)' column header. 
			if (GLOB.relationshipType == 'casual') {
				$('#relationshipTypeHeader').html('CASUAL RELATIONSHIP(S)');
				$('#relationshipTypeHeader').show();
			}		
			
			// If there are no relationships, only the new relationship form is displayed. 
			if  ((GLOB.relationshipType !== 'exclusive') && (GLOB.relationshipType !== 'casual')) {
				$('#relationshipTypeHeader').hide();
			}

			// Assign the set of relationship data in the Firebase message to a global variable.
			GLOB.relationshipData = val.relationships;
			// If there are existing relationships in the page data:
			if (GLOB.relationshipData !== undefined) {

				// Define an array for the set of relationship ID's that will define each relationship in the set.
				GLOB.relationshipId = [];

				// Iterate through each relationship ID in the array to derive and displey the subset of relationship date for each relationship.
				GLOB.relationshipId = Object.keys(GLOB.relationshipData);

				for (var i = 0; i < GLOB.relationshipId.length; i++) {

					var thisRelationship = GLOB.relationshipId[i];

					// Since contact channels and relationship display elements may appear across multiple relationships, 
					// We'll append the relationship ID to the ID of each element to create a unique ID for all relationship data elements.

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

					// Call the function that renders the HTML for a relationship module, using the user's name, the counterparty name, and the relationship identifier.
						buildRelationship(GLOB.profileName, counterpartyName, thisRelationship);

					// For each contact in the includedRequestorContacts list, create a display element and add it to the default relationship display.
					$(includedRequestorContacts).each(function (i, contact) {
						$(requestorContactListId).append(" <div><b>" + contact + "</b></div>")
					});				

					// For each contact in the verifiedProfileContacts list, create a display element including a checkbox and add it to the requestor section of the 'edit relationship' form.
					$(GLOB.verifiedProfileContacts).each(function (i, contact) {
						$(requestorContactFormId).append(" <div id='" + contact + thisRelationship + "Copy' data-requestor='" + contact + thisRelationship + "' class='rightJustifiedCheckboxCopy clearfix'><input id='" + contact + thisRelationship + "Checkbox' data-contact='" + contact + "' type='checkbox' class='pull-right sr-only pseudo-checkbox-1 requestorRelationshipCheckbox " + thisRelationship + "RequestorCheckbox'>&nbsp;<label for='" + contact + thisRelationship + "Checkbox' class='pull-right pseudo-checkbox-1-Label'>&nbsp;</label>" + contact + " &nbsp;</div>")
						// if the requestor contact is already part of the "included Requestor Contacts" list, pre-check the checkbox associated with it to reflect the default display.
						if(jQuery.inArray(contact, includedRequestorContacts) !== -1){
							contactCheckbox = "#" + contact + thisRelationship + "Checkbox";
							// Add escape characters to the ID string. This allows the user to enter characters used as standard notation for emails and phone numbers without creating an error.
							formattedContactCheckbox = contactCheckbox.replace('@', '\\@').replace('.', '\\.').replace('-', '\\-').replace('(', '\\(').replace(')', '\\)')
							// Use the 'escape'd ID string to pre-select the checkbox corresponding to an already added contact.
							$( formattedContactCheckbox ).prop( "checked", true );
						}
					});

					// For each contact in the confirmedCounterpartyContacts list, create a display element including a checkbox and add it to the default display and the requestor section of the 'edit relationship' form.
					// .before is used to make sure the list appears above the "add a new phone or email" text input field.
					$(confirmedCounterpartyContacts).each(function (i, contact) {
						$(counterpartyContactListId).append(" <div><b>" + contact + "</b></div>")
						$(addCounterpartyField).before(" <div><input id='" + contact + thisRelationship + "Checkbox' data-contact='" + contact + "' type='checkbox' class='pseudo-checkbox-2 sr-only' checked> <label for='" + contact + thisRelationship + "Checkbox'>&nbsp;" + contact + "</label></div>")
					});

					// For each contact in the unconfirmedCounterpartyContacts list, create a display element, including a checkbox and an 'unconfirmed link', and add it to the default display and the counterparty section of the 'edit relationship' form.
					// .before is used to make sure the list appears above the "add a new phone or email" text input field.
					$(unconfirmedCounterpartyContacts).each(function (i, contact) {
						$(counterpartyContactListId).append(" <div class='pending'><b>" + contact + " <a href='#' id='" + thisRelationship + contact + "Unconfirmed' data-toggle='modal' data-target='#counterpartyResend' data-contact='" + contact + "' class='unconfirmedLink " + contact + "Confirm'><img src='images/blueAirplane.svg' alt='resend request' class='resendIcon'></a></b></div>")
						$(addCounterpartyField).before(" <div class='pending'><input id='" + contact + thisRelationship + "Checkbox' data-contact='" + contact + "' type='checkbox' class='pseudo-checkbox-2 sr-only' checked> <label for='" + contact + thisRelationship + "Checkbox'> " + contact + "</label></div>")
					});
				};
			};			
		}
	});
/*
	// Server alert listener
	GLOB.serverAlertRef.on('value', function(dataSnapshot) {
		// Retrieve the alert string from the Firebase message
		var val = dataSnapshot.val();
		// If there is no alert message, hide the server alert
		if (val == null) {
			$("#serverAlertContent").html('');
			$('#serverAlertContainer').modal('hide');
		} else {
		// If there is an alert message, show the server alert and remove the overlay
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
*/
	// User submits a new relationship
		function newRelationshipFormSubmit () {
			var newRelationshipCheckboxes = []
			// for each checkbox that's checked...
			$('input.newRelationshipCheckbox:checkbox:checked').each(function () {
				// ...retrieve the contact channel from the data-contact attribute
				var newRelationshipRequestorContact = $(this).data('contact');
				// and add it to the array
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
			// for each checkbox that's checked...
			$('input.profileCheckbox:checkbox:checked').each(function () {
				// ...retrieve the contact channel from the data-contact attribute
				var profileContact = $(this).data('contact')
				// and add it to the array
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
			$('#profileFormContainer').toggleClass(); 
			// disable user controls
			disableControls (); 
		});

	// User requests that a 'verify contact channel' notification be resent to one of their own contacts.
		$('#resendVerificationBtn').on('click', function() {
			// Retrieve the contact channel from the 'data-contact' attribute from the button's tag
			var thisContact = $('#resendVerificationBtn').data('contact');
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
			// Retrieve the contact channel from the 'data-contact' attribute from the button's tag
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
			// Retrieve the contact channel from the 'data-relationship' attribute from the button's tag
			var thisRelationship = $(this).data('relationship');
			// Send the relationship ID to Firebase
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
			// Use this to form the jQuery string that defines the list of checked requestor checkboxes in this relationship
			var requestorContactListCheck = '#' + thisRelationship + 'RequestorContactForm input[type=checkbox]:checked'
			// Declare the array to store the contacts that have been checked
			var selectedRequestorContacts = [];
			// Determine which checkboxes in the specified list are checked
			$(requestorContactListCheck).each(function(){
				// Retrieve the contact channel from the 'data-contact' attribute from the checkbox
				var thisRequestorContact = $(this).data('contact');
				// Add the contact channel to the array of selected requestor contact channels
				selectedRequestorContacts.push(thisRequestorContact)
			})

			// COUNTERPARTY CONTACTS
			// Use this to form the jQuery string that defines the list of counterparty checkboxes in this relationship
			var counterpartyContactListCheck = '#' + thisRelationship + 'CounterpartyContactForm input[type=checkbox]:checked'
			// Declare the array to store the conteacts that have been checked
			var selectedCounterpartyContacts = [];
			// Determine which checkboxes in the specified list are checked
			$(counterpartyContactListCheck).each(function(){
				// Retrieve the contact channel from the 'data-contact' attribute from the checkbox
				var thisCounterpartyContact = $(this).data('contact');
				// Add the contact channel to the array of selected counterparty contact channels
				selectedCounterpartyContacts.push(thisCounterpartyContact)
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

		// This function allows the 'close account' confirmation modal to display only if there's a value 
		// entered for the required passcode field.
		$('#closeAccountBtn').on('click', function() {
			if ($('#dashboardPasscode').val() !== "") {
				$('#closeAccount').modal('show');
			};
		});

	// Confirmation modal: User confirms request to close their account from the 'Edit profile' form.
		$('#confirmCloseAccount').on('click', function() {
			GLOB.clientRef.push( {  
				"msgType" : "closeAccount",
				"passcode" : $('#dashboardPasscode').val()
			}); 
			// close the parent form
			$('#profileFormContainer').toggleClass();
			// Disable user controls
			disableControls ();
		});
