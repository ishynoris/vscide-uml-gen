import { Encapsulation } from "./encapsulation.types"
import { 
	ClassMetadata, 
	FileMetadata, 
	IParser, 
	IParserFile,
	KeyValue,
	Method,
	Optional, 
} from "./parser.type"

export const Mock = {
	method: {
		name: "",
		encapsulation: Encapsulation.allowed.none,
		returnType: "",
		args: [],
	},

	classMatadata: {
		attributes: [],
		imports: [],
		className: "",
		methods: [],
	},

	getMethodResult(): Optional<Method> {
		return new Optional(Mock.method)
	},

	getClassMetadataResult(): Optional<ClassMetadata> {
		return new Optional(Mock.classMatadata);
	},
	
	getParserFile(): IParserFile {
		return {
			parse(file: FileMetadata): Optional<ClassMetadata> { 
				return Mock.getClassMetadataResult();
			}
		}
	},

	getParserContent<T>(): IParser<T> {
		return {
			getPatternRegex(): string {
				return "";
			},

			getValue(group: KeyValue): T | undefined {
				return undefined;
			}
		}
	}
}