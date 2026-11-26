import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Routes = [

  {
  path: 'tabs',
  component: TabsComponent,
  children: [
    {
      path: 'home',
      loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'logs',
      loadComponent: () => import('./logs/logs.page').then( m => m.LogsPage),
    },
    {
      path: 'settings',
      loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage),
    },
  ],
  },
  {
      path: 'tabs',
      loadComponent: () => import('./tabs/tabs.component').then((m) => m.TabsComponent),
  },
  {

      path: '',
      redirectTo: 'tabs',
      pathMatch: 'full',
  }
];
