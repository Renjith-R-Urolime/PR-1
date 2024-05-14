export interface Tables{
    tableName:string;
    pinnedHeaders:any[];
    pin:boolean[];
    hideCol:boolean[];
    checkedCol:boolean[];
}

export interface TableSate{
    tables:Tables[];
}