import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FieldConfig, Sections } from '../basic-form/basic-form';



@Component({
  selector: 'app-manage-select-emp',
  templateUrl: './manage-select-emp.component.html',
  styleUrls: ['./manage-select-emp.component.scss']
})
export class ManageSelectEmpComponent implements OnInit {


  constructor(private sharedService: SharedService) {
  }





  cardData = [
    { name: "Farhan Ahmed", role: "HR Manager", selected: false,  img: './assets/media/avatars/300-1.jpg',  },
    { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-2.jpg',  },
    { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-3.jpg',  },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-4.jpg',  },
    { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-5.jpg',  },
    { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-6.jpg',  },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-7.jpg',  },
    { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
    { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-9.jpg',  },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-10.jpg',  },
    { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-6.jpg',  },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-7.jpg',  },
    { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
    { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-9.jpg',  },



  ];

    // cardData: { name: string; role: string; selected: boolean; }[] = [
  //   { name: "Farhan Ahmed", role: "HR Manager", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Alan Johnson", role: "Developer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Robert Doe", role: "Marketing", selected: false,  img: './assets/media/avatars/300-8.jpg',  },
  //   { name: "Karina Clark", role: "UI/UX Designer", selected: false,  img: './assets/media/avatars/300-8.jpg',  },

  // ];



  @Input() formData: FieldConfig;
  @Input() formSection: Sections;
  @Input() manageEmployee: any
  selectedLength: number = 0;

  filterToggle: boolean = false;
  searchText: string = '';
  @Input() theme: string = this.sharedService.getTheme();
  selectedOptionText: any[] = [];
  prevSelectedOption: string = '';
  // trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  // tableData: DataTable;

  searchKeyword: string = '';
  filteredData: any;
  manageData: any;


  ngOnInit(): void {



    this.setEmpList();
  }

  setEmpList() {

    this.sharedService.emitEmployeeDataList(this.cardData)

   }


  updateFilteredData() {
    this.filteredData = this.cardData.filter(item => {
      return item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
             item.role.toLowerCase().includes(this.searchKeyword.toLowerCase());
    });
  }

  addChip(): void {
    if (this.selectedOptionText && !this.selectedOptionText.includes('')) {
      this.selectedOptionText.push(this.selectedOptionText[0]);
    }
  }

  removeChip(chip: string): void {
    const index = this.selectedOptionText.indexOf(chip);
    if (index !== -1) {
      this.selectedOptionText.splice(index, 1);
    }
  }

  memberUpdate(member: any) {
    if (this.selectedOptionText.includes(member.target.value)) {
      this.removeChip(member.target.value);
    }
    else {
      this.selectedOptionText.push(member.target.value);
    }
  }

  getNotificationStatus(event: any) {
    const index = this.selectedOptionText.indexOf(event.target.value);
    if (this.selectedOptionText.includes("Notification: On")) {
      this.selectedOptionText.splice(index, 1, "Notification: Off");
    }
    else if (this.selectedOptionText.includes("Notification: Off")) {
      this.selectedOptionText.splice(index, 1, "Notification: On");
    }
    else {
      this.selectedOptionText.push("Notification: On")
    }
  }

  logSelectedValue(event: any) {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target[selectedIndex];
    const selectedOptionText = selectedOption.text;
    this.removeChip(this.prevSelectedOption);
    this.prevSelectedOption = selectedOption.text;

    this.sharedService.setSelectedOptionText(selectedOptionText);
  }

  items: Array<{ name: string; initials?: string; state?: string, src?: string }>;



  // Filter Dropdown Codes
  subsidiaryOptions: any[] = [
    // Add your subsidiary options here
    "HoneyComb",
    "Honey"
  ];

  teamOptions: any[] = [
    // Add your team options here
    "Developer",
    "Designer",
    "Tester"
  ];
  selectedSubsidiary: any;
  selectedTeam: any;
  selectedTeams: any;
  appliedSubsidiary: string;
  appliedTeams: string
  applyFilters() {
    this.appliedSubsidiary = this.selectedSubsidiary;
    this.appliedTeams = this.selectedTeam;
    this.filterToggle = false;
  }

  resetFilters() {
    this.selectedSubsidiary = null;
    this.selectedTeam = null;
    this.filterToggle = false; // Close the filter options pop-up
    this.appliedSubsidiary = "";
    this.appliedTeams = "";
  }

  // To select all the card employees and calculate no of selectall employee
  selectAllChecked: boolean = false;
  selectAllCards(): void {
    for (let i = 0; i < this.cardData.length; i++) {
      this.cardData[i].selected = this.selectAllChecked;
    }
    this.selectedEmployees = this.cardData.filter(employee => employee.selected);
    this.selectedLength = this.selectedEmployees.length;
  }
  // Selectall ends

  // Individually select and count the no of employees
  selectedEmployees: any ;
  updateSelectedEmployees(): void {
    this.selectedEmployees = this.cardData.filter(employee => employee.selected);
    this.selectedLength = this.selectedEmployees.length;


  }

  applySearchFilterCard(): void {
    const searchText = this.searchText.toLowerCase().trim();
    if (searchText) {
      this.cardData = this.cardData.filter((card) => {
        const name = card.name.toLowerCase();
        const role = card.role.toLowerCase();
        return name.includes(searchText) || role.includes(searchText);
      });
    } else {
      this.cardData = this.cardData.slice();
    }
    this.selectedEmployees = this.cardData.filter((employee) => employee.selected);
    this.selectedLength = this.selectedEmployees.length;
  }

}
