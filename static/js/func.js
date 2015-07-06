$(document).ready(function() {
	$('#btntest').click(function() {
		$.ajax({
			type: 'POST',
			url: '/login',
	//		async: false,
			success: function(result) {
				$('#output').text(result);
			}
		});
	});
});