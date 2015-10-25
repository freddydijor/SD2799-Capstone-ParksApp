$(document).on('ready', function() {
	/**
	 * Data obtained from login modal
	 * once data is obtained, send the info to 
	 * DB and find if the user is already registered.
	 * Data need it: username and password
	 */
	var api = new NPSApi(),
		$user_email = $('#inputEmail'),
		$user_password = $('#psw'),
		$login = $('#login-button'),
		$logout = $('.logout button');

	/**
	 * Submit data to db 
	 */
	$login.on('click', function(e) {
		//e.preventDefault();

		var email = $user_email.val(),
			password = $user_password.val();
		
		api.login(email, password)
			.done(function( event, jqxhr, user ) {
                console.log('User', user);
                Session.store('user', user);
                $logout.removeClass('hide');
                $('.user-logged').html(user.first_name);
            })
            .fail(function(event, jqxhr, userOrResp) {
                console.log(event, jqxhr, userOrResp);
                if ( userOrResp === null ) {
                    alert('Invalid credentials');
                } 
			});
	});

	$logout.on('click', function() {
		Session.clear();
		location.reload();
	});
});
