import { 
	ExtensionContext, 
	WebviewOptions, 
	WebviewPanelOptions, 
	window, 
	ViewColumn
} from "vscode";
import { MainComponent } from "./core/components/MainComponent";
import { ClassMetadata } from "../common/types/backend.type";
import { HtmlTemplate } from "./core/HtmlTemplate";

export function runWebview(context: ExtensionContext, classMetadata: ClassMetadata) {
	const options: WebviewPanelOptions & WebviewOptions = {
		enableScripts: true,
		enableForms: true,
	}
	const title = `UML - ${classMetadata.className}`;
	const wvPanel = window.createWebviewPanel("uml-gen", title, ViewColumn.Beside, options);
	const template = new HtmlTemplate(wvPanel, context);
	template.render(new MainComponent(classMetadata));
}
