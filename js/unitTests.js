function unitTests() {
    var allTests = [
        //  A2. Walkthrough of the unit test with pauses. 
// Choice is offered to display 'narrative' messages as alerts or run without pauses via the console log.
// A1 or A2 is required to run the unit test.
            function() {
                descAlert = function() {};
                var alertstop = confirm("The unit test will pause at each step. To display test notes as alerts, click 'OK'. To display notes in the console, click 'Cancel'");
                if (alertstop == true)
                    descAlert = function( txt ) { alert (txt); }
                else {
                    descAlert = function( txt ) { console.log (txt); }
                };
            },
        // P0. 'Common branch' and unique identifier functions. 

 // Required to run the unit test.
            // Server pre-loads footer content to Firebase
                // Pre-load footer text
                // The server will write footer content to a common branch that's readable by all Trustjar clients. When the client loads, it will listen to this portion of the branch and populate the content for footer links with it. This also lets us update footer content through the server without altering the HTML code directly. Unlike other Firebase messages, footer content shouldn't expire. 
                // The test to confirm that the content properly populated the client is deferred to the test for the homepage template since the links aren't present until a page template is called.
                function() {
                    GLOB.footerRef.set({
                        help : {
                            copy:"data:text/html;charset=utf-8,<h3>HOW TO USE TRUSTJAR</h3><p>Formatted markup text with paragraphs.<p>Placeholder 'help' copy for the unit test."
                        },
                        privacy : {
                            copy:"data:text/html;charset=utf-8,<h3>PRIVACY POLICY</h3><p>Formatted markup text with paragraphs.<p>Placeholder 'privacy' copy for the unit test."
                        },
                        terms : {
                            copy:"data:text/html;charset=utf-8,<h3>CONDITIONS AND TERMS OF SERVICE</h3><p>Formatted markup text with paragraphs.<p>Placeholder 'terms' copy for the unit test."
                        },
                        contact : {
                            copy:"data:text/html;charset=utf-8,<h3>CONTACT US</h3><p>Formatted markup text with paragraphs.<p>Placeholder 'contact' copy for the unit test."
                        }
                    })
                },
            // Client receives a unique ID
                // The server-generated unique ID will be used as the main branch for all client-server communications. The mechanism by which this will be delievered is TBD. For the time being, a unique ID is being hardcoded directly into the javascript file to provide a value on which the unit test and the Firebase data exchange model will be based. Refer to the 'Unique ID Placeholder' section of the trustjar.js file for the current source of this value.
        // P2. Capture a URL from the changePage function
            // This is a temporary element of the unit test to confirm that we can pass a URL to the changePage function and it will return a proper URL. We'll send a URL to the displayRef listener and confirm that it's stored in a global variable, GLOB.goToNewURL.
            // Server sends command to open home page template
                function() {
                    descAlert( "This test confirms that the server can pass an external URL to Firebase that's read to the client and changes to the external URL accordingly. For now, the test merely confirms that the client receives and properly processes the URL." );
                    // Server sends a message to Firebase to change page and populate data
                        GLOB.displayRef.set({
                            thisPage:"URL:http://anotherHTMLPage.com"
                        })
                    // Allow time for Firebase
                        return( 10 );
                },
                function() {
                    // Confirm that the 'home' div is open. GLOB.goToNewURL is a temporary variable in the client.
                        if (GLOB.goToNewURL !== 'http://anotherHTMLPage.com') {
                            alert(
                                "Error: The page display function did not return a proper URL."
                            );
                            return( -1 );
                        }
                },
        // P6. counterpartyLanding page templates
            // Create an initialization function
                GLOB.initializeCounterpartyLanding = function() {
                    // Initialize the counterpartyLanding page. We need this function because we need to clear all dynamic content to test our landing page variations. We'll call this with each successive counterparty landing page we test.
                    // Hide any instance of the counterpartyLandingForm that is being displayed
                    $(".clf").addClass("hidden");
                    // Clear the landing page data from Firebase
                    GLOB.counterpartyLandingPageDataRef.remove();
                    // Clear all possible elements that may have been populated with page data
                    $(".cplCopy").html('');
                    $("#counterpartyLandingCasualContent").addClass("hidden");
                    $("#counterpartyLandingCasualContent2").addClass("hidden");
                    // Change to a placeholder (blank) page. 
                    GLOB.displayRef.set({thisPage : "blank"})
                },
            // Server populates and displays the counterpartyLanding template
                function() {
                    descAlert( "This is the unit test for the counterpartyLanding page. This page has four possible form variations, which are treated as their own page subcomponents. Let's populate the page data using form 1 (page data is required to display the page) and confirm that the page and its primary components (form type, requestor contact, relationship type, and counterparty contact) display properly." );
                    // Populate and displays the template
                        GLOB.counterpartyLandingPageDataRef.set({
                            counterpartyLandingForm: "1",
                            requestorName:"Alana Aaron",
                            requestorContacts:"aaaron@gmail.com, 445-667-8901",
                            relationshipType:"casual",
                            newCounterpartyContact:"bobbyb@gmail.com",
                        })
                        GLOB.displayRef.set({
                            thisPage:"counterpartyLanding",
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'counterpartyLanding' template is displayed
                        if ( $('#counterpartyLanding').css('display') !== 'block') {
                            alert(
                                "Error: The 'counterpartyLanding' template should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm that the 'counterpartyLanding1' form is displayed.
                        if ( $('#counterpartyLandingForm1').css('display') !== 'block') {
                            alert(
                                "Error:  'counterpartyLandingForm1' should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm the requestor's contact is displayed properly in the relationship
                        var requestorContact = $("#counterpartyLandingRequestor").html();
                        var expectedRequestorContact ="aaaron@gmail.com<br> 445-667-8901";
                        if ( requestorContact !== expectedRequestorContact ) {
                            alert(
                                "Expecting text: [" +
                                expectedRequestorContact +
                                "]. Got text: ["+
                                requestorContact +
                                "]"
                            );
                            return( -1 );
                        };
                    // confirm the relationship type
                        var relationshipType = $("#counterpartyLandingRelationshipType1").html();
                        var expectedrelationshipType ="casual";
                        if ( relationshipType !== expectedrelationshipType ) {
                            alert(
                                "Expecting text: [" +
                                expectedrelationshipType +
                                "]. Got text: ["+
                                relationshipType +
                                "]"
                            );
                            return( -1 );
                        };
                    // confirm the page copy reflects a casual relationship
                        if ( $('#counterpartyLandingCasualContent').css('display') !== 'inline') {
                            alert(
                                "Error: #counterpartyLandingCasualContent should be displayed."
                            );
                            return( -1 );
                        };
                        if ( $('#counterpartyLandingCasualContent2').css('display') !== 'inline') {
                            alert(
                                "Error: #counterpartyLandingCasualContent should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm the counterparty contact. This not only confirms that multiple contacts are displayed, but that the target contact point is highlighted (in this case, bold.) We'll also confirm that the counterparty contact appears properly where it appears contextually in each acceptance form module, but we'll do that as we test each of the four forms.
                        var counterpartyContact = $("#counterpartyLandingContact").html();
                        var expectedCounterpartyContact ="bobbyb@gmail.com";
                        if ( counterpartyContact !== expectedCounterpartyContact ) {
                            alert(
                                "Expecting text: [" +
                                expectedCounterpartyContact +
                                "]. Got text: ["+
                                counterpartyContact +
                                "]"
                            );
                            return( -1 );
                        };
                },
            // counterpartyLanding 2 form A: Add a new contact point to an existing account
                // Populate and display counterpartyLanding2 form
                    function() {
                        descAlert( "The cancel request was sent to Firebase at the specified location (fromClient) and user controls were disabled. Let's enable the controls and test  counterpartyLandingForm2. This is the 'anonymous' form in which the counterparty's contact is not currently registered with the system. We'll initialize the page, clear the Firebase messages associated with it, and simulate a server message to display form counterpartyLanding2 and confirm that it appears." );
                        // Reset the page template
                            GLOB.initializeCounterpartyLanding();
                        // Add a delay to allow the display to update
                            return( 1000 );
                    },
                    function() {
                        // Populate the page data. In this case, there's one datum that's unique to this form so we'll separate it from the generic page data function with a separate function.
                            GLOB.counterpartyLandingPageDataRef.set({
                                counterpartyLandingForm: "2",
                                requestorName:"Alana Aaron",
                                requestorContacts:"aaaron@gmail.com, 445-667-8901",
                                relationshipType:"casual",
                                newCounterpartyContact:"bobbyb@gmail.com",
                            })
                            // Additional data required specifically for counterpartyLanding2 form
                            GLOB.counterpartyLanding2PageDataRef.set({
                                newCounterpartyPasscode: "cp22222222"
                            })
                            GLOB.displayRef.set({
                                thisPage:"counterpartyLanding",
                            })
                        // Add a delay to allow the display to update
                            return( 1000 );
                    },
                    function() {
                        // confirm that the 'counterpartyLanding2' form is displayed.
                            if ( $('#counterpartyLandingForm2').css('display') !== 'block') {
                                alert(
                                    "Error:  'counterpartyLandingForm2' should be displayed."
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        // confirm that the counterparty contact appears properly in the acceptance form copy
                            var counterpartyContact = $("#counterpartyLandingContact3").html();
                            var expectedCounterpartyContact ="bobbyb@gmail.com";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                            var counterpartyContact = $("#counterpartyLandingContact4").html();
                            var expectedCounterpartyContact ="bobbyb@gmail.com";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                // Counterparty selects and submits form 2a
                    function() {
                        descAlert( "CounterpartyLanding2 was properly populated and displayed. It's actually two forms (2a and 2b), with the user self-selecting which form to use. Let's test form 2a by clicking on the 'Yes' radio button and confirming that 2a is displayed." );
                        // User selects the 'Yes' radio button
                            $("#counterpartyLanding2Yes").click();
                        // Allow time for element refresh
                            return( 10 );
                    },
                    function() {
                        // Confirm the proper counterpartyLanding form (counterpartyLanding2a) appears
                            if ( $('#counterpartyLandingForm2a').css('display') !== 'block') {
                                alert(
                                    "Error: counterpartyLandingForm2a should be displayed."
                                );
                                return( -1 );
                            };
                            if ( $('#counterpartyLanding2b').css('display') == 'block') {
                                alert(
                                    "Error: The 'counterpartyLanding2b' form should not be displayed."
                                );
                                return( -1 );
                            };
                        descAlert( "The 'Yes' radio button was clicked and the proper form appeared. Let's populate the form with a passcode, select the terms of service checkbox and click 'Approve this request', and then confirm that the message containing the form data was received by Firebase." );
                        // User enters the 'existing user' passcode.
                            $( "#counterpartyLanding2aPasscode" ).val( "L2Apasscode" );
                        // User selects the 'terms and conditions' checkbox.
                            $( "#counterpartyLanding2aTOSCheckbox" ).prop( "checked", true );
                        // Submit the request form
                            $( "#counterpartyLanding2aSubmitBtn" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding1 form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.msgType = "";
                            GLOB.counterpartyLanding2aRefPasscodeCheck = "";
                            GLOB.counterpartyLanding2aExistingCounterpartyPasscodeCheck = "";
                            GLOB.counterpartyLanding2aTOSCheckboxCheck = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding2aFormRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding2aFormRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.msgType = val.msgType;
                                GLOB.counterpartyLanding2aExistingCounterpartyPasscodeCheck = val.counterpartyPasscode;
                                GLOB.counterpartyLanding2aTOSCheckboxCheck = val.TOSCheckbox;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding2aFormRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the reference passcode, the current user passcode and the TOS confirmation were received by Firebase
                            if (GLOB.msgType !== "counterpartyLandingForm2a") {
                                alert(
                                    "Expecting 'counterpartyLandingForm2a'. Got: " + 
                                    GLOB.msgType + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding2aExistingCounterpartyPasscodeCheck !== 'L2Apasscode') {
                                alert(
                                    "Expecting 'L2Apasscode'. Got: " + 
                                    GLOB.counterpartyLanding2aExistingCounterpartyPasscodeCheck + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding2aTOSCheckboxCheck !== true) {
                                alert(
                                    "The terms of service checkbox confirmation was not received by Firebase"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                        descAlert( "The 'counterpartyLanding2a' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. Let's enable the controls and click the cancel button, and confirm that a confirmation dialog appears." );
                        // Enable controls
                            enableControls();
                        // Allow time for the overlay to disappear
                            return( 700 );
                    },
                // Counterparty cancels request
                    function() {
                        // Click the 'cancel' button
                            $( "#counterpartyLanding2aCancelBtn" ).click();
                        // Allow time for the dialog to open
                            return( 700 );
                    },
                    function() {
                        // Confirm that the confirmation dialog is displayed
                            if ($("#cancelRelationshipOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: The 'cancel request' confirmation dialog' should be displayed."
                                );
                                return( -1 );
                            };
                        descAlert( "The confirmation dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
                        // Submit the request form
                            $( "#modalCancelRequest" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the value stored for the counterpartyCancel message in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.msgType = "";
                            GLOB.counterpartyLanding2aCancel = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding2aCancelRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding2aCancelRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.counterpartyLanding2aCancel = val.msgType;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding2aCancelRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the request form data was received by Firebase
                            if (GLOB.counterpartyLanding2aCancel !== 'cancelRelationshipRequest') {
                                alert(
                                    "Expecting text: 'cancelRelationshipRequest'. Got text: '" +
                                    GLOB.counterpartyLanding2aCancel +
                                    "'"
                                );
                                return( -1 );
                            };
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The cancel button sent the proper message to Firebase, so let's enable controls and proceed to counterpartyLanding Page 2b. This form appears when the user says 'No' to the question, 'Do you already have a Trustjar account?' So let's select that radio button and confirm that the form appears properly." );
                        // Enable controls
                            enableControls();
                        // Allow time for the overlay to disappear
                            return( 700 );
                    },
            // counterpartyLanding 2 form B: New user
                // Counterparty selects and submits form 2b
                    function() {
                        // User selects the 'No' radio button
                            $("#counterpartyLanding2No").click();
                        // Allow time for element refresh
                            return( 10 );
                    },
                    function() {
                        // Confirm the proper counterpartyLanding form (counterpartyLanding2a) appears
                            if ( $('#counterpartyLandingForm2a').css('display') == 'block') {
                                alert(
                                    "Error: The 'counterpartyLanding2a' form should not be displayed."
                                );
                                return( -1 );
                            };
                            if ( $('#counterpartyLandingForm2b').css('display') !== 'block') {
                                alert(
                                    "Error: The 'counterpartyLanding2b' form should be displayed."
                                );
                                return( -1 );
                            };
                        // confirm that the counterparty contact and the passcode appear properly in the acceptance form copy
                            var counterpartyContact = $("#counterpartyLandingContact5").html();
                            var expectedCounterpartyContact ="bobbyb@gmail.com";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                            var counterpartyContact = $("#counterpartyLanding2bPasscode").html();
                            var expectedCounterpartyContact ="cp22222222";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The 'No' radio button was clicked and the proper form appeared with the proper page data. Let's send the form and confirm that it's received by Firebase. We'll return the hardcoded passcode and the counterparty name with this form submission." );
                        // User enters the 'existing user' passcode.
                            $( "#counterpartyLanding2bName" ).val( "Bobby Brown" );
                        // User selects the 'terms and conditions' checkbox.
                            $( "#counterpartyLanding2bTOSCheckbox" ).prop( "checked", true );
                        // Submit the request form
                            $( "#counterpartyLanding2bSubmitBtn" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding2b form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.msgType = "";
                            GLOB.counterpartyLanding2bNameCheck = "";
                            GLOB.counterpartyLanding2bCheckboxCheck = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding2bFormRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding2bFormRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.msgType = val.msgType;
                                GLOB.counterpartyLanding2bNameCheck = val.counterpartyName;
                                GLOB.counterpartyLanding2bCheckboxCheck = val.TOS;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding2bFormRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the request form data was received by Firebase
                            if (GLOB.msgType !== "counterpartyLandingForm2b") {
                                alert(
                                    "Expecting 'counterpartyLandingForm2b'. Got: " + 
                                    GLOB.msgType + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding2bNameCheck !== 'Bobby Brown') {
                                alert(
                                    "Expecting 'Bobby Brown'. Got: " + 
                                    GLOB.counterpartyLanding2bNameCheck + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding2bCheckboxCheck == false) {
                                alert(
                                    "Expecting 'true' (terms and conditions checkbox checked). Got: " + 
                                    GLOB.counterpartyLanding2bCheckboxCheck + 
                                    "." 
                                );
                                return( -1 );
                            };
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                    },
                // Counterparty cancels request
                    function() {
                        descAlert( "The 'counterpartyLanding2b' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. Let's enable the controls and click the cancel button, and confirm that it opens a confirmation dialog." );
                        // Enable controls
                            enableControls();
                        // Click the 'cancel' button
                            $( "#counterpartyLanding2bCancelBtn" ).click();
                        // Allow time for the dialog to open
                            return( 700 );
                    },
                    function() {
                        // Confirm that the confirmation dialog is displayed
                            if ($("#cancelRelationshipOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: The 'cancel request' confirmation dialog' should be displayed."
                                );
                                return( -1 );
                            };
                        descAlert( "The confirmation dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
                        // Submit the request form
                            $( "#modalCancelRequest" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding2 form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.counterpartyLanding2bCancel = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding2bCancelRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding2bCancelRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.counterpartyLanding2bCancel = val.msgType;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding2bCancelRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the request form data was received by Firebase
                            if (GLOB.counterpartyLanding2bCancel !== 'cancelRelationshipRequest') {
                                alert(
                                    "The 'cancel' request wasn't received by Firebase"
                                );
                                return( -1 );
                            };
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                    },
            // counterpartyLanding 3 form: Merge two profiles
                // Populate and display counterpartyLanding3 form
                    function() {
                        descAlert( "The confirmation sent the proper message to Firebase, so let's enable controls and proceed to counterpartyLanding form 3. This form appears when the system detects that two profiles would be merged when the relationship is confirmed, and no conflict would be created as a result. Let's initialize the page, clear the Firebase messages associated with it, and simulate a server message to display form counterpartyLanding3 and confirm that it appears." );
                        // Reset the page template
                            GLOB.initializeCounterpartyLanding();
                        // Add a delay to allow the display to update
                            return( 1000 );
                    },
                    function() {
                        GLOB.counterpartyLandingPageDataRef.set({
                            counterpartyLandingForm: "3",
                            requestorName:"Alana Aaron",
                            requestorContacts:"aaaron@gmail.com, 445-667-8901",
                            relationshipType:"casual",
                            newCounterpartyContact:"bobbyb@gmail.com",
                        })
                        GLOB.displayRef.set({
                            thisPage:"counterpartyLanding",
                        })
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // confirm that the 'counterpartyLanding3' form is displayed.
                            if ( $('#counterpartyLandingForm3').css('display') !== 'block') {
                                alert(
                                    "Error:  'counterpartyLandingForm3' should be displayed."
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        // confirm that the counterparty contact appears properly in the acceptance form copy
                            var counterpartyContact = $("#counterpartyLandingContact6").html();
                            var expectedCounterpartyContact ="bobbyb@gmail.com";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                            var counterpartyContact = $("#counterpartyLandingContact7").html();
                            var expectedCounterpartyContact ="bobbyb@gmail.com";
                            if ( counterpartyContact !== expectedCounterpartyContact ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedCounterpartyContact +
                                    "]. Got text: ["+
                                    counterpartyContact +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                // Counterparty submits registration information (name)
                    function() {
                        descAlert( "counterpartyLandingForm 3 appeared. Let's populate and submit the form with the 'existing user' passcode and the TOS checkbox checked and confirm that it's received by Firebase." );
                        // User enters the 'existing user' passcode.
                            $( "#counterpartyLanding3Passcode" ).val( "cp44444444" );
                        // User selects the 'terms and conditions' checkbox.
                            $( "#counterpartyLanding3TOSCheckbox" ).prop( "checked", true );
                        // Submit the request form
                            $( "#counterpartyLanding3SubmitBtn" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.msgType = "";
                            GLOB.counterpartyLanding3PasscodeCheck = "";
                            GLOB.counterpartyLanding3CheckboxCheck = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding3FormRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding3FormRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.msgType = val.msgType;
                                GLOB.counterpartyLanding3PasscodeCheck = val.counterpartyPasscode;
                                GLOB.counterpartyLanding3CheckboxCheck = val.TOSCheckbox;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding3FormRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the request form data was received by Firebase
                            if (GLOB.msgType !== "counterpartyLandingForm3") {
                                alert(
                                    "Expecting 'counterpartyLandingForm3'. Got: " + 
                                    GLOB.msgType + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding3PasscodeCheck !== 'cp44444444') {
                                alert(
                                    "Expecting 'cp44444444'. Got: " + 
                                    GLOB.counterpartyLanding3NameCheck + 
                                    "." 
                                );
                                return( -1 );
                            };
                            if (GLOB.counterpartyLanding3CheckboxCheck == false) {
                                alert(
                                    "Expecting 'true' (terms and conditions checkbox checked). Got: " + 
                                    GLOB.counterpartyLanding3CheckboxCheck + 
                                    "." 
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                        descAlert( "The 'counterpartyLanding3' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. Let's click the cancel button and confirm that it opens a confirmation dialog." );
                    },
                // Counterparty cancels request
                    function() {
                        // Enable controls
                            enableControls();
                        // Click the 'cancel' button
                            $( "#counterpartyLanding3CancelBtn" ).click();
                        // Allow time for the dialog to open
                            return( 700 );
                    },
                    function() {
                        // Confirm that the confirmation dialog is displayed
                            if ($("#cancelRelationshipOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: The 'cancel request' confirmation dialog' should be displayed."
                                );
                                return( -1 );
                            };
                        descAlert( "The confirmation dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
                        // Submit the request form
                            $( "#modalCancelRequest" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding2 form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.counterpartyLanding3Cancel = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding3CancelRef = new Firebase('https://trustjar.firebaseio.com//sessions/fromClient/UID12345' );
                            checkcounterpartyLanding3CancelRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.counterpartyLanding3Cancel = val.msgType;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding3CancelRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the request form data was received by Firebase
                            if (GLOB.counterpartyLanding3Cancel !== 'cancelRelationshipRequest') {
                                alert(
                                    "The 'cancel' request wasn't received by Firebase"
                                );
                                return( -1 );
                            };
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                    },
            // counterpartyLanding 4 form: Conflict
                function() {
                    descAlert( "The 'counterpartyLanding3' form cancellation was sent to Firebase at the specified location (fromClient) and user controls were disabled. Let's enable the controls and proceed to counterpartyLanding Page 4. This is the 'conflict' version. It's not actually a form since the user can't respond to it." );
                    // Reset the page template
                        GLOB.initializeCounterpartyLanding();
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // Enable controls
                        enableControls();
                    // Populate and display the counterpartyLanding4 page component
                        GLOB.counterpartyLandingPageDataRef.set({
                            counterpartyLandingForm: "4",
                            requestorName:"Alana Aaron",
                            requestorContacts:"aaaron@gmail.com, 445-667-8901",
                            relationshipType:"casual",
                            newCounterpartyContact:"bobbyb@gmail.com",
                        })
                        GLOB.displayRef.set({
                            thisPage:"counterpartyLanding",
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'counterpartyLanding4' form is displayed and that no other variants of the form are displayed.
                        if ( $('#counterpartyLandingForm4').css('display') !== 'block') {
                            alert(
                                "Error:  'counterpartyLandingForm4' should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm that the counterparty contact appears properly in the acceptance form copy
                        var counterpartyContact = $("#counterpartyLandingContact8").html();
                        var expectedCounterpartyContact ="bobbyb@gmail.com";
                        if ( counterpartyContact !== expectedCounterpartyContact ) {
                            alert(
                                "Expecting text: [" +
                                expectedCounterpartyContact +
                                "]. Got text: ["+
                                counterpartyContact +
                                "]"
                            );
                            return( -1 );
                        };
                        var counterpartyContact = $("#counterpartyLandingContact9").html();
                        var expectedCounterpartyContact ="bobbyb@gmail.com";
                        if ( counterpartyContact !== expectedCounterpartyContact ) {
                            alert(
                                "Expecting text: [" +
                                expectedCounterpartyContact +
                                "]. Got text: ["+
                                counterpartyContact +
                                "]"
                            );
                            return( -1 );
                        };
                        var conflictId = $("#counterpartyLandingContact9").html();
                        var expectedConflictId ="bobbyb@gmail.com";
                        if ( conflictId !== expectedConflictId ) {
                            alert(
                                "Expecting text: [" +
                                expectedConflictId +
                                "]. Got text: ["+
                                conflictId +
                                "]"
                            );
                            return( -1 );
                        };
                    descAlert( "The page with the conflict text displayed properly. This concludes the unit test of the counterpartyLanding page template." );
                },
        // Z. End of test. This should always be the last component in the allTests array.
            function() {
                $('body').append("<div data-role='popup' class='unit-test-end' id='testComplete'><b>Test complete!</b><br><br><a href='#' id='resetButton' onClick='$(testComplete).hide(); initializeUnitTest()' data-role='button' style='font-size:18px; text-align: center;'>Reset the interface</a><br><a href='#' id='resetButton' onClick='$(testComplete).hide()' data-role='button' style='font-size:18px; text-align: center;'>Close this notice</a></div>");
            }
    ];
    runAllTests( allTests, 0, allTests.length );
}
