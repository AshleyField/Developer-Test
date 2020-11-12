//Initialising JS File

$(document).ready(function(){


    //Open and close cart on click
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
    });

    $('input').change(function(){
        $('.add-to-cart').prop('disabled', false);
    })

    //Add to cart
    
    //Initiliase Array
    var cartArray = [];

    var productCount = 0;

    //On click of 'add to cart' button get selected value. If value in cart update, if not create a new cart item.
    $('.add-to-cart').on('click', function(){ 
        var selected = $('input:checked').val();
        var productPrice = $('input:checked').data('price');
        var productName = $('input:checked').data('name');
        var productImage = $('input:checked').data('image');

        var productQuantity = 0;

        //Check if the product is in trhe cart array
        var checkArray = jQuery.inArray(selected, cartArray);

        //If selected product not in the cart array add a new row
        if(checkArray < 0){
            productQuantity = 1;
            productCount +=1; 
            $('.cart-container').append('<div class="cart-item" data-id="'+selected+'" data-qty="'+productQuantity+'"> \
            <div class="cart-item-image"> \
                <img src="'+productImage+'" alt=""> \
            </div> \
            <div class="cart-item-info"> \
                <div class="cart-item-title cart-text"> \
                    <span>'+productName+'</span> \
                </div> \
                <div class="cart-item-qty cart-text"> \
                    <span class="cart-item-single-qty">'+productQuantity+'</span><span> x <strong>$75.00</strong></span> \
                </div> \
                <div class="cart-item-variant cart-text"> \
                    <span>Size: '+selected+'</span> \
                </div> \
            </div> \
            <div class="cart-remove"><button>Remove</button></div> \
            </div>')

            //Add new row ID to cart array
            cartArray.push(selected);

            $('.cart-bubble').text(productCount);

            $('.cart-empty').remove();
        }

        //If product is in cart array increase previous quantity by 1
        else {
            productQuantity = parseInt($('*[data-id='+selected).data('qty'));
            productQuantity += 1;
            $('*[data-id='+selected).find('.cart-item-single-qty').text(productQuantity);
            var cartItem = $('*[data-id='+selected);
            cartItem = cartItem.data('qty', productQuantity);

            productCount +=1;
            $('.cart-bubble').text(productCount);
        }
    });

    //On click of remove button remove item from cart

    $('.cart-container').on('click', '.cart-remove', function(){
        
        //get product id that has been removed.
        var productID = $(this).parent().data('id');
        var productCartQty = $(this).parent().data('qty');

        //Remove product from array
        cartArray = $.grep(cartArray, function(value){
            return value != productID
        })

        productCount = productCount - productCartQty;
        $('.cart-bubble').text(productCount);

        //delete cart row
        $(this).parent().remove();
        console.log(cartArray);

        if(cartArray == ""){
            $('.cart-container').append('<p class="cart-empty">Cart Empty...</p>');
        }
    });

    //Make cart icon have class when cart container is hovered
    $('.cart-container').on('mouseenter mouseleave', function(){
        $('.cart-icon').toggleClass('icon-hovered');
    });
});