jQuery.sap.require("sap.ui.model.json.JSONModel");  
sap.ui.model.json.JSONModel.extend("view.util.model.json.JSONModelExt", {  
	//declare our new method including two new parameters fnSuccess and fnError, our callback functions  
	loadDataExt: function(sURL, object, fnSuccess, fnError, oParameters, bAsync, sType, sContentType, bMerge, bCache){
		var that = this;  
		if (bAsync !== false) {  
			bAsync = true;  
		}  
		if (!sType)          {  
			sType = "GET";  
		}  
		if (bCache === undefined) {  
			bCache = this.bCache;  
		}
        // Contenttype auf application/json setzen, wenn es sich um einen anderen als einen GET-Request handelt.
        // Wichtig für GRAILS
        // Wurde der ContentType aber schon von außen übergeben, wird der übergebene verwendet.
        if(!sContentType) {
            if (sType === "GET") {
                sContentType = "application/x-www-form-urlencoded; charset=UTF-8";
            } else {
                sContentType = "application/json; charset=UTF-8";
            }
        }
		this.fireRequestSent({url : sURL, type : sType, async : bAsync, info : "cache="+bCache+";bMerge=" + bMerge});  
		jQuery.ajax({  
			url: sURL,  
			async: bAsync,  
			dataType: 'json',
            accepts: {json: "application/json"},
            contentType: sContentType,
			cache: bCache,
			data: oParameters,  
			type: sType,
			success: function(oData) {
				if (!oData) {  
					jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + sURL);  
				}  
				that.setData(oData, bMerge);  
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});  
				// call the callback success function if informed  
				if (typeof fnSuccess === 'function') {
					if(object !== undefined) {
						fnSuccess.apply(object, [oData]);
					} else {
						fnSuccess(oData);
					}
				}  
			},  
			error: function(XMLHttpRequest, textStatus, errorThrown){  
				jQuery.sap.log.fatal("The following problem occurred: " + textStatus, XMLHttpRequest.responseText + ","  
						+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);  
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});  
				that.fireRequestFailed({message : textStatus,  
					statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});  
				// call the callback error function if informed  
				if (typeof fnError === 'function') {
					if(object !== undefined) {
						fnError.apply(object, [{message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText}]);
					} else {
						fnError({message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});  
					}
				}  
			}  
		});  
	}  
});  