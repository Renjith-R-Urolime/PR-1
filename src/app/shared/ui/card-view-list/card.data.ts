type CardMeta={
    name:string;
    logo?:string;
    labels:{
        labelName:{
            defaultValue:string;
            alias:string;
        }
    }[];
    data?:any[];
}

type CardData={
    meta:CardMeta[],
    data?:any[]
}

export { CardData, CardMeta };

