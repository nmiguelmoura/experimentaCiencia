/**
 * Created by Nuno Machado on 20/09/16.
 */
var cc=cc||{};
cc.Main=(function(){
    'use strict';

    function Main(){
        this._init();
    }

    Main.prototype._checkIfCustomClass=function(){
        if(cc.CustomClass){
            this._customClass=new cc.CustomClass();
        }
    };

    Main.prototype._setUpPopupBar=function(){
        this._popubBar=new cc.PopupBar();
    };

    Main.prototype._setupAlerts=function(){
        this._alerts=new cc.Alerts();
    };

    Main.prototype._init=function(){
        this._setupAlerts();
        this._setUpPopupBar();

        //esta custom class existe apenas se uma determinada pagina necessitar de funcionalidades extra
        this._checkIfCustomClass();
    };

    return Main;
})();

cc.main=new cc.Main();