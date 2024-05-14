import {
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SharedService } from "../../services/shared.service";
import { filterMeta } from "./filter-metadata";

@Component({
  selector: "employee-select",
  templateUrl: "./employee-select.component.html",
  styleUrls: ["./employee-select.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmployeeSelectComponent,
      multi: true,
    },
  ],
})
export class EmployeeSelectComponent implements ControlValueAccessor {
  selectedEmployee: any;
  theme: string = this.sharedService.getTheme();
  @Input() ngClass: any;
  @Input() scope: string = "dropdown";
  @Input() placeholder: string = "Select Employee";
  @Input() employeeFilterMeta: any=filterMeta;
  filterCondition: any;
  @Input() isDisabled: boolean;
  @Input() filterDisabled: boolean=false;

  @Input() patchData: any;
  @Output() onchange: EventEmitter<any> = new EventEmitter();
  filter: any;

  // ControlValueAccessor implementation
  onChange: any = () => {};
  onTouch: any = () => {};

  // ngOnChanges(changes: SimpleChanges): void {
  //
  //   if(changes.selectedEmployee?.currentValue ){
  //     this.onChange(this.selectedEmployee)
  //   }
  // }
  onEmployeeSelect(event) {
    this.onChange(this.selectedEmployee);
    this.onchange.emit(event);
  }

  writeValue(value: any): void {
    this.selectedEmployee = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (!this.isDisabled) {
      this.isDisabled = isDisabled;
    }
    // Implement this if you want to handle disabling the component
  }

  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    // this.getAPIList()
  }

  filteredData(event) {
    this.filterCondition = event;
  }
}
