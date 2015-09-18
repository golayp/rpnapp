require.config({
    "baseUrl": "../../js",
    "shim" : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    
    "paths": {
        "jquery": "https://code.jquery.com/jquery-2.1.4",
        "bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
        "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore"
    }
});

require(['jquery','bootstrap','underscore','rpnapp'], function($) {
    $(document).ready(function(){
        rpnapp.init({
            debug:true
        });
    });    
});


