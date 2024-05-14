type CreateTable={
    tableName:string;
    headers: {
        "labelName": {
            "defaultValue": string;
            "alias": string;
          };
        "type":string;
        "options"?:string[];
    }[];
    [data:string] : any;
    options?:[]
};



export { CreateTable };

