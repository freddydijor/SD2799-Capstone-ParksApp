$(document).on('ready', function() {
    /*
     * Carousel Timer
     */
    $('#parkCarousel').carousel({
        interval: 4000
    });

    /*
     * Carousel Thumbnails
     */
    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click( function(){
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length -1);
        id = parseInt(id);
        $('#parkCarousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#parkCarousel').on('slid', function (e) {
        var id = $('.item.active').data('slide-number');
        id = parseInt(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-'+id+']').addClass('selected');
    });
        /*
     * Use this method to enable the search input area
     */
      $('#search').keyup(function() { //the #search is the Id from the input box
        var shrinkMe = $(this).val().toLowerCase(); //convert the text into lowercase 
        $('.list-group-item').hide();
        $('.list-group-item').each(function () {  //creating a loop to look each name until it find the word that I'm looking for
            var text = $(this).text().toLowerCase(); //get the values from each div .product
            if(text.indexOf(shrinkMe) != -1) { //match them with the values entered in the textbox
                $(this).show();
            }
        });
    });
});






