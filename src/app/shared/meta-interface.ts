interface FormLabelValidation {
  name?: string;
  validator?: any; // You can replace 'any' with a specific validator type if needed
  message?: string;
}

interface FormLabel {
  sectionName: string;
  labelName: {
    defaultValue: string;
    alias: string;
  };
  labelTransformationCancelled?: boolean;
  placeholder?: string;
  type?: string;
  col?: number;
  hide?: boolean;
  disable?: boolean;
  offset?: number;
  minimum?: number;
  maximum?: number;
  apiLink?: string;
  scope?: string;
  subLabel?: string[];
  total?: number;
  jsonListName?: string;
  multiple?: boolean;
  fetchCondition?: string[];
  fieldDisable?: boolean;
  step?: number;
  default?: boolean;
  maxLength?: number;
  required?: boolean;
  optional?: boolean;
  options?: {
    id: number;
    value: string;
  }[];
  validations?: FormLabelValidation[];
  min?: number;
  max?: number;
  onCreateVisible?: boolean;
  onEditVisible?: boolean;
  defaultValue?: string | Date;
  capitalize?:boolean;
  exclude?:boolean;
  showTooltip?:boolean
}

interface FormMeta {
  tabName?: string;
  sectionName?: string;
  formName?: string;
  index?: number;
  labels?: FormLabel[];
}

interface TrazepoidTabsMeta {
  label: string;
  showLabel?: string;
  isCustomView?:boolean;
  tabIndex: number;
  tableData?: TableData;
}[]

interface TrazepoidTabsData {
  meta: TrazepoidTabsMeta
}

type TableData = {
  isActionColumn?: boolean;
  isHeaderOption?:boolean;
  imageColumn?: string;
  redirectUrl? : string;
  columns?: TableMeta[],
  pathId?: string;
  queryParams?: string;
  customAction?:boolean;
}

interface TableMeta {
  name: string;
  imageKey?: string;
  type?: string;
  baseUrl?: string;
  custom?: boolean,
  template?: string
}

interface DetailsCardMeta {
  name?: string;
  logo?: string;
  isCollapse?: boolean;
  labels: {
    labelName: {
      defaultValue: string;
      alias: string;
      labelTransformationCancelled?: boolean;
    };
    type?: string;
    showMore?:boolean;
    baseUrl?: string;
    col?: number;
    row?: number;
    custom?: boolean;
    templateName?: string;
    onCreateVisible?: boolean;
    hide?: boolean;
  }[]
  isRowWise?: boolean;
  data?: any[];
};

interface DetailsCardData {
  meta: DetailsCardMeta[],
  data?: any[]
}

interface ResponseFilterMeta {
  labels: {
    sectionName: string;
    labelName: {
      defaultValue: string;
      alias: string;
      customQueryParamsName?:string;
    };
    apiLink?: string;
    jsonListName?: string;
    multiple?: boolean;
    required?: boolean;
  }[]
}

interface ReportFilterMeta {
  labels: {
    sectionName: string;
    labelName: {
      defaultValue: string;
      alias: string;
    };
    apiLink?: string;
    jsonListName?: string;
    multiple?: boolean;
    placeholder?: string;
    type?: string;
    defaultValue?: string | Date;
  }[]
}








export { DetailsCardData, DetailsCardMeta, FormLabel, FormLabelValidation, FormMeta, ResponseFilterMeta, TableData, TableMeta, TrazepoidTabsData, TrazepoidTabsMeta, ReportFilterMeta };

