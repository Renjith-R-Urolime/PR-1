type Sections = {
    sectionName: string;
    tabName?: string
    // sectionDescription: string;
}[]
type FieldConfig = {
    tabName: string;
    formName: string;
    labels: [{
        sectionName: string;
        label: {
            labelName: string;
            value: string;
        };
        labels: {
            sectionName: string;
            label: {
                employeeName: string;
                designation: string;
            };

        },

    }]

}[]
type Validator = {
    name: string;
    validator: any;
    message: string;
}
export { Validator, FieldConfig, Sections };

