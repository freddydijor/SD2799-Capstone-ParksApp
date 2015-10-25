var NPSApi = (function($) {

    /**
     * This function extracts properties of an object and forms a new one.
     */
    function pluck(obj, attrs) {
        var i, so = {};
        for ( i in attrs ) {
            if ( obj.hasOwnProperty(attrs[i]) ) {
                so[attrs[i]] = obj[attrs[i]];
            }
        }

        return so;
    }

    var http = {
        /**
         * Perform a HTTP GET request.
         *
         * @param {string} url The url that will receive the request.
         * @param {Object} data The data that will be serialized as JSON
         *
         * @returns A jQuery promise object
         */
        post: function(url, data) {
            return $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                url: url,
                processData: false,
                data: JSON.stringify(data)
            });
        },

        /**
         * Perform a HTTP GET request.
         *
         * @param {string} url The url that will receive the request.
         * @param {Object} params The query string that will be appended to the url
         *
         * @returns A jQuery promise object
         */
        get: function(url, params) {
            return $.ajax({
                url: url,
                method: 'GET',
                data: params
            });
        },

        makeFilter: function(params) {
            return { filter: JSON.stringify(params) };
        }
    };

    var BASE_URL = 'http://localhost:8080/capstone-project';

    var api = function NPSApi(baseUrl) {
        this.baseUrl = baseUrl || BASE_URL;
    };

   

    /**
     * Create a url based to a given path based on the base url
     */
    api.prototype.url = function( path ) {
        return this.baseUrl + path;
    }

    
    /**
     * Create a new user.
     */
    api.prototype.createUser = function( user ) {
        return http.post(this.url('/users'), user);
    }

    /**
     * login
     */
    api.prototype.login = function( user_email, user_password ) {
        var dfd = $.Deferred(),
            serverResponse = http.get(this.url('/users'),
                    http.makeFilter({email: user_email, password: user_password}));

        serverResponse
            .done(function(ev, jqxhr, resp) {
                if ( resp.responseJSON._returned == 1 ) {
                    var mongoUserDoc = resp.responseJSON._embedded['rh:doc'][0],
                        user = pluck(mongoUserDoc, [
                            'first_name',
                            'middle_name', 
                            'last_name', 
                            'street_address', 
                            'city', 
                            'email', 
                            'state', 
                            'phone', 
                            'zip',
                            'password', 
                            'comments'
                        ]);

                    dfd.resolve(ev, jqxhr, user);
                } else {
                    dfd.reject(ev, jqxhr, null);

                }
            })
            .fail(function() {
                dfd.reject.apply(null, arguments);
            });

        return dfd.promise();
    }


    return api;
})($.extend({}, $));
