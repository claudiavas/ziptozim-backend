/**
*	jQuery Plugin for simple sticky menu
*	@version 1.0.0
*   Copyright (c) 2016 Tony Monast
*   
**/

(function ( $ ) {




 	'use strict';
    $.fn.stickyNavigation = function( options ) {
	
		// Get the main menu container element
		var $mainMenuContainer = this;
				
		// Get the initial outer height of the main menu container
		var mainMenuContainerInitialOuterHeight = $mainMenuContainer.outerHeight();
	
	
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            defaultHash : 'main-content',
			bodyClass : 'sticky-navigation',
			autoScrollActivate : true,
			autoScrollBlacklist : ['body-home'],
			startPosition : mainMenuContainerInitialOuterHeight
        }, options );
		
		// Get window element in the DOM
		var $window = $(window);
		
		// Get body element in the DOM
		var $body = $('body');
		
		function init() {
           detect();
		   autoScroll();
        }
		
		function detect() {

			// If we don't see the main menu container anymore
			if (settings.startPosition != 0 && $window.scrollTop() >= settings.startPosition) {
				stick();
			}
			
			// Main menu container become visible
			else {
				unstick();
			}
		}
		
		function autoScroll() {

			// Get the current anchor in the url
			var hash = location.hash.replace('#','');
			var $anchorElement;
			var positionToGo = 0;
			var autoScrollAuthorized = settings.autoScrollActivate;
			
			// Validate the blacklist
			var arrayLength = settings.autoScrollBlacklist.length;
			
			for (var i = 0; i < arrayLength; i++) {
				if ($body.hasClass(settings.autoScrollBlacklist[i]))
					autoScrollAuthorized = false;
			}
			
			// If the autoscroll is activated
			if (autoScrollAuthorized) {
				// Get the default hash
				if(hash == '') {
					hash = settings.defaultHash;
				}
				
				// Get the anchor html element in the DOM
				$anchorElement = $("#" + hash);
			
				// Make sure the anchor html element exists
				if ($anchorElement.length > 0) {
					
					// Stick the menu to be able to know is height when it's sticky
					stick();
					
					// Get the anchor position
					positionToGo = $anchorElement.offset().top - $mainMenuContainer.outerHeight();

					// Scroll to the element
					$(document).scrollTop(positionToGo);
					
					setTimeout(function () {
						// Get the anchor position
						positionToGo = $anchorElement.offset().top - $mainMenuContainer.outerHeight();

						// Scroll to the element
						$(document).scrollTop(positionToGo);
					}, 500);

				}
			}
		}
		
		function onScroll(e) {
            detect();
        }
		
		function stick() {
			
			if (!$body.hasClass(settings.bodyClass)) {
				// Hide the menu
				$mainMenuContainer.hide();
		
				// Add class to the body
				$body.addClass(settings.bodyClass);
				
				// Add styles to the main menu container
				$mainMenuContainer.css({
					'position':'fixed',
					'top':'0',
					'left':'0',
					'right':'0',
					'width':'100%',
					'z-index':'3000'
				})
				
				// Add a padding-top to the body equal to the initial main menu container outer height
				$body.css('padding-top',mainMenuContainerInitialOuterHeight);
				
				setTimeout(function () {
					// Show the menu
					$mainMenuContainer.fadeIn('slow');
				}, 500);
			}
			
        }
		
		function unstick() {
			
            // Remove class from the body
			$body.removeClass(settings.bodyClass);
			
			// Remove all styles from the main menu container
			$mainMenuContainer.removeAttr('style');
			
			// Remove the padding-top from the body
			$body.css('padding-top',0);
        }

        function setListeners() {
            // Listen for the actual scroll event
            $(window).on('scroll resize', onScroll);
			$(window).on('hashchange', autoScroll);
        }
		
		// Init actions
        init();
        setListeners();

        return true;
    };
 
}( jQuery ));