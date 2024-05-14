import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, from, of } from "rxjs";
import { SharedService } from "src/app/shared/services/shared.service";
import { JsonListService } from "../services/json-list/json-list.service";
import { setDropdownValues } from "../store/app.actions";

@Pipe({ name: "dataValue" })
export class DataValuePipe implements PipeTransform {
  constructor(private sharedService: SharedService, private http: HttpClient, private store: Store, private jsonListService: JsonListService) { }

  commonFieldList = [
    "country",
    "currency",
    "timezone",
    "accountType",
    "bankAccountType",
    "cycleType",
    "payrollItem",
    "type",
    "subType",
    "gender",
    "religion",
    "maritalStatus",
    "salutation",
    "bloodGroup",
    "ethnicity",
    "nationality",
    "grade",
    "designation",
    "employeeType",
    "employeeCategory",
    "employeeStatus",
    "documentType",
    "relationship",
    "employeeContract",
    "shift",
    "paymentMethod",
    "roles",
    "employeePermission",
    "leaveItemType",
    "leavePayType",
    "shiftsList",
    "entitlementUnit",
    "accrualType",
    "accrualFrequency",
    "quotaResetType",
    "quotaResetFrequency",
    "requestType",
    "installmentRecoveryType",
    "payrollType",
    "payCalculation",
    "salaryAllocation",
    "payableCycle",
    "calendarDay",
    "transactionType",
    "employeeLeavePlanStatus",
    "formulaType",
    "infithraFormula",
    "monthList"
  ];

  transform(value: any, field: any, modelName?: string, viewType?: string): Observable<any> {
    if (value === null || value === undefined || value.length === 0 || (!value && value != 0)) {
      return of("Null");
    }

    if (value == 0) {
      return of('0')
    }

    const type = this.getType(value);

    if ((modelName === 'systemNotes' && field === 'type') || ((viewType && viewType !== 'text' && (type === 'object' || type === 'array'))) || (!this.commonFieldList.includes(field) && (type === 'string' || type === 'number'))) {
      return of(value);
    }

    switch (type) {
      case "object":
        if (field === 'phone') {
          const phonNumber = value?.number ? `+${value?.code}-${value?.number}` : 'Null';
          return of(phonNumber);
        }
        else {
          return of(value?.name);
        }
      case "array":
        return of(this.getArrayValue(value));
      case 'boolean':
        return of(value)
      case "string":
      case "number":

        return from(this.getDataFromStore(value, field));
        break;
      default:
        return of("Null");
    }
  }

  private getType(value: any): string {
    if (Array.isArray(value)) {
      return "array";
    } else if (typeof value === "object") {
      return "object";
    } else {
      return typeof value;
    }
  }

  private getArrayValue(value: any[]): string {
    return value.map((arrayData: any, index: number) => arrayData.name + (index < value.length - 1 ? "," : "")).join(" ");
  }

  private getNameFromData(result: any, value: string, field: string): string {
    const data = result.find((i) => i.id === value.toString());
    switch (field) {
      case "country":
        return data ? data.name : "Null";
      case "currency":
        return data ? data.currency : "Null";
      case "timezone":

        return data ? data.zoneName + "  " + data.gmtOffsetName : "Null";
      case "accountType":
      case "bankAccountType":
      case "cycleType":
      case "gender":
      case "payrollItem":
      case "type":
      case "religion":
      case "maritalStatus":
      case "salutation":
      case "bloodGroup":
      case "nationality":
      case "ethnicity":
      case "grade":
      case "designation":
      case "employeeType":
      case "employeeStatus":
      case "employeeCategory":
      case "documentType":
      case "relationship":
      case "employeeContract":
      case "shift":
      case "paymentMethod":
      case "roles":
      case "employeePermission":
      case "requestType":
      case "subType":
      case "installmentRecoveryType":
      case "paymentMethod":
      case "payrollType":
      case "payrollFrequency":
      case "leaveItemType":
      case "leavePayType":
      case "shiftsList":
      case "entitlementUnit":
      case "accrualType":
      case "transactionType":
      case "accrualFrequency":
      case "quotaResetType":
      case "quotaResetFrequency":
      case "payCalculation":
      case "salaryAllocation":
      case "payableCycle":
      case "calendarDay":
      case "employeeLeavePlanStatus":
      case "infithraFormula":
      case "formulaType":
      case "transactionStatus":
      case "monthList":
        return data ? data.name : "Null";
      default:
        return "Null";
    }
  }

  // changes needs to pushed
  private async getDataFromFile(value: string, field: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsonListService.getDataList(field).subscribe((result) => {
        this.store.dispatch(setDropdownValues({ listName: field, list: result }))
        const data = this.getNameFromData(result, value, field);
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  private async getDataFromStore(value: string, field: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.store.pipe(select(state => state['app'])).subscribe(async result => {
        if (result && result.dropdowns && result.dropdowns[field]) {
          const data = this.getNameFromData(result.dropdowns[field], value, field);
          resolve(data);
        } else {
          try {
            const data = await this.getDataFromFile(value, field);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
}


