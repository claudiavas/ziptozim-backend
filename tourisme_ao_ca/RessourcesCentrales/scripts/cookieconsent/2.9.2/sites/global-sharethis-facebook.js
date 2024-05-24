window.addEventListener('load', function(){

	// obtain plugin
	var cc = initCookieConsent();

	// run plugin with your configuration
	cc.run({
		//current_lang: 'fr',
		autoclear_cookies: true,                   // default: false
		page_scripts: true,                        // default: false

		// mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
		// delay: 0,                               // default: 0
		auto_language: 'browser',                 // default: null; could also be 'browser' or 'document'
		// autorun: true,                          // default: true
		// force_consent: false,                   // default: false
		// hide_from_bots: true,                   // default: true
		// remove_cookie_tables: false             // default: false
		// cookie_name: 'cc_cookie',               // default: 'cc_cookie'
		// cookie_expiration: 182,                 // default: 182 (days)
		// cookie_necessary_only_expiration: 182   // default: disabled
		// cookie_domain: location.hostname,       // default: current domain
		// cookie_path: '/',                       // default: root
		// cookie_same_site: 'Lax',                // default: 'Lax'
		use_rfc_cookie: true,                  // default: false
		// revision: 0,                            // default: 0

		onFirstAction: function(user_preferences, cookie){
			// callback triggered only once on the first accept/reject action
		},

		onAccept: function (cookie) {
			// callback triggered on the first accept/reject action, and after each page load
		},

		onChange: function (cookie, changed_categories) {
			// callback triggered when user changes preferences after consent has already been given
		},

		languages: {
			'fr': {
				consent_modal: {
					title: 'Nous utilisons des cookies !',
					description: 'Nous utilisons les témoins de navigation (cookies) afin d\'opérer et d\'améliorer nos services. Le respect de votre vie privée est important pour nous. Si vous n\'êtes pas à l\'aise avec l\'utilisation de ces informations, veuillez revoir vos paramètres avant de poursuivre votre visite. <button type="button" data-cc="c-settings" class="cc-link">Laisse-moi choisir</button>',
					primary_btn: {
						text: 'Accepter tout',
						role: 'accept_all'              // 'accept_selected' or 'accept_all'
					},
					secondary_btn: {
						text: 'Rejeter tout',
						role: 'accept_necessary'        // 'settings' or 'accept_necessary'
					}
				},
				settings_modal: {
					title: 'Préférences en matière de cookies',
					save_settings_btn: 'Enregistrer les paramètres',
					accept_all_btn: 'Accepter tout',
					reject_all_btn: 'Rejeter tout',
					close_btn_label: 'Fermer',
					cookie_table_headers: [
						{col1: 'Nom'},
						{col2: 'Domaine'},
						{col4: 'Description'}
					],
					blocks: [
						{
							title: 'Utilisation des cookies',
							description: 'Utiliser des cookies pour assurer les fonctionnalités de base du site Web et pour améliorer votre expérience en ligne. Vous pouvez choisir pour chaque catégorie de vous inscrire/désinscrire quand vous le souhaitez.'
						}, {
							title: 'Cookies strictement nécessaires',
							description: 'Ces cookies sont indispensables au bon fonctionnement de ce site internet. Sans ces cookies, le site Web ne fonctionnerait pas correctement.',
							toggle: {
								value: 'nécessaire',
								enabled: true,
								readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'cfid',       // match all cookies starting with "_ga"
									col2: location.hostname,
									col4: 'Ce cookie permet de garder votre session ouverte.',
									is_regex: true
								},
								{
									col1: 'cftoken',
									col2: location.hostname,
									col4: 'Ce cookie permet de garder votre session ouverte.',
								},
								{
									col1: 'cc_cookie',
									col2: location.hostname,
									col4: 'Ce cookie permet de faire la gestion des cookies.',
								}
							]
						}, {
							title: 'Cookies de performances et analyse',
							description: 'Ces cookies collectent des informations sur la façon dont vous utilisez le site Web, les pages que vous avez visitées et les liens sur lesquels vous avez cliqués. Toutes les données sont anonymisées et ne peuvent pas être utilisées pour vous identifier.',
							toggle: {
								value: 'analytics',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^_ga',       // match all cookies starting with "_ga"
									col2: 'google.com',
									col3: '',
									col4: 'Ce cookie est défini par google analytics pour des fins de statistiques.',
									is_regex: true
								},
								{
									col1: '_gid',
									col2: 'google.com',
									col3: '',
									col4: 'Ce cookie est défini par google analytics pour des fins de statistiques.',
								}
							]
						}, {
							title: 'Cookies de partage sur les réseaux sociaux',
							description: 'Ces cookies collectent des informations sur la façon dont vous partagez les informations sur les réseaux sociaux.',
							toggle: {
								value: 'shareThis',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^pxcell',       // match all cookies starting with "pxcell"
									col2: 'sharethis.com',
									col3: '',
									col4: 'Ce cookie est défini par Share This pour des fins de statistiques.',
									is_regex: true
								}
							]
						}, {
							title: 'Cookies de facebook',
							description: 'Ces cookies collectent des informations pour la plateforme facebook.',
							toggle: {
								value: 'facebook',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'datr',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'Ce cookie est défini par facebook pour des fins de statistiques.',
									is_regex: true
								},{
									col1: 'locale',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'Ce cookie est défini par facebook pour des fins de statistiques.',
									is_regex: true
								},{
									col1: 'sb',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'Ce cookie est défini par facebook pour des fins de statistiques.',
									is_regex: true
								},{
									col1: 'wd',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'Ce cookie est défini par facebook pour des fins de statistiques.',
									is_regex: true
								}
							]
						}
					]
				}
			},'en': {
				consent_modal: {
					title: 'We use cookies!',
					description: 'We use cookies to operate and improve our services. Your privacy is important to us. If you are not comfortable with the use of this information, please review your settings before continuing your visit. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
					primary_btn: {
						text: 'Accept all',
						role: 'accept_all'              // 'accept_selected' or 'accept_all'
					},
					secondary_btn: {
						text: 'Reject all',
						role: 'accept_necessary'        // 'settings' or 'accept_necessary'
					}
				},
				settings_modal: {
					title: 'Cookie preferences',
					save_settings_btn: 'Save settings',
					accept_all_btn: 'Accept all',
					reject_all_btn: 'Reject all',
					close_btn_label: 'Fermer',
					blocks: [
						{
							title: 'Cookie usage',
							description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
						}, {
							title: 'Strictly necessary cookies',
							description: 'These cookies are essential for the proper functioning of this website. Without these cookies, the website would not work properly.',
							toggle: {
								value: 'Necessary',
								enabled: true,
								readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'cfid',       // match all cookies starting with "_ga"
									col2: location.hostname,
									col4: 'This cookie keeps your session open.',
									is_regex: true
								},
								{
									col1: 'cftoken',
									col2: location.hostname,
									col4: 'This cookie keeps your session open.',
								},
								{
									col1: 'cc_cookie',
									col2: location.hostname,
									col4: 'This cookie allows you to manage cookies.',
								}
							]
						}, {
							title: 'Performance and Analytics cookies',
							description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.',
							toggle: {
								value: 'analytics',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^_ga',       // match all cookies starting with "_ga"
									col2: 'google.com',
									col3: '',
									col4: 'This cookie is set by Google Analytics for statistical purposes.',
									is_regex: true
								},
								{
									col1: '_gid',
									col2: 'google.com',
									col3: '',
									col4: 'This cookie is set by Google Analytics for statistical purposes.',
								}
							]
						}, {
							title: 'Social media sharing cookies',
							description: 'These cookies collect information about how you share information on social media.',
							toggle: {
								value: 'shareThis',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^pxcell',       // match all cookies starting with "pxcell"
									col2: 'sharethis.com',
									col3: '',
									col4: 'This cookie is set by Share This for statistical purposes.',
									is_regex: true
								}
							]
						}, {
							title: 'Facebook cookies',
							description: 'These cookies collect information for the Facebook platform.',
							toggle: {
								value: 'facebook',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'datr',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'This cookie is set by Facebook for statistical purposes.',
									is_regex: true
								},{
									col1: 'locale',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'This cookie is set by Facebook for statistical purposes.',
									is_regex: true
								},{
									col1: 'sb',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'This cookie is set by Facebook for statistical purposes.',
									is_regex: true
								},{
									col1: 'wd',       // match all cookies starting with "pxcell"
									col2: 'facebook.com',
									col3: '',
									col4: 'This cookie is set by Facebook for statistical purposes.',
									is_regex: true
								}
							]
						}
					]
				}
			}
		}
	});
});