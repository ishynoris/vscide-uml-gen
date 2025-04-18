import { Package } from "../../../common/types/backend.type";
import { Optional } from "../../../common/types/classes.type";
import { KeyValue } from "../../../common/types/general.types";
import { IPackageMapper, IParser } from "../../../common/types/interfaces.type";
import { Regex } from "../../util";

export class PhpImportsParser implements IParser<Package> {

	constructor(private mapper: IPackageMapper) {

	}

	hasRequiredValues(groups: KeyValue): boolean {
		return groups._pack_use != undefined;
	}

	getPatternRegex(): string {
		const useKey = `(use)${Regex.BlankReq}`;
		const namespaceKey = `[${Regex.Letters}${Regex.Numbers}${Regex.Blank}_\\-\\\\]+`
		return `${useKey}(?<_pack_use>${namespaceKey});`;
	}

	getValue(groups: KeyValue): Optional<Package> {
		const uses = groups._pack_use ?? "";
		if (uses.length == 0) {
			const errors = [ `Cannot get value of Package` ];
			return new Optional<Package>(undefined, errors);
		}

		const importsPart = uses.split("\\");
		const lastIndexPackage = importsPart.length - 1;
		const className = importsPart[lastIndexPackage];

		const pack = {
			classImported: className,
			package: uses,
			file: this.mapper.getFile(importsPart),
		}
		return new Optional(pack);
	}
}