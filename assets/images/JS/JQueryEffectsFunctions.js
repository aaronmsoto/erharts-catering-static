//Jquery Effects Functions...

//slideSwitch: Does a nice fading slideshow effect on DIVs...
function slideSwitch(targetElement, switchSpeed, bitRandom) {

    var $active = $('#' + targetElement + ' div.JQuerySlides div.CurrentlyActiveSlide');

    if ($active.length == 0) $active = $('#' + targetElement + ' div.JQuerySlides div:last');

    var $next = $active.next().length ? $active.next()
        : $('#' + targetElement + ' div.JQuerySlides div:first');

    // the following is used to pull the next slide randomly...
    if (bitRandom == 1) {
        var $sibs = $active.siblings();
        var rndNum = Math.floor(Math.random() * $sibs.length);
        var $next = $($sibs[rndNum]);
    }

    $active.addClass('LastActiveSlide');

    $next.css({ opacity: 0.0 })
        .addClass('CurrentlyActiveSlide')
        .animate({ opacity: 1.0 }, switchSpeed, function() {
            $active.removeClass('CurrentlyActiveSlide LastActiveSlide');
        });
}
