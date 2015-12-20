(function($){
	$(function(){
	  
		$('.menu-button').click(function (e){
			e.preventDefault();
			var menu = $('.menu');

			if (menu.hasClass('in')) {
				setTimeout(function (){
					menu.css('z-index', '-1');
				}, 400); // how long do you want the delay to be? 	
			}
			else {
				menu.css('z-index', '1');
			}

			menu.toggleClass('in');

		});

	}); // end of document ready
})(jQuery); // end of jQuery name space