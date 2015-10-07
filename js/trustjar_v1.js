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
function indexShowStep2 () {
  $( "#indexStep1" ).hide();
  $( "#counterpartyBox" ).show();
  $( "#tableStep2" ).show();
  return false;
}

// Show the elements of "Step 1" of the form for the index page
function showBox () {
  $( "#hiddenBlock" ).show();
  $( "#indexContactLabel" ).show();
}