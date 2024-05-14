type DetailsCardMeta = {
  name?: string;
  isCollapse: boolean;
  labels: {
    labelName: {
      defaultValue: string;
      alias: string;
      labelTransformationCancelled?:boolean;
    };
    type: string;
    col?: number;
    row?: number;
    baseUrl?: string;
    custom?: boolean;
    templateName?: string;
  }[]
  isRowWise?: boolean;
  data?: any[];

};


// export { DetailsCardData, DetailsCardMeta };
