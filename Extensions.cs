using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Web;
using System.Web.UI; 

/// <summary>Commonly-used or shared functions for the website</summary>
public static class Common
{
	// Helper method to add JS code to document ready client side
	public static void RunScriptOnLoad (this Page page, string key, string script) {
		ScriptManager.RegisterStartupScript(page, page.GetType(), key, "$(document).ready(function() {" + script + "});", true);
	}
	
	// Extension method to add TimeBox JS code to a standard ASP.NET textbox control
	public static void TimeBox (this TextBox control) {
		RunScriptOnLoad(control.Page, "auto-" + control.ClientID, "TimeBox.wireFormatTimeInput('" + control.ClientID + "');");
	}	
}