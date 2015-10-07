// Initialize all tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Add another contact field to the current request form
function addProfileContact () {
  $( "#addContactProfile" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}

// Add another contact field to the current request form
function addContact () {
  $( "#addContactDash" ).before( "<div class='form-group' style='margin-bottom:8px'><input type='email' class='form-control' id='newContact1' placeholder='phone or email'></div>" );
}

// Add another contact field to the current request form
function indexEditStep1 () {
  $( "#indexStep1" ).show();
  $( "#step1done" ).hide();
  $( "#indexStep2" ).hide();
  $("#userContact").val('aaaron@gmail.com');
  $("#otherContact").val('bbrown@aol.com');
  $("#indexCasual").prop( "checked", true );
  $("#indexCasual").parent('label').addClass('active');
}

// Add another contact field to the current request form
function indexShowStep2 () {
  $( "#indexStep1" ).hide();
  $( "#step1done" ).show();
  $( "#indexStep2" ).show();
}
// Add another contact field to the current request form
function forgotShowStep2 () {
  $( "#forgotStep1" ).hide();
  $( "#contactChanged" ).hide();
  $( "#forgotStep2" ).show();
}

// Add another contact field to the current request form
function landing2ShowRegister () {
  $( "#landing2Register" ).show();
  $( "#landing2Login" ).hide();
}

// Add another contact field to the current request form
function landing2ShowLogin () {
  $( "#landing2Login" ).show();
  $( "#landing2Register" ).hide();
}

// Confirmation dialog for acceptance of an exclusive relationship when it will create a conflict. It asks twice for confirmation.
function exclusiveConfirmation () {
    var confirmExclusive1 = confirm("WARNING: You're accepting an exclusive relationship while connected to a casual relationship. Both parties will be notified and they will receive each other's contact information. To avoid this, please remove the casual relationship from your dashboard before accepting this relationship. Are you sure you want to continue? ");
    if (confirmExclusive1 == true) {
        var doubleCheck = confirm  ("There is no undoing the notifications that are about to be sent. ARE YOU ABSOLUTELY SURE?")
      if (doubleCheck == true) {
          window.location.assign("dashboard.html")
      };
    };
}

// Confirmation dialog for acceptance of an exclusive relationship when it will create a conflict. It asks twice for confirmation.
function goToDashboard () {
     window.location.assign("dashboard.html")
     return false;
}


/*
    // Script to import footer
    var link = document.querySelector('link[rel="import"]');

    // Clone the footer template in the import.
    var template = link.import.querySelector('homeFooterTemplate');
    var clone = document.importNode(template.content, true);

    document.querySelector('#homeFooter').appendChild(clone);
*/


// $(".footerContent").get("./footer.html"); 