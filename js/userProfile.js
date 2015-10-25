$(document).on('ready', function() {
	var user = Session.getUser();

	if ( user !== null ){
		console.log('User', user);
		$('#firstName').val(user.first_name + ' ' + user.middle_name + ' ' + user.last_name);
		$('#address').val(user.street_address);
		$('#city').val(user.city);
		$('#inputEmail').val(user.email);
		$('#state').val(user.state);
		$('#zip').val(user.zip);
		$('#inputPassword').val(user.password);
		$('#phone').val(user.phone);
		$('#parksvisited').val(user.comments);
	}
});