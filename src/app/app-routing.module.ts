import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EventsComponent } from './events/events.component';
import { NeweditpostComponent } from './posts/components/neweditpost/neweditpost.component';
import { PostsComponent } from './posts/components/post-list/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'posts/:id', component: NeweditpostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
