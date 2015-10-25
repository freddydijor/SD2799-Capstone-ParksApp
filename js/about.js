$(document).on('ready', function() {
	// wrap 'user' into variable so then we can parse the object
	var user = Session.getUser();

    if ( user !== null ) {
    	$('.user-logged').html(user.first_name);
    	$('.logout').removeClass('hide');	
    }
});