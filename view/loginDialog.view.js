sap.ui.jsview("view.loginDialog", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf firstsapui5app.startPageView
	*/ 
	getControllerName : function() {
		return "view.loginDialog";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf firstsapui5app.startPageView
	*/ 
	createContent : function(oController) {
		var oLoginDialog = new sap.ui.commons.Dialog();
		oLoginDialog.setTitle("Anmeldung");
		var oText = new sap.ui.commons.TextView({text: "Bitte geben Sie Ihren Benutzernamen\nund ihr Passwort ein"});
		oLoginDialog.addContent(oText);
		var btnOk = new sap.ui.commons.Button({	text: "OK"});
		btnOk.attachPress(oLoginDialog, oController.processLogin, oController);
		oLoginDialog.addButton(btnOk);
		oLoginDialog.setDefaultButton(btnOk);
		var oLoginForm = new sap.ui.layout.form.SimpleForm(
		        {
					maxContainerCols: 2,
					layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout,
					content:[
							new sap.ui.commons.Label({text:"Benutzername"}),
							new sap.ui.commons.TextField({value:"{/userName}", tooltip: "Bitte geben Sie Ihren Benutzernamen ein"}),
							new sap.ui.commons.Label({text:"Passwort"}),
							new sap.ui.commons.PasswordField({value:"{/password}", tooltip: "Bitte geben Sie Ihr Passwort ein"}),
						]
		        });
		oLoginDialog.addContent(oLoginForm);
		
		return oLoginDialog;
	},
	
});
