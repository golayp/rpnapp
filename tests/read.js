require.config(
{
    baseUrl: "../js",
    paths:{
        jquery: "https://code.jquery.com/jquery-2.1.4",
        bootstrap:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
        underscore:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore",
        knockout:"//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min",
        komapping:"//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min"
    },
    shim: {
        bootstrap : { 
            deps:['jquery']
        },
        knockout: {
            exports: 'ko'
        },
        komapping: {
            deps: ['knockout'],
            exports: 'komapping'
        },
        rpnapp: {
            exports:'rpnapp'
        }
    }
});

require(['jquery','underscore','bootstrap', 'knockout', 'komapping','rpnapp'], function($,us,boot, ko, komapping,rpnapp){
    if (!this.ko) {
        this.ko = ko;
    };
    ko.mapping = komapping;
    $(document).ready(function(){
        rpnapp.init({
            debug:true,
            location:$('.container'),
            track:false
        });
    });
});


