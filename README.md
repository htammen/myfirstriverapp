myfirstriverapp
===============

RDE SAPUI5 application that shows login to a on-premise Grails (Java) backend with spring security

## Details ##
The backend of this application that is not part of this github project is a Grals 2.3.5 application with Spring Security configured for authentication.  
This backend was provided to the frontend via the SAP Cloud Connector. So the backend runs at a local machine.

The installed Grails plugins are as follows

```
plugins {
    // plugins for the build system only
    build ":tomcat:7.0.47"

    // plugins for the compile step
	...
	compile ':spring-security-core:2.0-RC4'
	compile ":spring-security-ui:1.0-RC2"
	compile ":spring-security-rest:1.4.0.RC5"
	...

    // plugins needed at runtime but not for compilation
    ...
}
```
The security configuration in config.groovy of the Grails project is done like this

```
grails {
	plugin {
		springsecurity {
			userLookup.userDomainClassName = 'mypackage.User'
			userLookup.authorityJoinClassName = 'mypackage.security.UserRole'
			authority.className = 'mypackage.security.Role'
			requestMap.className = 'mypackage.security.Requestmap'
			securityConfigType = 'Requestmap'
			// Spring security rest plugin configuration
			filterChain.chainMap = [
				'/api/**': 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter',  // Stateless chain for REST
				'/**': 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'  // Traditional chain
			]
			rest {
				token {
					validation {
						enableAnonymousAccess = true
					}
					storage {
						useMemcached = true
					}
				}
				login {
					usernamePropertyName='username'
					passwordPropertyName='password'
					failureStatusCode=401
					useRequestParamsCredentials=true // json payload does not work, not time to investigate this
				}
			}
		}
	}
}

```

The sapui5 ui that is enclosed in this github project shows a very simple ui with a login link at the beginning. When the user clicks this link a login dialog is presented in which you can enter your login credentials. After clicking "OK" in this dialog a backend request to url "api/login" is established. When the authentication was successful a message with the returned payload (username, accesstoken and roles) is shown. Additionally a logout link is presented to logout from the backend again by calling the url "api/logout".

## To be done in a real application ##
In a real application you would save the accessToken that is returned by the backend via the login process securely in your frontend and send it with every following request to the backend. This is your security credential for your stateless REST communication. 
