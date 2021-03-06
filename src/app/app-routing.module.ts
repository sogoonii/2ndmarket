import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';
import { UserResolver } from './shared/resolvers';
import { IntroComponent } from './modules/intro/intro.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    resolve: {user: UserResolver},
    children: [
      {path: '', component: HomeComponent},
    ]
  },
  { path: 'intro', component: IntroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
