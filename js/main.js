/*=================================================
recommend do not edit this file
=================================================*/
var $ = jQuery.noConflict();

(function($) {
  'use strict';

/*==============================================================================
variable
==============================================================================*/
var $html = $('html');
var $body = $('body');

var _mainColor = 'dark'; // ['light', 'dark']
var _bgStyle = 2; // 1 = image, 2 = slideshow, 3 = html5 video, 4 = youtube video
var _audio = true; // enable audio on desktop devices

var _lightOverlayColor = 'rgba(255, 255, 255, 0.4)'; // [rgba format] - overlay color
var _lightFormOverlayColor = 'rgba(62, 68, 89, 0.8)'; // [rgba format] - form overlay color

var _darkOverlayColor = 'rgba(0, 0, 0, 0.4)'; // [rgba format] - overlay color
var _darkFormOverlayColor = 'rgba(0, 0, 0, 0.8)'; // [rgba format] - form overlay color

var _border = false; // [true, false] - border


/*==============================================================================
ie10 viewport fix
==============================================================================*/
  (function() {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    };
  })();

/*==============================================================================
device detect
==============================================================================*/
  if ($html.hasClass('desktop')) {
    $html.addClass('non-mobile');
    var isMobile = false;
  } else {
    $html.addClass('is-mobile');
    var isMobile = true;
  }
  if ($html.hasClass('ie9')) {
    var isIE9 = true;
  }

  function fn_core() {

    // bind click event to all internal page anchors
    $('#volume').bind('click', function(e) {
      e.preventDefault();
    });

    // add style class
    $body.addClass(_mainColor);

    $('head').append(
      '<style id="js-css">' +
       '.light #overlay { background-color: ' + _lightOverlayColor + '; }' +
       '.light #form { background-color: ' + _lightFormOverlayColor + '; }' +
       '.dark #overlay { background-color: ' + _darkOverlayColor + '; }' +
       '.dark #form { background-color: ' + _darkFormOverlayColor + '; }' +
      '</style>'
    );

    if (_border) {
      $body.addClass('is-border');
    }
  }

/*==============================================================================
volume
==============================================================================*/
  function fn_audio() {
    var $volume = $('#volume');
    var $volumeBar = $volume.find('span');

    if (_audio) {
      if (_bgStyle == 1 || _bgStyle == 2) {
        var $audioPlayer = document.getElementById('audio-player');

        if (isMobile) {
          $body.addClass('volume-off');
          $audioPlayer.pause();
        } else {
          $body.addClass('volume-on');
          fn_volumeOn();
          $audioPlayer.play();
        }

        $volume.on('click', function(e) {
          e.preventDefault();

          $body.toggleClass('volume-on volume-off');
          if ($body.hasClass('volume-on')) {
            fn_volumeOn();
            $audioPlayer.play();
          } else if ($body.hasClass('volume-off')) {
            $audioPlayer.pause();
            $volumeBar.each(function() {
              $(this).velocity('stop', true).velocity({
                height: '5px'
              });
            });
          }
        });
      }
    } else if (_bgStyle == 1 || _bgStyle == 2) {
      $('#audio-player').add($volume).remove();
    }
  }

  function fn_volumeOn() {
    var $volume = $('#volume');
    var $volumeBar = $volume.find('span');

    $volumeBar.each(function() {
      var volumeHeight = Math.random() * 15 + 5;
      var volumeTiming = volumeHeight * 10;

      $(this).velocity({
        height: volumeHeight
      }, {
        duration: volumeTiming,
        complete: function() {
          fn_volumeOn();
        }
      });
    });
  }

/*=================================================
window on load
=================================================*/
$(window).on('load', function() {
    fn_audio();
});

/*=================================================
document on ready
=================================================*/
$(document).on('ready', function() {
  fn_core();
});


})(jQuery);