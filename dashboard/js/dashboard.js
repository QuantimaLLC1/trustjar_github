
// NON-FIREBASE FUNCTIONS

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

	// Build a relationship module. 
	// This dynamically builds an entire relationship module based on information received by Firebase
	// and is called by page data listeners elsewhere in this document. We do this because the number of possible
	// relationships on this page will vary from user to user, including the possibility of zero 
	// relationships are in a user's dashboard. Nested within the module is a form to edit the relationship.
	function buildRelationship(requestor, counterparty, relationship){
		$('#relationshipColumn').append(
			"<div id='" + relationship + "Div' class=' well dashboardRelationshipModule'>" +

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
				"<div id='" + relationship + "ContactList' class='row profileContactChannels'>" +
				"<hr class='dashed'>" +
					// This gets populated with the list of verified requestor contacts that have been included in this relationship.
					"<div id='" +  relationship +  "RequestorContactList' class='col-md-5 textRight requestorList'>" + 
					"</div>" + 
					"<div class='col-md-2 center'>" + 
						"<br><img src='../images/arrow.svg' alt='in a relationship with'><br><br>" +
					"</div>" + 
					// This gets populated with the list of confirmed and unconfirmed counterparty contacts that are included in the relationship.
					"<div id='" +  relationship +  "CounterpartyContactList' class='col-md-5'>" + 
					"</div>" +
				"</div>" +
				// edit relationship form. This appears when user clicks 'edit relationship'
				"<div id='" + relationship + "EditContactsForm' class='profileContactChannels relationshipForm' data-relationship='" + relationship + "'>" +
				"<div class='relationshipFormCopy'>If you remove your contact channels from this relationship, they'll still be available in your Trustjar for other relationships. If you remove your partner's contact channels from the relationship, they'll be permanently removed and you'll have to reconfirm them all over again.</div>" +
					"<div class='row'>" +
						// As part of the 'edit relationship' form, this is populated with verified contacts from the user's profile, 
						// to allow inclusion in or removal from the relationship.
						"<div id='" +  relationship +  "RequestorContactForm' class='col-md-5 requestorContactForm textRight'>" + 
						"</div>" + 
						"<div class='col-md-2 center'>" + 
							"<br><img src='../images/arrow.svg' alt='in a relationship with'><br><br>" +
						"</div>" + 
						// As part of the 'edit relationship' form, this is populated with ALL confirmed and unconfirmed counterparty contacts, 
						// to allow inclusion in or removal from the relationship.
						"<div id='" +  relationship +  "CounterpartyContactForm' class='col-md-5 profileContactChannels'>" + 
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
							"<a href='#' data-toggle='modal' id='" + relationship + "ChangeBtn' data-target='#confirmSaveRelationshipChanges' data-relationship='" + relationship + "' class='btn btn-primary btn-sm editRelationshipContactsBtn relationshipButtons'>" + 
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

// FIREBASE SERVER LISTENER

	// Page data listener
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
			$('#profileContactChannels').html('');
			$('#editProfileContactChannelList').html('')			
			$('#newRelationshipFormContacts').html('')	

			//Assign the array of verified profile contacts to a global variable.
			GLOB.verifiedProfileContactChannels = val.verifiedProfileContactChannels;
			// Format all verified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// Append each verified profile contact to the designated locations mentioned above. If the display element is part of a form, add checkboxes so the user can select them.
			$(GLOB.verifiedProfileContactChannels).each(function (i, contact) {
				$('#profileContactChannels').append(" <div>" + contact + "</div>")
				$('#editProfileContactChannelList').append(" <div><input id='" + contact + "Checkbox' type='checkbox' data-contact='" + contact + "' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label></div>")
				$('#newRelationshipFormContacts').append(" <div><input id='" + contact + "NewRelationshipCheckbox' class='newRelationshipCheckbox pseudo-checkbox-1 sr-only' type='checkbox' data-contact='" + contact + "'> <label for='" + contact + "NewRelationshipCheckbox'> "  + contact + "</label></div>")
			});

			// Populate the element that describes how many contacts are in the user's profile.
			$('#numberOfProfileContactChannels').html(GLOB.verifiedProfileContactChannels.length)

			//Assign the array of unverified profile contacts to a global variable. 
			GLOB.unverifiedProfileContactChannels = val.unverifiedProfileContactChannels;
			// Format and append all unverified profile contacts for display in the header, the 'Edit profile' form and the 'Add a new relationship' form.
			// A link icon is appended to each to allow the user to resend a 'verify' notification. If the display element is part of a form, add checkboxes
			// so the user can select them.
			$(GLOB.unverifiedProfileContactChannels).each(function (i, contact) {
				$('#editProfileContactChannelList').append(" <div class='pending'><input id='" + contact + "Checkbox' type='checkbox' data-contact='" + contact + "' class='profileCheckbox pseudo-checkbox-2 sr-only' checked> <label for='" + contact + "Checkbox'> " + contact + "</label> <a href='#' id='" + contact + "UnverifiedProfileEdit' data-toggle='modal' data-target='#resendVerification' data-contact='" + contact + "' class='profileContactChannels unverifiedLink " + contact + "Verify'><img src='images/blueAirplane.svg' alt='resend request' class='resendIcon'></a></div>")
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

					// For each contact in the verifiedProfileContactChannels list, create a display element including a checkbox and add it to the requestor section of the 'edit relationship' form.
					$(GLOB.verifiedProfileContactChannels).each(function (i, contact) {
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

// FIREBASE CLIENT FUNCTIONS

	// User submits a new relationship
		function newRelationshipFormSubmit () {
			var newRelationshipCheckboxes = []
			// for each checkbox that's checked...
			$('input.newRelationshipCheckbox:checkbox:checked').each(function () {
				// ...retrieve the contact channel from the data-contact attribute...
				var newRelationshipRequestorContact = $(this).data('contact');
				// ...and add it to the array
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
			if ($('#editProfileFormName').val() !== "") {
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
				"profileContactChannels" : profileCheckboxes,
				"profileName" : $('#editProfileFormName').val(),
				"newProfileContactChannel" : $('#newProfileContactChannel').val(),
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

			// A. Requestor contacts
			// Define the list of checked requestor checkboxes in this relationship
			var requestorContactListCheck = '#' + thisRelationship + 'RequestorContactForm input[type=checkbox]:checked'
			// Declare the array to store the contacts that have been checked
			var selectedRequestorContacts = [];
			// For each checkbox in the specified list that's checked:
			$(requestorContactListCheck).each(function(){
				// Retrieve the contact channel from the 'data-contact' attribute of the checkbox
				var thisRequestorContact = $(this).data('contact');
				// Add the contact channel to the array of selected requestor contact channels
				selectedRequestorContacts.push(thisRequestorContact)
			})

			// B. Counterparty contacts
			// Define the list of 'checked' counterparty checkboxes in this relationship
			var counterpartyContactListCheck = '#' + thisRelationship + 'CounterpartyContactForm input[type=checkbox]:checked'
			// Declare the array to store the conteacts that have been checked
			var selectedCounterpartyContacts = [];
			// For each checkbox in the specified list that's checked:
			$(counterpartyContactListCheck).each(function(){
				// Retrieve the contact channel from the 'data-contact' attribute of the checkbox
				var thisCounterpartyContact = $(this).data('contact');
				// Add the contact channel to the array of selected counterparty contact channels
				selectedCounterpartyContacts.push(thisCounterpartyContact)
			})

			// C. Add a new contact
			// Use this to form the jQuery string that defines the list of counterparty checkboxes in this relationship
			var addNewCounterpartyContact = '#' + thisRelationship + 'AddCounterpartyContact'
			// Declare the array to store the conteacts that have been checked
			var newCounterpartyContact = $(addNewCounterpartyContact).val();

			// D. Send the formatted information to Firebase
			GLOB.clientRef.push( {  
				"msgType" : "editRelationshipContacts",
				"relationshipId": thisRelationship,
				"requestorContacts": selectedRequestorContacts,
				"counterpartyContacts": selectedCounterpartyContacts,
				"newCounterpartyContact": newCounterpartyContact
			}); 
			// E. close the parent form
				var showForm = '#' + thisRelationship + 'ContactList';
				$(showForm).show();
				var hideForm = '#' + thisRelationship + 'EditContactsForm';
				$(hideForm).hide();
			// Disable user controls
			disableControls ();
		});

		// This function allows the 'close account' confirmation modal to display.
		$('#closeAccountBtn').on('click', function() {
			$('#closeAccount').modal('show');
		});

	// Confirmation modal: User confirms request to close their account from the 'Edit profile' form.
		function confirmCloseAccountFormSubmit () {
//		$('#confirmCloseAccountBtn').on('click', function() {
			if ($('#confirmCloseAccountPasscode').val() !== "") {
				$('#closeAccount').modal('hide');
				GLOB.clientRef.push( {  
					"msgType" : "closeAccount",
					"passcode" : $('#confirmCloseAccountPasscode').val()
				}); 
				// close the parent form
				$('#profileFormContainer').toggleClass();
				// Disable user controls
				disableControls ();
			} else {
				return false;
			};
		};
