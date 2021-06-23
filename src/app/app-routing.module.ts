import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EventsComponent } from './events/events.component';
import { NeweditpostComponent } from './posts/components/neweditpost/neweditpost.component';
import { PostsComponent } from './posts/components/post-list/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SecureInnerPagesGuard} from './secure-inner-pages.guard';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {CollectionsComponent} from './collections/components/collection-list/collections.component';
import {NeweditcollectionComponent} from './collections/components/neweditcollection/neweditcollection.component';
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/posts', pathMatch: 'full' },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'posts/:id', component: NeweditpostComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'collections/:id', component: NeweditcollectionComponent },
      ]
  },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
