sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	"sap/m/Bar",
	"sap/m/MessageToast"
], function (Component, Button, Bar, MessageToast) {

	return Component.extend("<%= namespace %>.<%= projectName %>.Component", {

		metadata: {
			"manifest": "json"
		},

		init: function () {
			var oRendererPromise = this._getRenderer();
			var oResBundle = this.getModel("i18n").getResourceBundle();

<% if (headerTemplate) { %>
			/**
			 * Sample for Header Extension.
			 */
			oRendererPromise.then(function (oRenderer) {
				oRenderer.addHeaderItem({
					icon: "sap-icon://add",
					tooltip: oResBundle.getText("HEADER_BUTTON_TOOLTIP"),
					press: function () {
						MessageToast.show(oResBundle.getText("HEADER_BUTTON_MESSAGE"));
					}
				}, true, true);
			});
	<% } %>

<% if (footerTemplate) { %>
			/**
			 * Sample for Footer Extension.
			 */
			oRendererPromise.then(function (oRenderer) {
				oRenderer.setFooterControl("sap.m.Bar", {
					id: "flpFooter",
					contentLeft: [new Button({
						text: oResBundle.getText("FOOTER_BUTTON"),
						press: function () {
							MessageToast.show(oResBundle.getText("FOOTER_BUTTON_MSG"));
						}
					})]
				});
			});
<% } %>

<% if (actionButtonTemplate) { %>
			/**
			 * Sample for Action Button Extension.
			 * The first button is only visible if the Home page of SAP Fiori launchpad is open.
			 */
			oRendererPromise.then(function (oRenderer) {
				oRenderer.addActionButton("sap.m.Button", {
					id: "myHomeButton",
					icon: "sap-icon://car-rental",
					text: oResBundle.getText("ACTION_BUTTON_FLP_CONTEXT"),
					press: function () {
						MessageToast.show(oResBundle.getText("ACTION_BUTTON_MSG", "LAUNCHPAD"));
					}
				}, true, false, [sap.ushell.renderers.fiori2.RendererExtensions.LaunchpadState.Home]);

				/*
				 * The second button is only visible when an app is open.
				 */
				oRenderer.addActionButton("sap.m.Button", {
					id: "myAppButton",
					icon: "sap-icon://collision",
					text: oResBundle.getText("ACTION_BUTTON_APP_CONTEXT"),
					press: function () {
						MessageToast.show(oResBundle.getText("ACTION_BUTTON_MSG", "APPLICATION"));
					}
				}, true, false, [sap.ushell.renderers.fiori2.RendererExtensions.LaunchpadState.App]);
			});
<% } %>
		},

		/**
		 * Returns the shell renderer instance in a reliable way,
		 * i.e. independent from the initialization time of the plug-in.
		 * This means that the current renderer is returned immediately, if it
		 * is already created (plug-in is loaded after renderer creation) or it
		 * listens to the &quot;rendererCreated&quot; event (plug-in is loaded
		 * before the renderer is created).
		 *
		 *  @returns {object}
		 *      a jQuery promise, resolved with the renderer instance, or
		 *      rejected with an error message.
		 */
		_getRenderer: function () {
			var that = this,
				oDeferred = new jQuery.Deferred(),
				oRenderer;

			that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!that._oShellContainer) {
				oDeferred.reject(
					"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
			} else {
				oRenderer = that._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					// renderer not initialized yet, listen to rendererCreated event
					that._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject("Illegal state: shell renderer not available after recieving 'rendererLoaded' event.");
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}
			return oDeferred.promise();
		}
	});
});