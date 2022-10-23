import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  settingsTabs = [
    {id: 'PASSWORD_CHANGE', title: 'Change password', active: true}
  ];

  selectedTab = 'PASSWORD_CHANGE';

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(index: number) {
    this.settingsTabs.forEach(tab => {
      tab.active = false;
    });

    this.settingsTabs[index].active = true;
    this.selectedTab = this.settingsTabs[index].id;
  }

}
