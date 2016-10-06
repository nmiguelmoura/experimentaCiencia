/**
 * Created by Nuno Machado on 20/09/16.
 */
var cc=cc||{};
cc.PopupBar=(function(){
    'use strict';

    function PopupBar(){
        this._popupIsVisible=false;
        this._popupTabOn=null;
        this._init();
    }

    PopupBar.prototype._backgroundAction=function(event){
        //esconder a barra completa
        this._hideBar();
    };

    PopupBar.prototype._disableBackground=function(){
        this._background.removeEventListener('click',this._backgroundActionEventBinding,false);
        //this._background.removeEventListener('touchstart',this._backgroundActionEventBinding,false);
    };

    PopupBar.prototype._enableBackground=function(){
        this._backgroundActionEventBinding=this._backgroundAction.bind(this);
        this._background.addEventListener('click',this._backgroundActionEventBinding,false);
        //this._background.addEventListener('touchstart',this._backgroundActionEventBinding,false);
    };

    PopupBar.prototype._changeButtonClass=function(key,active){
        //alterar a classe dos botoes para ativo ou nao-ativo
        if(active){
            this._buttonDiv[this._popupTabOn].className='menu-btn menu-btn-on';
            this._buttons[this._popupTabOn].className='menu-img-btn menu-img-on';
        }else{
            this._buttonDiv[this._popupTabOn].className='menu-btn menu-btn-off';
            this._buttons[this._popupTabOn].className='menu-img-btn menu-img-off';
        }
    };

    PopupBar.prototype._hideTab=function(){
        if(this._popupTabOn!==null){
            this._popupBarElements[this._popupTabOn].style.display='none';
            this._changeButtonClass(this._popupTabOn,false);
            this._popupTabOn=null;
        }
    };

    PopupBar.prototype._showTab=function(key){
        //esconder a tab caso a ativa seja diferente da nova clicada
        this._hideTab();

        //mostrar a nova tab
        this._popupBarElements[key].style.display='block';
        this._popupTabOn=key;

        //alterar a cor do botao
        this._changeButtonClass(key,true);
    };

    PopupBar.prototype._hideBar=function(){
        //desativar o fadded-screen
        this._disableBackground();

        //alterar a cor do botao
        this._changeButtonClass(this._popupTabOn,false);

        //esconder a barra popup
        this._popupBar.style.display='none';
        this._popupIsVisible=false;

        //esconder a tab ativa para evitar conflitos da proxima vez que o utilizador clicar num botao
        this._hideTab();
    };

    PopupBar.prototype._showBar=function(key){
        //ativar o fadded-screen
        this._enableBackground();

        //mostrar a tab correspondente
        this._showTab(key);

        //mostrar a barra popup
        this._popupBar.style.display='block';
        this._popupIsVisible=true;
    };

    PopupBar.prototype._buttonAction=function(event){
        var elementClicked=event.currentTarget,
            tagExpected='DIV',
            elementKey=elementClicked.key;

        //verificar se o objeto clicado tem as carateristicas do botao
        if(elementClicked && elementClicked.tagName===tagExpected){
            if(!this._popupIsVisible){
                //caso a popupbar nao esteja visivel
                this._showBar(elementKey);
            }else{
                //caso a popupbar ja esteja no ecra
                if(this._popupTabOn===elementKey){
                    //se o botao clicado e o mesmo da tab ativa, esconder a popup bar
                    this._hideBar();
                }else{
                    //se o botao clicado e diferente do ativo, mostrar o novo
                    this._showTab(elementKey);
                }
            }

        }
    };

    PopupBar.prototype._addListeners=function(){
        //adicionar os eventos aos botoes
        this._buttons.forEach(function(btn,index){
            btn.key=index;
            btn.addEventListener('click',this._buttonAction.bind(this),false);
            //btn.addEventListener('touchstart',this._buttonAction.bind(this),false);
        },this);
    };

    PopupBar.prototype._getButtonReferences=function(){
        //referencias para os icones dos botoes do cabecalho
        this._buttonDiv=[
            document.getElementsByClassName('menu-btn')[0]
        ];

        this._buttons=[
            document.getElementsByClassName('menu-img-btn')[0]
        ];
    };

    PopupBar.prototype._getPopupReferences=function(){
        //referencias para o popup e para os elementos constituintes
        this._popupBar=document.getElementsByClassName('wrapper-popup-bar')[0];
        this._popupBarElements=[
            document.getElementsByClassName('popup-menu')[0]
        ];

        //referencia para o ecra de fade
        this._background=document.getElementsByClassName('fadded-screen-popup-bar')[0];
    };

    PopupBar.prototype._init=function(){
        this._getPopupReferences();
        this._getButtonReferences();
        this._addListeners();
    };

    return PopupBar;
})();
