/**
*	jQuery Plugin for autoscrolling to a specific anchor
*
*	@version 1.0.0
*
*   Copyright (c) 2016 Tony Monast
*   
**/

(function ( $ ) {
 	'use strict';
    $.fn.autoscroll = function( options ) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            defaultHash : 'main-content',
			autoScrollActivate : true,
			autoScrollBlacklist : ['body-home']
        }, options );
		
		// Get window element in the DOM
		var $window = $(window);
		
		// Get body element in the DOM
		var $body = $('body');
		
	
		function init() {
		   autoScroll();
        }
		
		function autoScroll() {

			// Get the current anchor in the url
			var hash = location.hash.replace('#','');
			var $anchorElement;
			var positionToGo = 0;
			var autoScrollAuthorized = settings.autoScrollActivate;
			
			// Validate the blacklist
			var arrayLength = settings.autoScrollBlacklist.length;
			
			if (hash == '') {
				for (var i = 0; i < arrayLength; i++) {
					if ($body.hasClass(settings.autoScrollBlacklist[i]))
						autoScrollAuthorized = false;
				}
			}
			
			// If the autoscroll is activated
			if (autoScrollAuthorized) {
				// Get the default hash
				if(hash == '') {
					hash = settings.defaultHash;
				}
				
				if (hash != '') {
					// Get the anchor html element in the DOM
					$anchorElement = $("#" + hash);
				
					// Make sure the anchor html element exists
					if ($anchorElement.length > 0) {
						
						// Get the anchor position
						positionToGo = $anchorElement.offset().top;

						// Scroll to the element
						$(document).scrollTop(positionToGo);

					}
				}
			}
		}

        function setListeners() {
            // Listen for the actual scroll event
			$(window).on('hashchange', autoScroll);
        }
		
		// Init actions
        init();
        setListeners();

 
        return true;
 
    };
 
}( jQuery ));