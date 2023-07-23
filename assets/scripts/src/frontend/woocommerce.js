/* global window, l, document, gtag */
window.addEventListener('load', function(event) {
    /**
     * Append:
     * data-a4you_event_remove_from_cart
     * data-a4you_add_to_cart_loop
     */
    document.querySelectorAll('[data-a4you_add_to_cart_loop], [data-a4you_event_remove_from_cart]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            if ('undefined' === typeof element.dataset.a4you_event || 'undefined' === typeof element.dataset.a4you_event_name || 'undefined' === typeof element.dataset.a4you_event_parameters) {
                return true;
            }
            /**
             * debug?
             */
            if ('undefined' !== window.a4you.debug && 'debug' === window.a4you.debug) {
                window.console.log([
                    element.dataset.a4you_event,
                    element.dataset.a4you_event_name,
                    JSON.parse(element.dataset.a4you_event_parameters)
                ]);
            }
            gtag(
                element.dataset.a4you_event,
                element.dataset.a4you_event_name,
                JSON.parse(element.dataset.a4you_event_parameters)
            );
        });
    });
    /**
     * Append button on single
     */
    document.querySelectorAll('.single_add_to_cart_button').forEach(function(element) {
        element.addEventListener('click', function(e) {
            var event_parameters;
            var quantity = 1;
            var event = 'event';
            var event_name = 'add_to_cart';
            if ( element.closest('form').querySelectorAll('.quantity input[type=number]').length ) {
                quantity = parseInt(element.closest('form').querySelectorAll('.quantity input[type=number]')[0].value);
            }
            event_parameters = {
                groups: window.a4you.gtag.groups,
                currency: window.a4you.woocommerce.currency,
                value: quantity * window.a4you.product.price,
                items: [
                    window.a4you.product
                ]
            };
            event_parameters.items[0].quantity = quantity;
            /**
             * debug?
             */
            if ('undefined' !== window.a4you.debug && 'debug' === window.a4you.debug) {
                event_parameters.debug = true;
                window.console.log([
                    event,
                    event_name,
                    event_parameters
                ]);
            }
            gtag(
                'event',
                'add_to_cart',
                event_parameters
            );
        });
    });
});
