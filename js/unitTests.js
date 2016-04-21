function unitTests() {
    var allTests = [
        //  A1. Walkthrough of the unit test.
            function() {
                descAlert = function() {};
                var alertstop = confirm("To pause the unit test at each step with notes, click 'OK'. To run without pauses and display notes in the console, click 'Cancel'");
                if (alertstop == true)
                    descAlert = function( txt ) { alert (txt); }
                else {
                    descAlert = function( txt ) { console.log (txt) }
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
        // P1. Global page components 

 // Must be run before the 'home' section of the unit test
            // The reason we need to run this before we run the Home page template test is that the logo link in the header (which ultimately links to the homepage) is disabled with the user is actually on the homepage.
            // Set a blank page template
                function() {
                    descAlert( "Let's test the generic page components. These are elements that are always the same regardless of which page is displayed. There is only one instance of them in the code, and they display independently of any one page, so we only need to test them once. To do this, we'll load a blank page template, which will allow these page components to appear: header, footer, and an instructional element." );
                    // Server populates confirmation page data and displays template.
                        GLOB.displayRef.set({
                            thisPage:"blank",
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
            // Confirm display of header / footer and 'What is Trustjar' element
                function() {
                    // Confirm that the header is displayed. 
                        if ( $('.anonHeader').css('display') !== 'block') {
                            alert(
                                "Error: The site header should be displayed."
                            );
                            return( -1 );
                        }
                    // Confirm that the footer is displayed
                        if ( $('.footer').css('display') !== 'block') {
                            alert(
                                "Error: The site footer should be displayed."
                            );
                            return( -1 );
                        }
                    // Confirm that the 'What is trustjar?' collapsible element is displayed
                        if ( $('#whatIsTrustjar').css('display') !== 'inline') {
                            alert(
                                "Error: The 'what is Trustjar?' copy element should be displayed."
                            );
                            return( -1 );
                        }
                },
            // Header: Click the logo
                // The logo is clickable to send a request message to Firebase to send the user to the Home page.
                function() {
                    descAlert( "The elements appeared properly. Let's click the logo in the header to confirm that it sends a message to Firebase and activates the 'disable controls' overlay. The message is a request to return the user to the home page." );
                    // Click the logo
                        $( "#headerLogoLink" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the request form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkhomeRequestRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkhomeRequestRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                        // Turn the listener off after retrieving the data
                            checkhomeRequestRef.off();
                        });
                },
                function() {
                    // Confirm that the registration form data was received by Firebase
                        if (GLOB.msgType !== "returnToHomepage") {
                            alert(
                                "Expecting 'returnToHomepage'. Got: " + 
                                GLOB.msgType + 
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
            // Header: User logs in
                function() {
                    descAlert( "The 'return to the homepage' message was received by Firebase. Let's remove the overlay and populate the login form fields in the header: user contact (login ID) and password, and submit. When the form is submitted, the data will be sent to Firebase at the specified location (fromClient) and user controls will be disabled." );
                    // Remove the overlay to proceed with the test
                        enableControls ();
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // Populate the form fields and click submit
                        $('#loginId').val('registereduser@gmail.com'); 
                        $('#loginPasscode').val('myPassword1'); 
                    // Submit the request form
                        $( "#loginBtn" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the request form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        GLOB.loginUserId = "";
                        GLOB.loginPasscode = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkhomeRequestRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkhomeRequestRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                            GLOB.loginUserId = val.loginId;
                            GLOB.loginPasscode = val.passcode;
                        // Turn the listener off after retrieving the data
                            checkhomeRequestRef.off();
                        });
                },
                function() {
                    // Confirm that the registration form data was received by Firebase
                        if (GLOB.msgType !== "loginForm") {
                            alert(
                                "Expecting 'loginForm'. Got: " + 
                                GLOB.msgType + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.loginUserId !== "registereduser@gmail.com") {
                            alert(
                                "Expecting 'registereduser@gmail.com'. Got: '" + 
                                GLOB.loginUserId + 
                                "'." 
                            );
                            return( -1 );
                        };
                        if (GLOB.loginPasscode !== "myPassword1") {
                            alert(
                                "Expecting 'myPassword1'. Got: '" + 
                                GLOB.loginPasscode + 
                                "'." 
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
            // 'technical difficulties' alert
                // Confirm 'delay' message appears after X seconds. For the unit test, we'll use four seconds, which should insure that it's not triggered during any other part of the unit test. Then we can set a five-second interval to test that the message appears over the overlay that disables controls. The final delay interval should be set in the jQuery code during production. A 30-second interval is recommended.
                function() {
                    descAlert( "The login form correctly sent login ID, password and checkbox status to Firebase, and disabled controls. This gives us an opportunity to test that the 'technical difficulties' alert element works. This appears automatically when the client hasn't received a response from the server after X seconds. For the unit test we've set it to appear after 4 seconds, so we'll delay 5 seconds and confirm that the 'technical difficulties' alert element appears." );
                    // Delay five seconds
                        return (5000);
                },
                function() {
                    // Confirm that the 'technical difficulties' message appears
                        if ( $('#technicalDifficulties').css('display') !== 'block') {
                            alert(
                                "Error: The 'technical difficulties' alert should be displayed."
                            );
                            return( -1 );
                        }
                },
                function() {
                    descAlert( "The 'technical difficulties' alert appeared. Let's restore the controls and confirm that the tech difficulty overlay was removed when controls were restored." );
                    // Remove the overlay to proceed with the test
                        enableControls ();
                    // Clear the registration form (so it's not populated for the rest of the test)
                        $('#loginId').val(''); 
                        $('#loginPasscode').val(''); 
                    // Add a slight delay to allow for display update
                        return( 1000 );
                },
                function() {
                    // Confirm that the 'delay' message and the overlay are removed
                        if ( $('#technicalDifficulties').css('display') == 'block') {
                            alert(
                                "Error: The 'technical difficulties' alert should not be displayed."
                            );
                            return( -1 );
                        }
                },
            // Confirm server alert presentation
                function() {
                    descAlert( "The technical difficulties overlay was removed. Let's test the server alert function. We'll simulate a server-generated 'alert' message to Firebase and confirm that the alert displays properly." );
                    // Server populates page data. In this case we'll use this to test the server alert space, since there's no other page data.
                        GLOB.serverAlertRef.set({
                            serverAlertText:"[server-generated message]",
                        })
                    // Allow time for page transition
                        return( 700 );
                },
                function() {
                    // Confirm that the server alert text appeared
                        if ( $('#serverAlertContainer').css('visibility') !== 'visible') {
                            alert(
                                "Error: The server alert space should be visible."
                            );
                            return( -1 );
                        }
                        var noticeContent = $('#serverAlertContainer').html()
                        var expectedNoticeContent ="[server-generated message]";
                        if ( noticeContent !== expectedNoticeContent ) {
                            alert(
                                "Expecting text: '" +
                                expectedNoticeContent +
                                "'. Got text: '"+
                                noticeContent +
                                "'"
                            );
                            return( -1 );
                        };
                },
            // Remove server alert
                function() {
                    descAlert( "The server alert message was properly displayed. Let's test that we can close the server alert. We'll change the content of the serverAlertText to an empty string (''), which should remove the text and hide the alert." );
                    // Set server alert text to an empty string
                        GLOB.serverAlertRef.set({
                            serverAlertText:"",
                        })
                    // Allow time for page transition
                        return( 700 );
                },
                function() {
                    // Confirm that the server alert and text were removed
                        if ( $('#serverAlertContainer').css('visibility') !== 'hidden') {
                            alert(
                                "Error: The server alert space should be hidden."
                            );
                            return( -1 );
                        }
                        var noticeContent = $('#serverAlertContainer').html()
                        var expectedNoticeContent ="";
                        if ( noticeContent !== expectedNoticeContent ) {
                            alert(
                                "Expecting text: '" +
                                expectedNoticeContent +
                                "'. Got text: '"+
                                noticeContent +
                                "'"
                            );
                            return( -1 );
                        };
                },
            // Test the footer links
                // Test that the footer links work.
                // Help link
                    function() {
                        descAlert( "The server alert message was removed. Let's test that the footer links work. We'll start with the help link. This should open an overlay in the page containing help content." );
                        // Click the 'Help' link
                            $( "#helpLink" ).click();
                        // Allow time for overlay to fade in
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the overlay container is open
                            if ($("#footerOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: Help overlay should be visible."
                                );
                                return( -1 );
                            };
                        // Confirm that the overlay header displays the correct label
                            if ($("#modalHeader").html() !== 'trustjar Help') {
                                alert(
                                    "Expecting 'trustjar Help'. Got: " + 
                                    $("#modalHeader").html() + 
                                    "." 
                                );
                                return( -1 );
                            };
                        // confirm the overlay body displays the correct content
                            var content = $("#modalBody").html();
                            var expectedContent ="<h3>HOW TO USE TRUSTJAR</h3><p>Formatted markup text with paragraphs.</p><p>Placeholder 'help' copy for the unit test.</p>";
                            if ( content !== expectedContent ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedContent +
                                    "]. Got text: ["+
                                    content +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The 'Help' link opened the overlay and populated the header and overlay body with the proper Help content. Let's close the overlay and test the 'Privacy policy' link." );
                        // close the overlay
                            $("#modalClose").click();
                        // Allow time for overlay to fade out
                            return( 1000 );
                    },
                // Privacy policy link
                    function() {
                        // Click the 'Privacy policy' link
                            $( "#privacyLink" ).click();
                        // Allow time for overlay to fade in
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the overlay container is open
                            if ($("#footerOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: Privacy overlay should be visible."
                                );
                                return( -1 );
                            };
                        // Confirm that the overlay header displays the correct label
                            if ($("#modalHeader").html() !== 'trustjar Privacy Policy') {
                                alert(
                                    "Expecting 'trustjar Privacy policy'. Got: " + 
                                    $("#modalHeader").html() + 
                                    "." 
                                );
                                return( -1 );
                            };
                        // confirm the overlay body displays the correct content
                            var content = $("#modalBody").html();
                            var expectedContent ="<h3>PRIVACY POLICY</h3><p>Formatted markup text with paragraphs.</p><p>Placeholder 'privacy' copy for the unit test.</p>";
                            if ( content !== expectedContent ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedContent +
                                    "]. Got text: ["+
                                    content +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The 'Privacy' link opened the overlay and populated the header and overlay body with the proper 'Privacy policy' content. Let's close the overlay and test the 'Terms and conditions' link." );
                        // close the overlay
                            $("#modalClose").click();
                        // Allow time for overlay to fade out
                            return( 1000 );
                    },
                // Terms and conditions link
                    function() {
                        // Click the 'Terms and conditions' link
                            $( "#termsLink" ).click();
                        // Allow time for overlay to fade in
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the overlay container is open
                            if ($("#footerOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: Terms and conditions overlay should be visible."
                                );
                                return( -1 );
                            };
                        // Confirm that the overlay header displays the correct label
                            if ($("#modalHeader").html() !== 'trustjar Terms and Conditions') {
                                alert(
                                    "Expecting 'trustjar Terms and Conditions'. Got: " + 
                                    $("#modalHeader").html() + 
                                    "." 
                                );
                                return( -1 );
                            };
                        // confirm the overlay body displays the correct content
                            var content = $("#modalBody").html();
                            var expectedContent ="<h3>CONDITIONS AND TERMS OF SERVICE</h3><p>Formatted markup text with paragraphs.</p><p>Placeholder 'terms' copy for the unit test.</p>";
                            if ( content !== expectedContent ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedContent +
                                    "]. Got text: ["+
                                    content +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The 'Terms and conditions' link opened the overlay and populated the header and overlay body with the proper Help content. Let's close the overlay and test the 'Contact us' link." );
                        // close the overlay
                            $("#modalClose").click();
                        // Allow time for overlay to fade out
                            return( 1000 );
                    },
                // 'Contact us' link
                    function() {
                        // Click the 'Contact us' link
                            $( "#contactLink" ).click();
                        // Allow time for overlay to fade in
                            return( 1000 );
                    },
                    function() {
                        // Confirm that the overlay container is open
                            if ($("#footerOverlay").data()['bs.modal'].isShown !== true) {
                                alert(
                                    "Error: 'Contact us' overlay should be visible."
                                );
                                return( -1 );
                            };
                        // Confirm that the overlay header displays the correct label
                            if ($("#modalHeader").html() !== 'Contact trustjar') {
                                alert(
                                    "Expecting 'Contact trustjar'. Got: " + 
                                    $("#modalHeader").html() + 
                                    "." 
                                );
                                return( -1 );
                            };
                        // confirm the overlay body displays the correct content
                            var content = $("#modalBody").html();
                            var expectedContent ="<h3>CONTACT US</h3><p>Formatted markup text with paragraphs.</p><p>Placeholder 'contact' copy for the unit test.</p>";
                            if ( content !== expectedContent ) {
                                alert(
                                    "Expecting text: [" +
                                    expectedContent +
                                    "]. Got text: ["+
                                    content +
                                    "]"
                                );
                                return( -1 );
                            };
                    },
                    function() {
                        descAlert( "The 'Contact us' link opened the overlay and populated the header and overlay body with the proper Help content. Let's close the overlay and continue with the unit test." );
                        // close the overlay
                            $("#modalClose").click();
                        // Allow time for overlay to fade out
                            return( 1000 );
                    },
        // P2. 'Home' page template
            // This is the unit test for the home page template. This is where a user lands when they navigate to trustjar.com in their browser. Since we're going to require the user to enter login credentials each time they visit, all users will default to this page template.
            // Server sends command to open home page template
                function() {
                    descAlert( "This is the unit test for the home page template. When a user comes to the default site URL, we direct them to this page template. So let's simulate a server message to Firebase for this purpose and confirm that the client responds by displaying the home page template. We'll also confirm that the header link in the logo is disabled, since it would be redundant." );
                    // Server sends a message to Firebase to change page and populate data
                        GLOB.displayRef.set({
                            thisPage:"home"
                        })
                    // Allow time for page transition
                        return( 700 );
                },
                function() {
                    // Confirm that the 'home' div is open
                        if ( $('#home').css('display') !== 'block') {
                            alert(
                                "Error: The home template should be displayed."
                            );
                            return( -1 );
                        }
                },
                function() {
                    // Confirm that the 'home' link in the header logo is disabled
                        // The server controls the page state to ensure that it's in sync with the client. So when a 'return to Home' link is clicked, for example, it sends a message to Firebase requesting that the page display be changed to 'Home'. The logo is generally clickable for this purpose per standard practices, so we want to disable it on the homepage itself. Let's confirm that when we're on the Homepage, the logo link is disabled.
                        if ( $('#headerLogoLink').html() == '<a href="#" id="headerLogoLink" class="logotype goHome">trustjar</a>') {
                            alert(
                                "Error: The header logo link should be disabled."
                            );
                            return( -1 );
                        }
                },
            // Anonymous user submits request form
                function() {
                    descAlert( "The home page template was displayed and the header link was disabled. Let's populate the form in the body of the home page and click the submit button. When the form is submitted, the data will be sent to Firebase at the specified location (home) and user controls will be disabled." );
                    // Populate the form fields and click submit
                        $('#homeUserContact').val('aaaron@gmail.com'); 
                        $('#homeCounterpartyContact').val('123-456-7890'); 
                        $( "#homeCasual" ).click();
                    // Submit the request form
                        $( "#homeRequestSubmitBtn" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the request form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        GLOB.homeRequestUserContact = "";
                        GLOB.homeRequestRelationshipType = "";
                        GLOB.homeRequestCounterpartyContact = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkhomeRequestRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkhomeRequestRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                            GLOB.homeRequestUserContact = val.userContact;
                            GLOB.homeRequestRelationshipType = val.relationshipType;
                            GLOB.homeRequestCounterpartyContact = val.counterpartyContact;
                        // Turn the listener off after retrieving the data
                            checkhomeRequestRef.off();
                        });
                },
                function() {
                    // Confirm that the request form data was received by Firebase
                        if (GLOB.msgType !== "newRequestorForm") {
                            alert(
                                "Expecting 'newRequestorForm'. Got: " + 
                                GLOB.msgType + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.homeRequestUserContact !== "aaaron@gmail.com") {
                            alert(
                                "Expecting 'aaaron@gmail.com'. Got: " + 
                                GLOB.homeRequestUserContact + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.homeRequestRelationshipType !== "Casual") {
                            alert(
                                "Expecting 'Casual'. Got: " + 
                                GLOB.homeRequestRelationshipType + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.homeRequestCounterpartyContact !== "123-456-7890") {
                            alert(
                                "Expecting '123-456-7890'. Got: " + 
                                GLOB.homeRequestCounterpartyContact + 
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
                function() {
                    descAlert( "User controls were disabled and the request form data (message type, user contact, relationship type and counterparty contact) was sent to Firebase at the specified location. The server follows this with a confirmation message telling the user to follow the link in the email or text sent to the contact they provided. This ends the test of the Home page template." );
                    // Remove the 'disable controls' overlay
                        enableControls ();
                },
        // P3. Retrieve passcode
            // Client sends request to open 'retrieve passcode' page template
                function() {
                    descAlert( "This is the unit test for the 'retrieve passcode' template. The user accesses this from a link in the header so let's click the link and confirm that the client sends a message to Firebase requesting the page and disables user controls." );
                    // Click the 'retrieve passcode' link in the header
                        $( "#retrievePasscodeLink" ).click();
                    // Allow time for Firebase to receive the message
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the request form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkRetrievePasscodeRequestRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkRetrievePasscodeRequestRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                        // Turn the listener off after retrieving the data
                            checkRetrievePasscodeRequestRef.off();
                        });
                    // Allow time for Firebase to receive the message
                        return( 10 );
                },
                function() {
                    // Confirm that the request form data was received by Firebase
                        if (GLOB.msgType !== "retrievePasscodeRequest") {
                            alert(
                                "Expecting 'retrievePasscodeRequest'. Got: " + 
                                GLOB.msgType + 
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
            // Server sends command to open 'retrieve passcode' page template
                function() {
                    descAlert( "The client request was successfully sent to Firebase. The server response is to return a message telling the client to open the 'Retrieve Passcode' page template. Let's simulate this message and confirm that the page template appears." );
                    // Server sends a message to Firebase to change page and populate data
                        GLOB.displayRef.set({
                            thisPage:"retrievePasscode"
                        })
                    // Allow time for page transition
                        return( 700 );
                },
                function() {
                    // Confirm that the 'retrieve passcode' div is open
                        if ( $('#retrievePasscode').css('display') !== 'block') {
                            alert(
                                "Error: The 'retrieve passcode template should be displayed."
                            );
                            return( -1 );
                        }
                },
            // Anonymous user submits 'recover password' form
                function() {
                    descAlert( "The 'retrieve passcode' page template was displayed. Let's populate the form in the body of the page and click the submit button. When the form is submitted, the data will be sent to Firebase at the specified location (fromClient) and user controls will be disabled." );
                    // Populate the form field and click submit
                        $('#retrievePasscodeUserContact').val('aaaron@gmail.com'); 
                    // Submit the request form
                        $( "#retrievePasscodeSubmitBtn" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the request form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        GLOB.retrievePasscodeUserContact = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkRetrievePasscodeFormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkRetrievePasscodeFormRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                            GLOB.retrievePasscodeUserContact = val.userContact;
                        // Turn the listener off after retrieving the data
                            checkRetrievePasscodeFormRef.off();
                        });
                },
                function() {
                    // Confirm that the request form data was received by Firebase
                        if (GLOB.msgType !== "retrievePasscodeForm") {
                            alert(
                                "Expecting 'retrievePasscodeForm'. Got: " + 
                                GLOB.msgType + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.retrievePasscodeUserContact !== "aaaron@gmail.com") {
                            alert(
                                "Expecting 'aaaron@gmail.com'. Got: " + 
                                GLOB.homeRequestUserContact + 
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
                    descAlert( "User controls were disabled and the request form data (user contact) was sent to Firebase. The server responds with a message to either display a confirmation page (successful submission) or a server alert (failure or some other condition), both of which are tested elsewhere. This completes the test of the Retrieve Passcode page template." );
                },
        // P4. Confirmation page templates
            // Display homeConfirmation page
                function() {
                    descAlert( "Let's test the various confirmation pages. When a user successfully submits a form, a corresponding confirmation page appears. (In some cases a user is taken directly to the dashboard with an alert, so those cases are not covered here.) Let's simulate the server response to a successful form submission, which is to send a message to Firebase, which is used by the client to display the confirmation page, and confirm that it displays properly. Let's start with the homeConfirmation template, which appears when a new requestor submits the 'new request' form on the homepage. The server includes the user's email or phone number in the body of the confirmation text, so we'll also confirm that this data appears correctly." );
                    // Server populates confirmation page data and displays template.
                        // Incorporate the contact the user should check into the body of the confirmation copy
                        GLOB.homeConfirmationPageDataRef.set({
                            confirmationContact:"aaaron@gmail.com"
                        })
                        GLOB.displayRef.set({
                            thisPage:"homeConfirmation"
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'homeConfirmation' page template is displayed
                        if ( $('#homeConfirmation').css('display') !== 'block') {
                            alert(
                                "Error: The 'homeConfirmation' page template should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm that the requestor's contact point appears in the page body
                        if ( $('#homeConfirmationContact').html() !== 'aaaron@gmail.com') {
                            alert(
                                "Error: The user's contact info (aaaron@gmail.com) should be displayed in the page body copy."
                            );
                            return( -1 );
                        };
                },
            // Display requestorCancelConfirmation page
                function() {
                    descAlert( "The homeConfirmation page template was displayed and the user contact information was presented correctly. Let's display the 'requestorCancelConfirmation' page. This page appears when a requestor clicks the 'cancel' button on the requestor landing page." );
                    // Server sends message to display the requestorCancelConfirmation page template
                        GLOB.displayRef.set({
                            thisPage:"requestorCancelConfirmation"
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'requestorCancelConfirmation' page template is displayed
                        if ( $('#requestorCancelConfirmation').css('display') !== 'block') {
                            alert(
                                "Error: The 'homeConfirmation' page template should be displayed."
                            );
                            return( -1 );
                        };
                },
            // Display counterpartyCancelConfirmation page
                function() {
                    descAlert( "The 'requestorCancelConfirmation' page template was displayed. Let's display the 'counterpartyCancelConfirmation' page. This page appears when a counterparty clicks the 'cancel' button on a counterparty landing page." );
                    // Server sends message to display the counterpartyCancelConfirmation page template
                        GLOB.displayRef.set({
                            thisPage:"counterpartyCancelConfirmation"
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'counterpartyCancelConfirmation' page template is displayed
                        if ( $('#counterpartyCancelConfirmation').css('display') !== 'block') {
                            alert(
                                "Error: The 'counterpartyCancelConfirmation' page template should be displayed."
                            );
                            return( -1 );
                        };
                    descAlert( "The 'counterpartyCancelConfirmation' page template was displayed. This concludes the unit test for the various confirmation pages." );
                },
            // retrievePasscodeConfirmation page
                function() {
                    descAlert( "The 'counterpartyCancelConfirmation' page template was displayed. Let's display the 'retrievePasscodeConfirmation' page. This page appears when a counterparty sucessfully submits the 'retrieve passcode' form." );
                    // Server sends message to display the retrievePasscodeConfirmation page template
                        GLOB.displayRef.set({
                            thisPage:"retrievePasscodeConfirmation"
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'retrievePasscodeCancelConfirmation' page template is displayed
                        if ( $('#retrievePasscodeConfirmation').css('display') !== 'block') {
                            alert(
                                "Error: The 'retrievePasscodeConfirmation' page template should be displayed."
                            );
                            return( -1 );
                        };
                    descAlert( "The 'retrievePasscodeConfirmation' page template was displayed. This concludes the unit test for the various confirmation pages." );
                },
        // P5. 'requestorLanding' page template
            // Server populates and displays the 'requestorLanding' template
                function() {
                    descAlert( "This is the unit test for the requestorLanding page template. This is the page to which a new requestor is directed after confirming their contact via phone or email. Let's simulate server-generated Firebase messages to populate the page data (requestor contact, relationship type, counterparty contact and the new requestor passcode) and display the page template." );
                    // Populate and display the template
                        GLOB.requestorLandingPageDataRef.set({
                            userContactData:"aaaron@gmail.com",
                            relationshipType:"casual",
                            counterpartyContactData:"123-456-7890",
                            requestorPasscode:"4Wn78Xg9"
                        })
                        GLOB.displayRef.set({
                            thisPage:"requestorLanding",
                        })
                    // Add a delay to allow the display to update
                        return( 1000 );
                },
                function() {
                    // confirm that the 'requestorLanding' template is displayed
                        if ( $('#requestorLanding').css('display') !== 'block') {
                            alert(
                                "Error: The 'requestorLanding' template should be displayed."
                            );
                            return( -1 );
                        };
                    // confirm the user's contact is displayed properly in the relationship
                        var userContact = $("#requestorLandingUserContact").html();
                        var expectedUserContact ="aaaron@gmail.com";
                        if ( userContact !== expectedUserContact ) {
                            alert(
                                "Expecting text: [" +
                                expectedUserContact +
                                "]. Got text: ["+
                                userContact +
                                "]"
                            );
                            return( -1 );
                        };
                    // confirm the relationship type
                        var relationshipType = $("#requestorLandingRelationshipType").html();
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
                    // confirm the counterparty contact
                        var counterpartyContact = $("#requestorLandingCounterpartyContact").html();
                        var expectedCounterpartyContact ="123-456-7890";
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
                    // confirm the passcode is properly displayed
                        var userContact2 = $("#requestorLandingPasscode").html();
                        var expectedUserContact2 ="4Wn78Xg9";
                        if ( userContact2 !== expectedUserContact2 ) {
                            alert(
                                "Expecting text: [" +
                                expectedUserContact2 +
                                "]. Got text: ["+
                                userContact2 +
                                "]"
                            );
                            return( -1 );
                        };
                },
            // Requestor submits landing page form information
                function() {
                    descAlert( "The requestorLanding page template and page data were properly displayed and populated. Let's fill out the form in the page and submit it. Submission will send the form data to Firebase at the specified location (fromClient) and user controls will be disabled." );
                    // User populates the name form
                        $('#requestorLandingName').val('Alana Aaron'); 
                    // User selects the 'terms and conditions' checkbox.
                        $( "#requestorLandingTOS" ).prop( "checked", true );
                    // Submit the request form
                        $( "#requestorLandingSubmitBtn" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the values stored for the requestorLanding form in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.msgType = "";
                        GLOB.requestorLandingUserName = "";
                        GLOB.requestorLandingCheckbox = "";
                        GLOB.requestorLandingPasscode = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkRegistrationFormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkRegistrationFormRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.msgType = val.msgType;
                            GLOB.requestorLandingUserName = val.name;
                            GLOB.requestorLandingCheckbox = val.TOSCheckbox;
                            GLOB.requestorLandingPasscode = val.passcode;
                        // Turn the listener off after retrieving the data
                            checkRegistrationFormRef.off();
                        });
                    // Add a delay to allow for display update
                        return( 1000 );
                },
                function() {
                    // Confirm that the request form data was received by Firebase
                        if (GLOB.msgType !== "newRequestorLandingForm") {
                            alert(
                                "Expecting 'newRequestorLandingForm'. Got: " + 
                                GLOB.msgType + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.requestorLandingUserName !== 'Alana Aaron') {
                            alert(
                                "Expecting 'Alana Aaron'. Got: " + 
                                GLOB.requestorLandingUserName + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.requestorLandingCheckbox == false) {
                            alert(
                                "Expecting 'true' (terms and conditions checkbox checked). Got: " + 
                                GLOB.requestorLandingCheckbox + 
                                "." 
                            );
                            return( -1 );
                        };
                        if (GLOB.requestorLandingPasscode !== '4Wn78Xg9') {
                            alert(
                                "Expecting '4Wn78Xg9'. Got: " + 
                                GLOB.requestorLandingPasscode + 
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
                },
            // Requestor cancels request
                function() {
                    descAlert( "The 'requestorLanding' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or send a message to trigger client display of a confirmation page. We already tested both of these so let's enable the controls and test the 'Cancel this request' button. This will open a confirmation dialog." );
                    // Remove the 'disable controls' overlay
                        enableControls();
                    // Allow time for the dialog to open
                        return( 700 );
                },
                function() {
                    // Click the 'cancel this request' button
                        $( "#requestorLandingCancelBtn" ).click();
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
                    // Allow time for submission
                        return( 700 );
                },
                function() {
                    descAlert( "The 'cancel' dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
                    // Submit the request form
                        $( "#modalCancelRequest" ).click();
                    // Allow time for submission
                        return( 10 );
                },
                function() {
                    // Initialize and assign a variable to hold the value stored in the requestorLandingCancel message in Firebase
                        // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                        GLOB.requestorLandingCancel = "";
                        // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                        var checkRegistrationCancelRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                        checkRegistrationCancelRef.on('child_added', function(childSnapshot, prevChildName) {
                            var val = childSnapshot.val();
                            GLOB.requestorLandingCancel = val.msgType;
                        // Turn the listener off after retrieving the data
                            checkRegistrationCancelRef.off();
                        });
                    // Add a delay to allow the message to reach Firebase
                        return( 10 );
                },
                function() {
                    // Confirm that the request form data was received by Firebase
                        if (GLOB.requestorLandingCancel !== 'cancelRelationshipRequest') {
                            alert(
                                "Expecting text: 'cancelRelationshipRequest'. Got text: '" +
                                GLOB.requestorLandingCancel +
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
                    descAlert( "The 'requestorLanding' form data was sent to Firebase at the specified location (fromClient/requestorLanding) and user controls were disabled. This concludes the requestorLanding portion of the unit test." );
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
            // counterpartyLanding1 form: Easy Accept
                // Counterparty submits form
                    function() {
                        descAlert( "The page was displayed and all the page elements displayed properly. Let's test the counterpartyLanding1 form. We'll check the terms of service checkbox and submit. When the form is submitted, the passcode will be sent with TOS confirmation to Firebase at the specified location (fromClient) and user controls will be disabled." );
                        // User selects the 'terms and conditions' checkbox.
                            $( "#counterpartyLanding1TOSCheckbox" ).prop( "checked", true );
                        // Submit the request form
                            $( "#counterpartyLanding1SubmitBtn" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding1 form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.counterpartyLanding1PasscodeCheck = "";
                            GLOB.counterpartyLanding1TOSCheckboxCheck = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding1FormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient/counterpartyLanding1/' );
                            checkcounterpartyLanding1FormRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.counterpartyLanding1PasscodeCheck = val.passcode;
                                GLOB.counterpartyLanding1TOSCheckboxCheck = val.TOSCheckbox;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding1FormRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
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
                        descAlert( "The form data was received correctly by Firebase and the controls were disabled. Let's enable the controls again and click the cancel button, and confirm that it opens a confirmation dialog." );
                        // Enable controls
                            enableControls();
                        // Allow time for the dialog to open
                            return( 700 );
                    },
                    function() {
                        // Click the 'cancel' button
                            $( "#counterpartyLanding1CancelBtn" ).click();
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
                        descAlert( "The 'cancel' dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
                        // Submit the request form
                            $( "#modalCancelRequest" ).click();
                        // Allow time for submission
                            return( 10 );
                    },
                    function() {
                        // Initialize and assign a variable to hold the values stored for the counterpartyLanding1 form in Firebase
                            // Set the Firebase reference. We'll be specific to ensure that this is in the proper place in the data architecture map.
                            GLOB.counterpartyLanding1Cancel = "";
                            // Create a temporary listening function function to confirm that the value was properly stored in Firebase.
                            var checkcounterpartyLanding1CancelRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
                            checkcounterpartyLanding1CancelRef.on('child_added', function(childSnapshot, prevChildName) {
                                var val = childSnapshot.val();
                                GLOB.counterpartyLanding1Cancel = val.cancelRequest;
                            // Turn the listener off after retrieving the data
                                checkcounterpartyLanding1CancelRef.off();
                            });
                        // Add a delay to allow for display update
                            return( 1000 );
                    },
                    function() {
                        // Confirm that user controls were disabled
                            if ($("#disableControls").hasClass("hidden") !== false) {
                                alert(
                                    "Error: User controls should be disabled."
                                );
                                return( -1 );
                            };
                    },
            // counterpartyLanding 2 form A: Add a new contact point to an existing account
                // Populate and display counterpartyLanding2 form
                    function() {
                        descAlert( "The cancel request was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or change to a confirmation page. We test both of these elsewhere so let's enable the controls and proceed to counterpartyLanding Page 2. This is the 'anonymous' form in which the counterparty's contact is not currently registered with the system. We'll initialize the page, clear the Firebase messages associated with it, and simulate a server message to display form counterpartyLanding2 and confirm that it appears." );
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
                            var checkcounterpartyLanding2aFormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                        descAlert( "The 'counterpartyLanding2a' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or change to the 'blank' page to display a confirmation message. We already test these elsewhere so let's enable the controls and click the cancel button, and confirm that a confirmation dialog appears." );
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
                        descAlert( "The 'cancel' dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
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
                            var checkcounterpartyLanding2aCancelRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                            var checkcounterpartyLanding2bFormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                        descAlert( "The 'counterpartyLanding2b' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or change to the 'blank' page to display a confirmation message. We already test these elsewhere so let's enable the controls and click the cancel button, and confirm that it opens a confirmation dialog." );
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
                        descAlert( "The 'cancel' dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
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
                            var checkcounterpartyLanding2bCancelRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                        descAlert( "The cancel button sent the proper message to Firebase, so let's enable controls and proceed to counterpartyLanding form 3. This form appears when the system detects that two profiles would be merged when the relationship is confirmed, and no conflict would be created as a result. Let's initialize the page, clear the Firebase messages associated with it, and simulate a server message to display form counterpartyLanding3 and confirm that it appears." );
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
                            var checkcounterpartyLanding3FormRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                        descAlert( "The 'counterpartyLanding3' form data was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or change to the 'blank' page to display a confirmation message. We already tested both of these so let's click the cancel button and confirm that it opens a confirmation dialog." );
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
                        descAlert( "The 'cancel' dialog is open. Let's click 'yes I'm sure' and confirm that it sends a cancel message to Firebase, the dialog disappears, and the 'disable controls' overlay appears." );
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
                            var checkcounterpartyLanding3CancelRef = new Firebase('https://trustjar.firebaseio.com/UID12345/fromClient' );
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
                    descAlert( "The 'counterpartyLanding3' form cancellation was sent to Firebase at the specified location (fromClient) and user controls were disabled. The server response would be to either return a server alert message or change to a confirmation page to display a confirmation message. We test both of these elsewhere so let's enable the controls and proceed to counterpartyLanding Page 4. This is the 'conflict' version. It's not actually a form since the user can't respond to it." );
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
