sap.ui.controller("view.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.main
*/
	onInit: function() {
		//create login data
		var loginData = {
			login: {
				success: false,
				userName: "",
				accessToken: "",
				roles: undefined
			}
		};
		// create JSON model instance
		//var oModel = new view.util.model.json.JSONModelExt();
		var oModel = new sap.ui.model.json.JSONModel();
		// set the data for the model
		oModel.setData(loginData);
		// set the model to the core
		this.getView().setModel(oModel);	
		
		// globales model definieren, in dem übergreifende Eigenschaften gehalten werden
		var oGlobalModel = new sap.ui.model.json.JSONModel();
		var globalData = {
				editProfileEnabled: false
		};
		oGlobalModel.setData(globalData);
		sap.ui.getCore().setModel(oGlobalModel, "globalModel");

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.main
*/
//	onExit: function() {
//
//	}


	/**
	 * Eventhandler for the login link
	 */
	login: function() {
		var view = sap.ui.getCore().byId("idLoginDialog");
		if(view === undefined) {
            view = sap.ui.view({id:"idLoginDialog", viewName: "view.loginDialog", type:sap.ui.core.mvc.ViewType.JS});
		}
		// for the following look here: http://bitstructures.com/2007/11/javascript-method-callbacks.html
		var obj = this;
		view.getController().openDialog(function(oData){obj.processLoginSuccess(oData);});
	},
	
	/**
	 * callback method that is called when the login was successful
	 * @param oData
	 */
	processLoginSuccess: function(oData) {
        // set data that has been delivered by login from backend into the model
		var oModel = this.getView().getModel();
		oModel.setProperty("/login/success", true);
		oModel.setProperty("/login/userName", oData.username);
		oModel.setProperty("/login/accessToken", oData.access_token);
		oModel.setProperty("/login/roles", oData.roles);
        var view = sap.ui.getCore().byId("idLoginDialog");
        if(view === undefined) {
            view.destroy();
        }
	},
	
	/**
	 * eventhandler for the logout link
	 */
	logout: function() {
		var oModel = this.getView().getModel();
		// hand the accessToken with every request to the server, even the logout request. Otherwise the backend does not know
		// whom to logout. 
		var header = {
            "Authorization": "Bearer " + oModel.getProperty("/login/accessToken")
        };
		oModel.loadData("api/logout", undefined, true, "POST", false, false, header );

		oModel.setProperty("/login/success", false);
		oModel.setProperty("/login/userName", "");
		oModel.setProperty("/login/accessToken", undefined);
		oModel.setProperty("/login/roles", undefined);
	}

});