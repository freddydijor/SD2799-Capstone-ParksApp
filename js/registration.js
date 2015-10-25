$(document).on('ready', function() {
    var api = new NPSApi();

	/**
	 * Data obtained from the registration form
	 * Firstname, Middlename, Lastname
	 * Street address, City
	 * Email, State, Zip, comments
	 * Password
	 */
	var $first_name = $('#firstname');
		$middle_name = $('#mname');
		$last_name = $('#lastname');
		$gender = $("input[type='checkbox']:checked");
		$street_address = $('#address');
		$city = $('#city');
		$email = $('#inputEmail');
		$state = $('#state');
		$phone = $('#phone');
		$zip = $('#zip');
		$password = $('#inputPassword');
		$comments = $('#parksvisited');

	/**
	 * Submit data
	 */
	$('#submit-data').on('click', function(e) {
		// retrieve user data
		var user = {
			first_name: $first_name.val(),
			middle_name: $middle_name.val(),
			last_name: $last_name.val(),
			gender: $gender.val(),
			street_address: $street_address.val(),
			city: $city.val(),
			email: $email.val(),
			state: $state.val(),
			phone: $phone.val(),
			zip: $zip.val(),
			password: $password.val(),
			comments: $comments.val()
		}

		// send information to the database
		// once the database receives the information
		// send the user to index.html
        api.createUser(user)
            .done(function( res ) {
            	if(window.location.replace('index.html')){
            		$('.user-logged').replaceWith(loginData.email);
            	}
                
			})
            .fail(function() {
				console.log(arguments);
			});

            // e.preventDefault();
            // return false;
	});
});
