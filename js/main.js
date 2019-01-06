(function($) {
 "use strict";

 Pace.on('done', function() {
        setTimeout(function(){
            $('#preloader').animate({opacity:0}, 800);
        }, 300);

        setTimeout(function(){
            $('#preloader').css('display', 'none');
        }, 1100);
 });


 var windowHeight = $(window).height();
 $(document).ready(function() {

  smoothScroll.init({
   speed: 500, // Integer. How fast to complete the scroll in milliseconds
   easing: 'easeInOutQuad', // Easing pattern to use
   updateURL: true // Boolean. Whether or not to update the URL with the anchor hash on
  });

  if ($.fn.countDown) {
   jQuery('#countdown').countDown({
    targetDate: {
     'day': 6,
     'month': 7,
     'year': 2019,
     'hour': 15,
     'min': 0,
     'sec': 0
    }
   });
  }

  (function() {
    [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
        var menuItems = menu.querySelectorAll('.menu__link'),
            setCurrent = function(ev) {
                ev.preventDefault();

                var item = ev.target.parentNode; // li

                // return if already current
                if (classie.has(item, 'menu__item--current')) {
                    return false;
                }
                // remove current
                classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
                // set current
                classie.add(item, 'menu__item--current');
            };

        [].slice.call(menuItems).forEach(function(el) {
            el.addEventListener('click', setCurrent);
        });
    });


})(window);



  var navMain = $("#navbar");
  navMain.on("click", "a", null, function() {
   navMain.collapse('hide');
  });


  $('.hero').height(windowHeight);

  $(window).resize(function() {
   var windowHeight = $(window).height();
   $('.hero').height(windowHeight);
  });

  if ($.fn.kenburnsy) {
   $(function() {
    $("#kenburns").kenburnsy({
     fullscreen: true
    });
   });
  }


  //mail

  // $('input[type="radio"]').click(function() {
  //     if($(this).attr('id') == 'yes') {
  //     $('#rsvp_song').show();
  //    }

  //    else {
  //         $('#rsvp_song').hide();
  //    }
  //  });


  //Form hide/show areas.
  $('input[name="attend"]').click(function() {
   if ($('#yes').is(':checked')) {
    $('#guests, #rsvp_song, input[name="email"]').fadeIn();
    $('#comments').attr('placeholder', 'Comments');
    $('input[name="email"]').attr('placeholder', 'E-Mail *');
   } else {
    $('#guests, #rsvp_song, input[name="email"]').fadeOut();
    $('#message').fadeIn();
    $('#message').val('').attr('placeholder', 'Regrets');
    $('input[name="guest"]').prop('checked', false);
    $('#rsvp_guest_info input[type="text"], #rsvp_guest_info input[type="email"], #rsvp_song input[type="text"]').val('');
   }

  });



  $(function() {

   // Get the form.
   var form = $('#rsvp_form');

   // Get the messages div.
   var formMessages = $('#form-messages');

   // Set up an event listener for the contact form.
   $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    var attending = $("input[name='attend']:checked").val();
    var val_err_msg = '';

    var proceed = true;
    // if (($("input[name='attend']").is(':checked')) && (attending == 'yes') && (
    //     !$.trim($("input[name=guests]").val()) ))
    // {
    //  alert('Please select if you are bringing a guest');
    //  proceed = false; //set do not proceed flag
    // }

    if (!$("input[name='attend']").is(':checked')) {
     alert('Please select whether or not you will be attending');
     proceed = false; //set do not proceed flag
    }
    if (!$.trim($('#rsvp_form input[name=name]').val())) { //if this field is empty
     $('#rsvp_form input[name=name]').addClass('error'); //change border color to red
     $('#name_error').show();
     proceed = false; //set do not proceed flag
    }

    if (!$.trim($('#rsvp_form input[name=email]').val()) && (attending == 'yes') ) { //if this field is empty
     $('#rsvp_form input[name=email]').addClass('error'); //change border color to red
     $('#email_error').show();
     proceed = false; //set do not proceed flag
    }


    // Serialize the form data.
    var formData = $(form).serialize();
    console.log(formData);
    // Submit the form using AJAX.
    if (proceed !== false) {
     $.ajax({

       beforeSend: function() {
            $('#loading').show();
            $('#submit').attr('value', 'loading').prop('disabled', true);
       },
           type: 'POST',
           url: $(form).attr('action'),
           data: formData
      })
      .done(function(response) {

       // Make sure that the formMessages div has the 'success' class.
       $(formMessages).removeClass('error');
       $(formMessages).addClass('success');

       // Set the message text.
       $(formMessages).text(response);
       $('#loading').hide();
       // Clear the form.
       $('#name').val('');
       $('#email').val('');
       $('#guests').find('option:eq(0)').prop('selected', true);
       $('#song_name').val('');
       $('#song_artist').val('');
       $('#message').val('');
       $('#submit').attr('value', 'Submit').prop('disabled', false);
       $('.error_message').hide();
      })
      .fail(function(data) {
       // Make sure that the formMessages div has the 'error' class.
       $('#loading').hide();
       $('#submit').attr('value', 'Submit').prop('disabled', false);
       $(formMessages).removeClass('success');
       $(formMessages).addClass('error');

       // Set the message text.
       if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
       } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
       }
      });
    } else {
     $('#submit').attr('value', 'Submit').prop('disabled', false);
    }
   });

  });


 });

})(jQuery);
