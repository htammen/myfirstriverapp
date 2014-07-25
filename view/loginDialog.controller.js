sap.ui.controller("view.loginDialog", {
	
	oLoginDialog: undefined,
	result: undefined,
	fnSuccessCallback: undefined,

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf firstsapui5app.startPageView
	 */
	onInit: function() {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		
		//create test data
		var data = {
//			userName: "meastheadmin",
//			password: "test1234"
				userName: "htammen",
				password: "test1234!"
		};
		// create JSON model instance
        var oModel = new view.util.model.json.JSONModelExt();
        //var oModel = new sap.ui.model.json.JSONModel();
		// set the data for the model
		oModel.setData(data);
		// set the model to the core
		this.oView.setModel(oModel);		
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf firstsapui5app.startPageView
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf firstsapui5app.startPageView
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf firstsapui5app.startPageView
	 */
//	onExit: function() {

//	}
	
	openDialog: function(fnSuccessCallback) {
		this.fnSuccessCallback = fnSuccessCallback;
		this.getView().getContent()[0].open();
	},

	processLogin: function(oEvent, oLoginDialog) {
	    /* schaltet temporär den Login Dialog aus 
        var oData = {
            userName: "htammen"
        }
		this.oLoginDialog = oLoginDialog;
		this.loginCompleted(oData);
        */	    
		this.oLoginDialog = oLoginDialog;
		var oModel = this.getView().getModel();
		var data = {
				ajax: true,
				j_username: oModel.getData().userName, 
				j_password: oModel.getData().password
			};
		oModel.loadDataExt("j_spring_security_check?j_username=htammen&j_password=test1234!", this, this.loginCompleted, this.loginError, data, true, "POST", "application/x-www-form-urlencoded; charset=UTF-8");
	},
	
	loginCompleted: function(oData) {
		if(oData.error !== undefined || oData.success === false) {
			sap.ui.commons.MessageBox.alert(oData.error);
		} else {
			this.oLoginDialog.close();
			this.fnSuccessCallback(oData);
		}
	},

	loginError: function(oData) {
		var message = oData.statusCode + "\n" + oData.statusText;
		sap.ui.commons.MessageBox.alert(message);
	}
});