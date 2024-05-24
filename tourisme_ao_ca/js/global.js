// Initialisation de Foundation
$(document).foundation(); 

function ouvrirConfirmation() {
	$.fancybox.open([{
		href : '/fr/nous-joindre/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationEN() {
	$.fancybox.open([{
		href : '/en/join-us/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationFavori() {
	$.fancybox.open([{
		href : '/fr/evenements/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationFavoriEN() {
	$.fancybox.open([{
		href : '/en/events/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationCourrielFavori() {
	$.fancybox.open([{
		href : '/fr/favoris/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationCourrielFavoriEN() {
	$.fancybox.open([{
		href : '/en/favorites/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationBlogue() {
	$.fancybox.open([{
		href : '/fr/blogue/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


function ouvrirConfirmationBlogueEN() {
	$.fancybox.open([{
		href : '/en/blog/confirmation.cfm'
	}], {
		type:'ajax',
		wrapCSS:'confirmation',
		padding:20,			
		helpers:{ 
			overlay : {
				css : {
					'background' : 'rgba(00, 00, 00, 0.8)'
				}
			}
		}
});}


$(document).ready(function() {
	
	/* Ajouter un deuxième bloc de pièce jointe */
	$("#BlocPieceJointe2").hide();
	
	$("#btnPiecesJointes").click(function() {
		$("#btnPiecesJointes").hide();
		$("#BlocPieceJointe2").show();
	});
	
	
	function RafraichirFormulaire() {
		if ($("#FichierClient2").val() != '') {
			$("#BlocPieceJointe2").show();
			$("#btnPiecesJointes").hide();
		}
	};
	
	RafraichirFormulaire();
	
	
	/* Ajouter un deuxième bloc de pièce jointe */
	$("#BlocRaffinerRecherche").hide();
	
	$("#raffinerRecherche").click(function() {
		$("#BlocRaffinerRecherche").toggle();
	});
	
	
	// MasterSlide for the main slider
	var mainSlider = new MasterSlider();
	mainSlider.setup('masterslider' , {
		width:1920,
		height:800,
		space:0,
		layout:'boxed',
		loop:true,
		overPause:true,
		autoplay:true,
		view:"fade",
		swipe:false,
		fillMode:"fill"
	});
	mainSlider.control('arrows');
	if (mainSlider.api) {
		mainSlider.api.addEventListener(MSSliderEvent.INIT , function(){
			if(mainSlider.api.count() <= 1) {
				$('.ms-nav-prev').removeClass('ms-nav-prev');
				$('.ms-nav-next').removeClass('ms-nav-next');
			}
		});
	}
	
	// Slick navigation (burger menu)
	$(function(){
		$('#slickMenu').slicknav({
			label: 'Menu',
			duration: 1000,
			prependTo:'#mobile-menu',
			allowParentLinks:'True'
		});
	});
	
	
	$("iframe").wrap("<div class='video-container'></div>");
	
	$("#lightgallery").lightGallery();
		
	
	// Main menu Superfish 
	$('ul.sf-menu').superfish({
		animation: {height:'show'},	// slide-down effect without fade-in
		delay:		 1200			// 1.2 second delay on mouseout
	});
	
	
	// Unite gallery for the page photo album
	$("#gallery").unitegallery({
		lightbox_textpanel_enable_description:true,
		lightbox_type:"compact",
		lightbox_arrows_position:"inside",
		lightbox_textpanel_enable_title:true,
		lightbox_textpanel_enable_description:true,
		lightbox_overlay_opacity:0.85,
		tile_width:270,					
		tile_height:230,		
		grid_space_between_cols:30,		
		grid_space_between_rows:30,
		grid_num_rows:2,
		tile_enable_shadow:false,
		tile_enable_border:false,
		gallery_theme:"tilesgrid"
	});
	
	
	$(window).load(function() {
		$(function() {
			$( ".champDate" ).datepicker({
				dateFormat: "yy-mm-dd",
				changeMonth: true,
				changeYear: true
			});
		});
	});
});