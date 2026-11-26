import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabButton, IonTabBar, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, analyticsOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  imports: [IonTabs, IonTabButton, IonTabBar, IonIcon],
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({ homeOutline, analyticsOutline, settingsOutline });
  }

  ngOnInit() {}

}
