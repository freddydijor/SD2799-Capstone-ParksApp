var Session = (function(storage) {
	return { 
		getUser: function() {
			return storage.getItem('user') !== null ? JSON.parse(storage.getItem('user')) : null;
		}, 
		store: function(key, value) {
			storage.setItem(key, JSON.stringify(value));
		},
		clear: function() {
			storage.clear();
		}
	}
})(localStorage);
