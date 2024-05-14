
export interface AppState{
    sampleText:string;
    permissions: Permissions | {};
    dropdowns: any | {};
    subMenuLinks:subMenuLinks[];
    dropdownFileStatus: any | {};
}

export interface Permissions {
    id: string | number;
    name: string;
    appRoute: null | string | string[];
    access: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
        cancel: boolean;
        import: boolean;
        export: boolean;
    };
}[];


export interface subMenuLinks {
    menu: string;
    dynamicLinks:string[];
}[];

export interface DropdownItem {
    listName: string;
    list:any;
};
export interface DropdownFileStatus {
    fileName: string;
    status: string;
}[];