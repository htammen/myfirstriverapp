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
		
		// create JSON model instance
        var oModel = new view.util.model.json.JSONModelExt();

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
	    // initialize the model with the credentials. So we do not need to do this everytime we test this application
        this.getView().getModel().setData({
            userName: "htammen",
            password: "test1234!"
        })

		this.fnSuccessCallback = fnSuccessCallback;
		this.getView().getContent()[0].open();
	},

    /**
     * process the click on the login button 
     */
	processLogin: function(oEvent, oLoginDialog) {
		this.oLoginDialog = oLoginDialog;
		var oModel = this.getView().getModel();
		// We have to provide username and password via URL query parameters because at backend the configuration property 
		// grails.plugin.springsecurity.rest.login.useRequestParamsCredentials=true
		// is set. For any reason the provision of this data in json format did not work. 
		var url = "api/login?username=" + oModel.getData().userName + "&password=" + oModel.getData().password;
		oModel.loadDataExt(url, this, this.loginCompleted, this.loginError, undefined, true, "POST", "application/x-www-form-urlencoded; charset=UTF-8");
	},
	
	/**
	 * is called if the login at backend side was successful
	 */
	loginCompleted: function(oData) {
		if(oData.error !== undefined || oData.success === false) {
			sap.ui.commons.MessageBox.alert(oData.error);
		} else {
			this.oLoginDialog.close();
			this.fnSuccessCallback(oData);
		}
	},

    /**
     * is called if the login at backend side was not succcessful
     */
	loginError: function(oData) {
		var message = oData.statusCode + "\n" + oData.statusText;
		sap.ui.commons.MessageBox.alert(message);
	}
});