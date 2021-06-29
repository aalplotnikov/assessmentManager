import { Application } from "./src/components/Application.js";

webix.ready(() => {
    webix.i18n.setLocale("ru-RU")
    webix.Date.startOnMonday = true;
    const app = new Application();
    app.init()
    webix.ui(app.config())
    app.attachEvents()
});
