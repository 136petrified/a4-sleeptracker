import { Component } from '@angular/core';
import { IonHeader,
         IonFooter,
         IonToolbar,
         IonTitle,
         IonContent,
         IonCard,
         IonCardContent,
         IonCardHeader,
         IonCardTitle,
         IonButton,
         IonRange,
         RangeCustomEvent,
         IonModal,
         IonDatetime,
         IonDatetimeButton,
         DatetimeCustomEvent,
         IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, arrowUpCircle} from 'ionicons/icons'
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonFooter, IonToolbar, IonTitle, IonContent,
            IonCard, IonCardContent, IonCardHeader, IonCardTitle,
            IonButton, IonIcon, IonRange, IonModal, TabsComponent,
            IonDatetime, IonDatetimeButton,],
})
export class HomePage {
  name: string = "";
  sleepiness: string = "...";
  sleepiness_value: string = "";
  dt_v1: string = "";
  dt_v2: string = "";

  constructor(public sleepService:SleepService) {
  }

	ngOnInit() {
		console.log(this.allSleepData);
	  addIcons({ createOutline, arrowUpCircle });
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

  async setName(name: string) {
    async () => {
      await Preferences.set({
        key: "name",
        value: name,
      });
    };
  }

  async getName() {
    const value = async () => {
      return await Preferences.get({
        key: 'name'
      }).then((data) => {
        return data;
      });
    };

    if (value == null) {
      return "";
    }

    return value;
  }

  displayRangeMsg(n: any) {
    switch (n) {
      case 1:
        this.sleepiness = "1. Feeling active and vital; alert; wide awake.";
        break;
      case 2:
        this.sleepiness = "2. Functioning at a high level, but not at peak";
        break;
      case 3:
        this.sleepiness = "3. Relaxed; awake; not at full alertness; responsive.";
        break;
      case 4:
        this.sleepiness = "4. little foggy; not at peak; let down."
        break;
      case 5:
        this.sleepiness = "5. Fogginess; beginning to lose interest in remaining awake; slowed down.";
        break;
      case 6:
        this.sleepiness = "6. Sleepiness; prefer to be lying down; fighting sleep; woozy.";
        break;
      case 7:
        this.sleepiness = "7. Almost in reverie; sleep onset soon; lost struggle to remain awake.";
        break;
      default:
        this.sleepiness = "...";
        break;
    }
  }

  setDatetime1(event: DatetimeCustomEvent) {
    let value: any = event.detail.value;

    if (value == null) {
      this.dt_v1 = "";
      return;
    }

    this.dt_v1 = value;
  }

  setDatetime2(event: DatetimeCustomEvent) {
    let value: any = event.detail.value;

    if (value == null) {
      this.dt_v2 = "";
      return;
    }

    this.dt_v2 = value;
  }

  setSleepiness(event: RangeCustomEvent) {
    this.displayRangeMsg(event.detail.value);
    this.sleepiness_value = event.detail.value.toString();
  }

  saveOvernightData() {
    let overnight_data: OvernightSleepData = new OvernightSleepData(new Date(this.dt_v1), new Date(this.dt_v2));
    this.sleepService.logOvernightData(overnight_data);
  }

  saveSleepinessData() {
    let sleepiness_data: StanfordSleepinessData = new StanfordSleepinessData(parseInt(this.sleepiness_value), new Date(Date.now()));
    this.sleepService.logSleepinessData(sleepiness_data);
  }

  currentDayPeriod() {
    let now: Date = new Date(Date.now());
    let hour: number = now.getHours();

    if (hour >= 5 && hour <= 11) {
      return "Good morning";
    } else if (hour >= 12 && hour <= 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }
}
