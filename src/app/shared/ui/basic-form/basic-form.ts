type Sections = {
  sectionName: string;
  tabName?: string
  sectionDescription?: string;
}[]
type FieldConfig = {
  tabName: string;
  formName: string;
  labels: {
    sectionName: string;
    labelName: {
      defaultValue: string;
      alias: string;
    };
    type: string;
    required?:boolean;
    options?: {
      id: number;
      value: string;
    }[];
    defaultValue?:any;
    col?: number;
    disable?:boolean ;
    subLabel?: string[];
    total?:number;
    placeholder?: string;
    validations?:Validator;
  }[];
}[]
type Validator = {
  name: string;
  validator: any;
  message: string;
}[]

// New One



export { FieldConfig, Sections, Validator };

