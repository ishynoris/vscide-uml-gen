import { FileMetadata } from "../../../common/types/backend.type";
import { WorkspaceFiles } from "../../../common/types/classes.type";
import { IPackageMapper } from "../../../common/types/interfaces.type";
import { Workspace } from "../../util";

export class JavaPackageMapper implements IPackageMapper {

	private extension: string;

	constructor(private workspace: WorkspaceFiles) {
		this.extension = "java";
	}

	public getFile(parts: string[]): undefined | FileMetadata {
		let name = parts[parts.length - 1];
		name = `${name}.${this.extension}`;
		if (!this.workspace.hasFileName(name)) {
			return undefined;
		}
		
		let absolutePath = Workspace.getAbsolutePath(this.extension, parts);
		if (absolutePath == undefined) {
			return undefined;
		}

		if (!absolutePath.endsWith(`.${this.extension}`)) {
			absolutePath = `${absolutePath}.${this.extension}`;
		}

		return this.workspace.getFromPath(absolutePath);
	}
}