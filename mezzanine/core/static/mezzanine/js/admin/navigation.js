
jQuery(function($) {

    // Empty out the breadcrumbs div and add the menu into it.
    $('body').prepend($('.dropdown-menu'));
    $('body').prepend($('.messagelist'));
    $('.admin-title').click(function() {location = window.__admin_url;});
    $('#user-tools').after($('.dropdown-menu form'));
    $('#header form').addClass('dark-select').find('select').chosen();
    $('.changelist-actions select').chosen();

    // Set the hrefs for the primary menu items to the href of their first
    // child (unless the primary menu item already has an href).
    $('.dropdown-menu a').each(function() {
       if ( $(this).attr('href') == '#' ) {
         $(this).attr('href', $(this).parent().find('.dropdown-menu-menu a:first').attr('href'));
       }
    });

    // Provides link to site.
    $('#user-tools li:last').before('<li>' + window.__home_link + '</li>');

    // Remove extraneous ``template`` forms from inline formsets since
    // Mezzanine has its own method of dynamic inlines.
    var removeRows = {};
    $.each($('*[name*=__prefix__]'), function(i, e) {
        var row = $(e).parent();
        if (!row.attr('id')) {
            row.attr('id', 'remove__prefix__' + i);
        }
        removeRows[row.attr('id')] = true;
    });
    for (var rowID in removeRows) {
        $('#' + rowID).remove();
    }

    // Hide all dropdown menus and apply click handlers.
    if (window.__admin_menu_collapsed) {
        $('.dropdown-menu-menu').removeClass('open').hide();
        $('.dropdown-menu > ul > li').click(function(){
            var menu = $(this).children('.dropdown-menu-menu');
            if (menu.length > 0){
                if (!menu.hasClass('open')) {
                    $('.dropdown-menu-menu').removeClass('open').hide(400);
                    menu.show(400).addClass('open');
                    return false;
                }
            }
        });
    }

    var pages, selected = false;
    $('.dropdown-menu ul li li > a').each(function() {
        // Open current section on load.
        var href = $(this).attr('href');
        if (href.substr(href.length - 12, href.length) == '/pages/page/') {
            pages = href;
        }
        $(this).click(function() {
            $('.dropdown-menu .selected').removeClass('selected');
            $(this).addClass('selected');
            return true;
        });
        if (location.pathname.indexOf(href) == 0) {
            selected = true;
            $(this).addClass('selected');
            if (window.__admin_menu_collapsed) {
                $(this).parent().parent().addClass('open').show();
            }
        }
    });
    if (!selected && location.pathname != window.__admin_url) {
        $('.dropdown-menu li li a[href="' + pages + '"]').addClass('selected');
    }

});
