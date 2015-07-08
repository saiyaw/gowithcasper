$(document).ready(function() {
	$('#btnlogin').click(function() {
		$.ajax({
			type: 'POST',
			url: '/login',
	//		async: false,
			success: function(result) {
				$('#loginoutput').text(result);
			}
		});
	});
	$('#btndownload').click(function() {
		$.ajax({
			type: 'POST',
			url: '/download',
			async: false,
			success: function(result) {
				$('#downloadoutput').text(result);
			}
		});
	});


});