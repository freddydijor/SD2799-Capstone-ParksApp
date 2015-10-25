$(document).on('ready', function() {
	var user = Session.getUser();
	if( user !== null ) {
		$('.logout').removeClass('hide');
		$('.user-logged').html(user.first_name);
	} 
});