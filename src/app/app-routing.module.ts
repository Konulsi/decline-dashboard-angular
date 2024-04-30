import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclineDetailComponent } from './pages/decline-detail/decline-detail.component';
import { DeclineListComponent } from './pages/decline-list/decline-list.component';

const routes: Routes = [
  {
    path: 'decline',
    component: DeclineListComponent,
  },
  {
    path: 'decline/details',
    component: DeclineDetailComponent,
  },
  { path: 'decline/:name', component: DeclineDetailComponent },
  // { path: 'decline/details/by', component: DeclineDetailComponent },
  {
    path: '**',
    redirectTo: 'decline',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
