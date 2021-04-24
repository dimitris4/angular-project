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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  // { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard],
    // children: [
    //   { path: 'posts', component: PostsComponent },
    //   { path: 'events', component: EventsComponent },
    //   { path: 'chats', component: ChatsComponent },
    //   { path: 'posts/:id', component: NeweditpostComponent }
    //   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
