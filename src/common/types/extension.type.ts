enum Type {
	PHP = "php",
	Java = "java",
}

type Dictionary = { [ key: string ]: Allowed }

export type Allowed = Type;

export const Extensions = {
	map: (): Dictionary => {
		return {
			"php": Type.PHP,
			"java": Type.Java,
		}
	},

	isValid: (extension: string): boolean => {
		const map = Extensions.map();
		return map[extension] != undefined;
	},

	to: (extension: string): Allowed => {
		Extensions.throwErrorIfInvalid(extension);

		const map = Extensions.map();
		return map[extension];
	},

	throwErrorIfInvalid: (extension: string) => {
		if (!Extensions.isValid(extension)) {
			throw new Error(`Extension "${extension}} not allowed."`);
		}
	}
}