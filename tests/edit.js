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
            drop:function(mod){
                //alert(JSON.stringify(mod));
            },
            save:function(mod){
                //alert(JSON.stringify(mod));
                rpnapp.log(JSON.stringify(mod));
                return true;
            },
            addCustomBinding:function(viewModel){
                viewModel.moveUp = function (item) {
                    var i = viewModel.Items().indexOf(item);
                    if (i > 0) {
                        var items = viewModel.Items();
                        viewModel.Items.splice(i - 1, 2, items[i], items[i - 1]);
                    }
                };
                viewModel.moveDown = function (item) {
                    var i = viewModel.Items().indexOf(item);
                    if (i < viewModel.Items().length - 1) {
                        var items = viewModel.Items();
                        viewModel.Items.splice(i, 2, items[i + 1], items[i]);
                    }
                };
                viewModel.addItem=function(){
                    viewModel.Items.push(
                        ko.mapping.fromJS(
                        {
                            Id:-viewModel.Items().length,
                            Description:"new item",
                            NavigationUrl:"http://www.google.com"
                        }));
                };
                viewModel.removeItem=function(item){
                    viewModel.Items.remove(item);
                };
            }
        });
    });
});


