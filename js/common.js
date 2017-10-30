$(document).ready(function() {

    // ================================ //
    // Slideout Right Menu              //
    // ================================ //

    // Slideout Variable
    var slideoutRight = new Slideout({
        'panel': document.getElementById('panel'),
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('m-menu'),
        'padding': 256,
        'tolerance': 70,
        'side': 'right'
    });

       
    // Toggle button
    $('#toggle-button').click(function() {
        slideoutRight.toggle();
    });

  slideoutRight.on('beforeopen', function() {
        document.querySelector('.fixed').classList.add('fixed-open-right');
    });

    slideoutRight.on('beforeclose', function() {
        document.querySelector('.fixed').classList.remove('fixed-open-right');
    });

});