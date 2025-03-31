import { Args, Method } from "../../../common/types/backend.type";
import { Encapsulation } from "../../../common/types/encapsulation.types";
import { Component, IComponent } from "../../../common/types/frontend.type";
import { KeyValue } from "../../../common/types/general.types";
import { Dom } from "../Dom";

export class MethodComponent implements IComponent {

	private formatter: Formatter;

	constructor(private method: Method) { 
		this.formatter = new Formatter(method);
	}

	static create(method: Method): Component {
		const component = new MethodComponent(method);
		const childs = [ component.getContent() ];
		return Dom.createDiv({ id: `method-${method.name}` }, childs) ;
	}

	static createMany(methods: Method[]): Component {
		const labels = methods.map(MethodComponent.create);
		return Dom.createDiv({ id: "container-methods" }, labels);
	}

	getContent(): Component {
		return Dom.createLabel({ text: this.formatter.getSignature() });
	}
}

class Formatter {
	constructor(private method: Method) { }

	getSignature(): string {
		const symbol = Encapsulation.getSymbol(this.method.encapsulation);
		const name = this.method.name;
		const args = this.getArgsName();
		const returnType = this.getReturnType();
		return `${symbol} ${name}(${args}): ${returnType}`;
	}


	getArgsName(): string {
		const mapArgName = (arg: Args): string => {
			let name = arg.name;
			if (arg.type != undefined) {
				name += `: ${arg.type}`;
			}
		
			if (arg.initialValue != undefined) {
				name += ` = ${arg.initialValue}`;
			}
			return _scapeHtmlEntity(name);
		}
		return this.method.args.map(mapArgName).join(", ");
	}

	getReturnType(): string {
		if (this.method.returnType == "") {
			return "void";
		}
		return _scapeHtmlEntity(this.method.returnType);
	}
}

function _scapeHtmlEntity(text: string): string {
	const htmlEntity: KeyValue = {
		"<": "&#60;",
		">": "&#62;",
	}

	for (let key in htmlEntity) {
		text = text.replaceAll(key, htmlEntity[key]);
	}
	return text;
}