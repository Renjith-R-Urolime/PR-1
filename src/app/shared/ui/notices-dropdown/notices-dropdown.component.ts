import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
export type NotificationsTabsType =
  | 'kt_topbar_notices_1'
  | 'kt_topbar_notices_2'
  | 'kt_topbar_notices_3';
@Component({
  selector: 'app-notices-dropdown',
  templateUrl: './notices-dropdown.component.html',
  styleUrls: ['./notices-dropdown.component.scss']
})
export class NoticesDropdownComponent implements OnInit {
  @HostBinding('class') class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded position-absolute header-dropdown-position w-fit`
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  announcements: Array<{ icon: string; description: string; name: string, time: string, type: string }>;
  activeTabId: NotificationsTabsType = 'kt_topbar_notices_1';
  constructor(public activeModal: NgbActiveModal, private cdRef: ChangeDetectorRef) { }
  closeNoticesDropdown() {
    this.activeModal.dismiss();
  }
  isLoading: boolean;
  ngOnInit(): void {
    this.announcements = [
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'A'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'B'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'C'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'A'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'B'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'C'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'B'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'C'
      },
      {
        icon: 'icons/duotune/technology/teh008.svg',
        description: 'Attention all employess: open enrolment for benefits begins on Monday',
        name: 'Roshan Munshi',
        time: '2 hours ago',
        type: 'A'
      },
    ];
  }
  setActiveTabId(tabId: NotificationsTabsType) {
    this.activeTabId = tabId;
  }
}
