//Initialising JS File

$(document).ready(function(){

    $('.cart-icon').on('click', function(){
        var cartState = $('.cart-container').data('state');

        if(cartState == 'closed'){
            $('.cart-container').addClass('visible')
                                .removeClass('hidden')
                                .data('state', 'open');
            $('.cart-icon').addClass('icon-clicked');
        }

        else {
            $('.cart-container').addClass('hidden')
                                .removeClass('visible')
                                .data('state', 'closed');
            $('.cart-icon').removeClass('icon-clicked');
        }
    })
});