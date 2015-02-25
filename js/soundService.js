angular.module('sounder').service('soundService', function($http) {
	this.getUser = function(username) {
		return $http({
			method: 'GET',
			url: 'http://api.soundcloud.com/users/'+username+'/tracks.json?client_id=bda4ada8694db06efcac9cf97b872b3e'
		});
	}
});