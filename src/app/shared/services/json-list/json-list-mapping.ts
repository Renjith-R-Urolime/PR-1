// mapping.ts
export const fieldMappings = {
    country: {
      fileName: 'countries',
    },
    currency: {
      fileName: 'countries',
    },
    timezone: {
      fileName: 'countries',
      extractProperty: 'timezones',
      parentIdName: 'countryId',
    },
    accountType: {
      fileName: 'chartsAccountTypes',
    },
    bankAccountType: {
      fileName: 'bankAccountTypeList',
    },
    cycleType: {
      fileName: 'payrollCycleTypeList',
    },
    payrollItem: {
      fileName: 'payrollItemList',
    },
    leaveItemType: {
      fileName: 'payrollItemList',
    },
    leavePayType:{
      fileName: 'leavePayType'
    },
    entitlementUnit:{
        fileName: 'entitlementUnit'
    },
    accrualType:{
        fileName: 'accrualTypeList'
    },
    type: {
      fileName: 'componentTypeList',
    },
    subType: {
      fileName: 'componentTypeList',
      extractProperty: 'subType',
      parentIdName: 'componentTypeId',
    },
    gender: {
      fileName: 'genderList',
    },
    religion: {
      fileName: 'religionList',
    },
    maritalStatus: {
      fileName: 'maritalStatusList',
    },
    salutation: {
      fileName: 'salutationList',
    },
    nationality: {
      fileName: 'nationalityList',
    },
    ethnicity: {
      fileName: 'ethnicityList',
    },
    leaveTransactionType:{
      fileName: 'leaveTransactionTypesList'
    },
    bloodGroup: {
      fileName: 'bloodGroupList',
    },
    accrualFrequency:{
      fileName: 'accrualFrequencyList'
    },
    payCalculation:{
      fileName: 'payCalculationList'
    },
    relationship: {
      fileName: 'relationshipList',
    },
    employeeContract: {
      fileName: 'employeeContractList',
    },
    shift: {
      fileName: 'shiftsList',
    },
    employeePermission: {
      fileName: 'employeePermissionList',
    },
    formulaTypeList: {
      fileName: 'formulaTypeList',
    },
    infithraFormulaList: {
      fileName: 'infithraFormulaList',
    },
    duration:{
      fileName: "leaveDurationList"
    },
    calendarDay:{
      fileName: "calendarDay"
    },
    toleranceTime:{
      fileName: "toleranceTimeList"
    },
    timeoffAdjustmentType:{
      fileName: "timeoffAdjustmentTypeList"
    },
    salaryAllocation:{
      fileName: "salaryAllocationList"
    },
    attendanceStatus:{
      fileName: "attendanceStatusList"
    },
    eosType:{
      fileName: "eosTypeList"
    },
    payableCycleList:{
      fileName: "payableCycleList"
    },
    overtimeTypeList:{
      fileName: "overtimeTypeList"
    },
    requestType:{
      fileName: "requestTypeList"
    },
    installmentRecoveryType:{
      fileName: "installmentRecoveryTypeList"
    },
    paymentMethod:{
      fileName: "paymentMethodList"
    },
    payrollType:{
      fileName: "payrollTypeList"
    },
    payrollFrequency:{
      fileName: "payrollFrequencyList"
    },
    transactionType:{
      fileName: 'payrollIntermediateTypeList'
    },
    employeeLeavePlanStatus:{
      fileName: 'employeeLeavePlanStatusList'
    },
    infithraFormula:{
      fileName: 'infithraFormulaList'
    },
    formulaType:{
      fileName: 'formulaTypeList'
    },
    shiftsList:{
      fileName: 'shiftsList'
    },
    transactionStatus:{
      fileName: 'finalTransactionStatus'
    },
    month:{
      fileName: 'monthList'
    },
    dateFormat:{
      fileName: 'dateFormatList'
    },
    timeFormat:{
      fileName: 'timeFormatList'
    },
    decimalPlace:{
      fileName: 'decimalPlaceList'
    },
    approvalLevels:{
      fileName: 'approvalLevelList'
    }
  };

  export function getFileName(fieldName: string): {
    fileName?: string;
    extractProperty?: string;
    parentIdName?: string;
  } {
    const mapping = fieldMappings[fieldName];
    return mapping || {};
  }