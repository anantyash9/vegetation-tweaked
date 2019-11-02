import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { overviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
	{
			path:'',
			redirectTo:'/map',
			pathMatch: 'full'
	},
	{
		path:'users',
		component:UsersComponent,
		pathMatch: 'full'
	},
	{
		path:'map',
		component:MapComponent,
		pathMatch: 'full'
  },
  {
		path:'overview',
		component:overviewComponent,
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false // <-- debugging purposes only
       // preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
