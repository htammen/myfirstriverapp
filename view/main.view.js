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
                text: "Logon",
                tooltip: "Please click hier to log on",
                visible: { 
                    path: "/login/success",
                    formatter: function(fValue) {
                        // link is visible when login/success is false
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
        /* When logged in to the backend we show the username, accesstoken and role in a simple label */
        var loginMessage = new sap.ui.commons.Label({
            text: {
				parts: [
					{path: "/login/userName"},
					{path: "/login/accessToken"},
					{path: "/login/roles"}
				],
                formatter: function(username, accessToken, roles) {
                    return "Welcome " + username + "; accessToken: " + accessToken + "; roles: " + roles; 
                }
            },
            visible: { 
                path: "/login/success",
                formatter: function(fValue) {
                    // link is visible when login/success is false
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
                        // link is visible when login/success is true
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

        // a simple vertical layout to display the links and the message
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
