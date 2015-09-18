/*!
 * rpnapp 0.0.1 (https://github.com/golayp/rpnapp)
 * 
 * Dependencies: jquery 2.1.4, bootstrap 3.3.5, underscore 1.8.3
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnapp = (function() {
    var debug;
    var language;

    var labels = {
        en: {
            
        },
        fr: {
            
        }
    };

    var init = function(opts) {
        if (_.isUndefined(opts)) {
            opts = {};
        }
        _.defaults(opts, {
            language: "en",
            debug: false
        });
        debug = opts.debug;
        log('rpnapp successfully initied');
    };
    
    var log = function(msg) {
        if (debug) {
            console.log(msg);
        }
    };
    
    return {
        init: init
    };
})();