import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FieldConfig, Sections } from '../basic-form/basic-form';
import { DataTable } from '../data-table-list/data-table-list';
// import { TrazepoidTabsMeta } from '../tab-data-table/trapezoid-tabs';
import { manageEmployeeFormData, manageEmployeeFormSections, manageEmployeeWizardTabs, tabs, trapezoidTabTableData } from './people-list.component.data';
import { TrazepoidTabsMeta } from '../../meta-interface';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent  implements OnInit{

  @Input() cssClass: string = '';
  @Input() icon: boolean = false;
  @Input() stats: number = 357;
  @Input() description: string = 'Professionals';
  @Input() labelColor: string = 'dark';
  @Input() textColor: string = 'gray-300';
  @Input() empDataList: any;




  items: Array<{ name: string; initials?: string; role?: string, img?: string,  selected?: boolean ,state?: string}>;
  isLoading: boolean;
  constructor(private cdRef: ChangeDetectorRef, private sharedService:SharedService) { }

  cardWidth: string = `var(--card-width)`;
  cardHeight: string = `var(--card-height)`;

  trapezoidTabs: TrazepoidTabsMeta[] = tabs;
  trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;

  wizardData = manageEmployeeWizardTabs;



  formData:FieldConfig;
  formSection:Sections;

  selectedLength: number = 0;



  ngOnInit(): void {



    this.formData = manageEmployeeFormData;;
    this.formSection = manageEmployeeFormSections;

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);


    // this.items = [

    //   { name: "Farhan Ahmed", role: "HR Manager", selected: false,  img: './assets/media/avatars/300-1.jpg',  },
    // { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-2.jpg',  },
    // { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-3.jpg',  },
    // { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-4.jpg',  },
    // { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-5.jpg',  },
    // { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-6.jpg',  },
    // { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-7.jpg',  },
    // { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
    // { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-9.jpg',  },
    // { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-10.jpg',  },
    // ];


    this.items = this.empDataList;
    this.selectedLength = this.items.filter(item => item.selected).length;
  }






}
