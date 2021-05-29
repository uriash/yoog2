function reInit(target){
var mr_firstSectionHeight, 
    mr_nav, 
    mr_navOuterHeight, 
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;


	"use strict";
	
	// Update scroll variable for scrolling functions
	
	addEventListener('scroll',function(){ mr_scrollTop = window.pageYOffset; }, false );
	
	// Append .background-image-holder <img>'s as CSS backgrounds

    $(target+' .background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });
    
    // Fade in background images
	
	setTimeout(function(){
		$(target+' .background-image-holder').each(function() {
			$(this).addClass('fadeIn');
		});
    },200);
	
	// Initialize Tooltips
	
	$(target+' [data-toggle="tooltip"]').tooltip();
	
	// Checkboxes
	
	$(target+' .checkbox-option').click(function(){
		$(this).toggleClass('checked');
		var checkbox = $(this).find('input');
		if(checkbox.prop('checked') === false){
			checkbox.prop('checked',true);
		}else{
			checkbox.prop('checked',false);
		}
	});
	
	// Radio Buttons
	
	$(target+' .radio-option').click(function(){
		$(this).closest('form').find('.radio-option').removeClass('checked');
		$(this).addClass('checked');
		$(this).find('input').prop('checked',true);
	});
	
	// Tabbed Content
    
    $(target+' .tabbed-content').each(function(){
    	$(this).append('<ul class="content"></ul>');
    });
    
    $(target+' .tabs li').each(function(){
    	var originalTab = $(this), activeClass = "";
    	if(originalTab.is('.tabs li:first-child')){
    		activeClass = ' class="active"';
    	}
    	var tabContent = originalTab.find('.tab-content').detach().wrap('<li'+activeClass+'></li>').parent();
    	originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });
    
    $(target+' .tabs li').click(function(){
    	$(this).closest('.tabs').find('li').removeClass('active');
    	$(this).addClass('active');
    	var liIndex = $(this).index() + 1;
    	$(this).closest('.tabbed-content').find('.content>li').removeClass('active');
    	$(this).closest('.tabbed-content').find('.content>li:nth-of-type('+liIndex+')').addClass('active');
    });
    
    // Navigation
    
    if(!$(target+' nav').hasClass('fixed') && !$(target+' nav').hasClass('absolute')){
    
    	// Make nav container height of nav
    	
    	$(target+' .nav-container').css('min-height',$(target+' nav').outerHeight(true));
    	
    	$(window).resize(function(){
    		$(target+' .nav-container').css('min-height',$(target+' nav').outerHeight(true));
    	});
    	
    	// Compensate the height of parallax element for inline nav
    	
    	if($(window).width() > 768){
    		$(target+' .parallax:first-child .background-image-holder').css('top', -($(target+' nav').outerHeight(true)) );
    	}
    	
    	// Adjust fullscreen elements
    	
    	if($(window).width() > 768){
    		$(target+' section.fullscreen:first-child').css('height', ($(window).height() - $(target+' nav').outerHeight(true)));
    	}
    	
    }else{
    	$(target+' body').addClass('nav-is-overlay');
    }
    
    if($(target+' nav').hasClass('bg-dark')){
    	$(target+' .nav-container').addClass('bg-dark');
    }
    

    // Fix nav to top while scrolling
    
    mr_nav = $(target+' body .nav-container nav:first');
    mr_navOuterHeight = $(target+' body .nav-container nav:first').outerHeight();
    window.addEventListener("scroll", updateNav, false);

    // Menu dropdown positioning
    
    $(target+' .menu > li > ul').each(function(){
    	var menu = $(this).offset();
    	var farRight = menu.left + $(this).outerWidth(true);
    	if(farRight > $(window).width() && !$(this).hasClass('mega-menu') ){
    		$(this).addClass('make-right');
    	}else if(farRight > $(window).width() && $(this).hasClass('mega-menu')){
    		var isOnScreen = $(window).width() - menu.left;
    		var difference = $(this).outerWidth(true) - isOnScreen;
    		$(this).css('margin-left', -(difference));
    	}
    });
    
    // Mobile Menu
    
    $(target+' .mobile-toggle').click(function(){
    	$(target+' .nav-bar').toggleClass('nav-open');
    	$(this).toggleClass('active');
    });
    
    $(target+' .menu li').click(function(e){
    	if (!e) e = window.event;
    	e.stopPropagation();
    	if($(this).find('ul').length){
    		$(this).toggleClass('toggle-sub');
    	}else{
    		$(this).parents('.toggle-sub').removeClass('toggle-sub');
    	}
    });
    
    $(target+' .menu li a').click(function(){
    	if($(this).attr('href') === '#'){
    		if(!$(this).closest('li').find('ul').length){
    			return false;
    		}
    	}
    });
    
    
    $(target+' .module.widget-handle').click(function(){
    	$(this).toggleClass('toggle-widget-handle');
    });
    
    // Instagram Feed

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $(target+' .instafeed').each(function() {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name'), max: 12
        });
    });
    
    // Image Sliders
    
    $(target+' .slider-all-controls').flexslider({  });
    $(target+' .slider-paging-controls').flexslider({ animation: "slide", directionNav: false });
    $(target+' .slider-arrow-controls').flexslider({ controlNav: false });
	$(target+' .slider-thumb-controls .slides li').each(function(){
		var imgSrc = $(this).find('img').attr('src');
		$(this).attr('data-thumb', imgSrc);
	});
	$(target+' .slider-thumb-controls').flexslider({ animation: "slide", controlNav: "thumbnails", directionNav: true });
	$(target+' .logo-carousel').flexslider({ minItems: 1, maxItems: 4, move: 1, itemWidth: 200, itemMargin: 0, animation: "slide", slideshow: true, slideshowSpeed: 3000, directionNav: false, controlNav: false });
	
	
	// Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map
	
	$(target+' .map-holder').click(function(){
		$(this).addClass('interact');
	});
	
	$(window).scroll(function(){
		if($(target+' .map-holder.interact').length){
			$(target+' .map-holder.interact').removeClass('interact');
		}
	});
	
	// Scroll Reveal
	
	window.sr = new scrollReveal();
	
	// Pull bottom half
	
	$(target+' .pull-bottom-half').each(function(){
		var margin = -($(this).outerHeight(true)/2) + 'px';
		$(this).css('margin-bottom',''+margin+'');
	});
	
	// Contact form code

    $(target+' form.form-email, form.form-newsletter').submit(function(e) {
       
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        var thisForm = $(this).closest('form.form-email, form.form-newsletter'),
            error = 0,
            originalError = thisForm.attr('original-error'),
            loadingSpinner, iFrame, userEmail, userFullName, userFirstName, userLastName;

		// Mailchimp/Campaign Monitor Mail List Form Scripts
		iFrame = $(thisForm).find('iframe.mail-list-form');

        thisForm.find('.form-error, .form-success').remove();
        thisForm.append('<div class="form-error" style="display: none;">'+thisForm.attr('data-error')+'</div>');
        thisForm.append('<div class="form-success" style="display: none;">'+thisForm.attr('data-success')+'</div>');
        
		
		if( (iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "") ){
				
				console.log('Mail list form signup detected.');
				userEmail 		= $(thisForm).find('.signup-email-field').val();
				userFullName 	= $(thisForm).find('.signup-name-field').val();
				userFirstName 	= $(thisForm).find('.signup-first-name-field').val();
				userLastName 	= $(thisForm).find('.signup-last-name-field').val();

				// validateFields returns 1 on error;
				if (validateFields(thisForm) !== 1) {
					console.log('Mail list signup form validation passed.');
					console.log(userEmail);
					console.log(userLastName);
					console.log(userFirstName);
					console.log(userFullName);
					
					iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
					iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
					iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
					iFrame.contents().find('#mce-NAME, #fieldName').val(userFullName);
					iFrame.contents().find('form').attr('target', '_blank').submit();
				}else{
                    thisForm.find('.form-error').fadeIn(1000);
                    setTimeout(function() {
                        thisForm.find('.form-error').fadeOut(500);
                    }, 5000);
                }
		}
		else{
			console.log('Send email form detected.');
			if (typeof originalError !== typeof undefined && originalError !== false) {
				thisForm.find('.form-error').text(originalError);
			}


			error = validateFields(thisForm);


			if (error === 1) {
				$(this).closest('form').find('.form-error').fadeIn(200);
				setTimeout(function() {
					$(thisForm).find('.form-error').fadeOut(500);
				}, 3000);
			} else {
				// Hide the error if one was shown
				$(this).closest('form').find('.form-error').fadeOut(200);
				// Create a new loading spinner while hiding the submit button.
				loadingSpinner = jQuery('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
				$(thisForm).find('input[type="submit"]').hide();

				jQuery.ajax({
					type: "POST",
					url: "mail/mail.php",
					data: thisForm.serialize(),
					success: function(response) {
						// Swiftmailer always sends back a number representing numner of emails sent.
						// If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
						$(thisForm).find('.form-loading').remove();
						$(thisForm).find('input[type="submit"]').show();
						if ($.isNumeric(response)) {
							if (parseInt(response) > 0) {
                                thisForm.find('input[type="text"]').val("");
                                thisForm.find('textarea').val("");
								thisForm.find('.form-success').fadeIn(1000);
								thisForm.find('.form-error').fadeOut(1000);
								setTimeout(function() {
									thisForm.find('.form-success').fadeOut(500);
								}, 5000);
							}
						}
						// If error text was returned, put the text in the .form-error div and show it.
						else {
							// Keep the current error text in a data attribute on the form
							thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
							// Show the error with the returned error text.
							thisForm.find('.form-error').text(response).fadeIn(1000);
							thisForm.find('.form-success').fadeOut(1000);
						}
					},
					error: function(errorObject, errorText, errorHTTP) {
						// Keep the current error text in a data attribute on the form
						thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
						// Show the error with the returned error text.
						thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
						thisForm.find('.form-success').fadeOut(1000);
						$(thisForm).find('.form-loading').remove();
						$(thisForm).find('input[type="submit"]').show();
					}
				});
			}
		}
		return false;
    });

    $(target+' .validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $(target+' form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;

        $(form).find('.validate-required[type="checkbox"]').each(function() {
            if (!$(target+' [name="' + $(this).attr('name') + '"]:checked').length) {
                error = 1;
                name = $(this).attr('name').replace('[]', '');
                form.find('.form-error').text('Please tick at least one ' + name + ' box.');
            }
        });

        $(form).find('.validate-required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        $(form).find('.validate-email').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        if (!form.find('.field-error').length) {
            form.find('.form-error').fadeOut(1000);
        }

        return error;
    }
	



	"use strict";
    
    mr_firstSectionHeight = $(target+' .main-container section:first-child').outerHeight(true);   
    


function updateNav(){
    
    var scrollY = mr_scrollTop;

    if(scrollY <= 0){
        if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
        if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight');}
        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        return;
    }

    if(scrollY > mr_firstSectionHeight){
        if(!mr_navScrolled){
            mr_nav.addClass('scrolled');
            mr_navScrolled = true;
            return; 
        }
    }else{
        if(scrollY > mr_navOuterHeight){
            if(!mr_navFixed){mr_nav.addClass('fixed');mr_navFixed = true;}

            if(scrollY > mr_navOuterHeight*2){
                if(!mr_outOfSight){mr_nav.addClass('outOfSight'); mr_outOfSight = true;}
            }else{
                if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
            }
        }else{
            if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
            if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
        }

        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        
    }
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

}