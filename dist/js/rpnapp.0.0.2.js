/*global _,ko*/
/*!
 * rpnapp 0.0.1 (https://github.com/golayp/rpnapp)
 * 
 * Dependencies: jquery 2.1.4, bootstrap 3.3.5, underscore 1.8.3
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var rpnapp = (function() {
    
    var opts;
    var viewModel;
    var lbls;
    var saveBtn;
    var dropBtn;
    var backBtn;

    var labels = {
        en: {
            beforeUnloadMsg:'Data not saved. Are-you sure you want to quit?'
        },
        fr: {
            beforeUnloadMsg:'Données non sauvegardées. Êtes-vous sûr de vouloir quitter?'
        }
    };

    var init = function(options) {
        if (options==null || _.isUndefined(options)) {
            options = {
                
            };
        }
        _.defaults(options, {
            location:$('body'),
            binded:function(){
            },
            addCustomBinding:function(vm){
            },
            customMapping: {},
            model:'model.json',
            modelKeyAttribute:'Id',
            track: true,
            language: "en",
            debug: false
        });
        opts = options;
        
        lbls = labels[opts.language];
        
        //if tracking then probably warn on before if not saved state
        if (opts.track) {
            $(window).on('beforeunload', function () {
                if (viewModel.tracker().somethingHasChanged()) {
                    return lbls.beforeUnloadMsg;
                }
            });
        }
        loadModel();
        log('rpnapp successfully initied');
    };
    
    
    var loadModel=function(){
        //Model can be given directly
        if(typeof(opts.model)==='object'){
            bindModel(opts.model);
        }else if(typeof(opts.model)==='string'){
            //if json string then load given string into viewModel
            try{
                opts.model=JSON.parse(opts.model);
            }catch(e){
                //else try to load model from given url
                $.getJSON(opts.model, function (mod) {
                    bindModel(mod);
                }).fail(function() {
                    log('Error getting model from url '+opts.model);
                });
            }
        }
    };
    
    var getModel=function(){
        return ko.mapping.toJS(viewModel);
    };
    
    
    var bindModel=function(mod){
        viewModel = ko.mapping.fromJS(mod,opts.customMapping);
        opts.addCustomBinding(viewModel);
        if(opts.track){
            viewModel.tracker = new changeTracker(viewModel);
        }
        ko.applyBindings(viewModel);
        opts.binded();
        log("model loaded successfully and binded to ui");
    };
    
    var rebindModel = function(mod){
        viewModel = ko.mapping.fromJS(mod,viewModel);
    };
    var getViewModel=function(){
        return viewModel;
    }
    var changeTracker=function(objectToTrack, hashFunction) {
        hashFunction = hashFunction || ko.toJSON;
        var lastCleanState = ko.observable(hashFunction(objectToTrack));
    
        var result = {
            somethingHasChanged: ko.dependentObservable(function () {
                return hashFunction(objectToTrack) != lastCleanState();
            }),
            markCurrentStateAsClean: function () {
                lastCleanState(hashFunction(objectToTrack));
            }
        };
        return function () { return result }
    };
    
    var isDirty=function(){
        if(opts.track){
            return viewModel.tracker().somethingHasChanged();
        }
        return false;
    };
    
    var markModelAsClean=function(){
        if(opts.track){
            return viewModel.tracker().markCurrentStateAsClean();
        }
        return false;
    };
    
    var log = function(msg) {
        if (opts.debug) {
            console.log(msg);
        }
    };
    
    var launchModal=function(modalOpts,todoOnValidation) {
        if (modalOpts==null || _.isUndefined(modalOpts)) {
            modalOpts = {
                
            };
        }
        _.defaults(modalOpts, {
            title: 'Title',
            content: '<p>Content</p>',
            validationBtn: {
                layout: 'danger',
                label: '<span class="glyphicon glyphicon-ok"></span> Validate'
            }
        });
        $('#rpnappmodal').remove();
        //Better use template engine... but unfortunately... not the time to give a try
        var modal=$('<div class="modal" id="rpnappmodal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+modalOpts.title+'</h4></div><div class="modal-body">'+modalOpts.content+'</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button></div></div></div></div>');
        var validationBtn = $('<button type="button" class="btn btn-' + modalOpts.validationBtn.layout + '">' + modalOpts.validationBtn.label + '</button>')
        $('.modal-footer', modal).append(validationBtn);
        $('body').append(modal);
        validationBtn.click(function(){
            modal.modal('hide');
            todoOnValidation();
        });
        modal.modal();
    };
    
    return {
        getViewModel:getViewModel,
        rebindModel:rebindModel,
        launchModal:launchModal,
        getModel:getModel,
        markModelAsClean:markModelAsClean,
        isDirty:isDirty,
        log:log,
        init: init
    };
})();