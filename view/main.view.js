sap.ui.jsview("view.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.main
	*/ 
	getControllerName : function() {
		return "view.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.main
	*/ 
	createContent : function(oController) {
        var loginLink = new sap.ui.commons.Link({
                text: "Login",
                tooltip: "Melden Sie sich hier an",
                visible: { 
                    path: "/login/success",
                    formatter: function(fValue) {
                        // hier müssen wir den negierten Wert der Model property /login/succes auswerten.
                        if(fValue) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },	
                press: 
                    function(oEvent) {
                        oController.login(); 
                    }
        });
        var loginMessage = new sap.ui.commons.Label({
            text: {
				parts: [
					{path: "/login/userName"}
				],
                formatter: function(fValue) {
                    return "Welcome " + fValue; 
                }
            },
            visible: { 
                path: "/login/success",
                formatter: function(fValue) {
                    // hier müssen wir den negierten Wert der Model property /login/succes auswerten.
                    if(fValue) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },	
        });
        var logoutLink = new sap.ui.commons.Link({
                text: "Logout",
                tooltip: "Log out of the application",
                visible: { 
                    path: "/login/success",
                    formatter: function(fValue) {
                        // hier müssen wir den negierten Wert der Model property /login/succes auswerten.
                        if(fValue) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },	
                press: 
                    function(oEvent) {
                        oController.logout(); 
                    }
        });

        var vertLayout = new sap.ui.layout.VerticalLayout(
            "myLayout",
            {
                content: [
                    loginLink,
                    loginMessage,
                    logoutLink
                ]
            }
        );
        return vertLayout;
	}

});
