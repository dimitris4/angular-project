import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {PostsComponent} from './posts/components/post-list/posts.component';
import {EventsComponent} from './events/events.component';
import {ChatsComponent} from './chats/chats.component';
import {NeweditpostComponent} from './posts/components/neweditpost/neweditpost.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {AppState} from './store/Store';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {rootReducer} from './store/store';
import {AlertBoxComponent} from './alert-box/alert-box.component';
import {LoginComponent} from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {RegisterComponent} from './register/register.component';
import {MatCardModule} from '@angular/material/card';
import {AuthGuard} from './auth.guard';
import {SecureInnerPagesGuard} from './secure-inner-pages.guard';
import {TopmenubarComponent} from './topmenubar/topmenubar.component';
import {HomepageComponent} from './homepage/homepage.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AuthService} from './auth.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/storage';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CollectionsComponent } from './collections/components/collection-list/collections.component';
import {MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {NeweditcollectionComponent} from './collections/components/neweditcollection/neweditcollection.component';

import { environment } from '../environments/environment';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { AddPostsBoxComponent } from './add-posts-box/add-posts-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PostsComponent,
    EventsComponent,
    ChatsComponent,
    NeweditpostComponent,
    AlertBoxComponent,
    LoginComponent,
    RegisterComponent,
    TopmenubarComponent,
    HomepageComponent,
    DashboardComponent,
    ProfileComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    CollectionsComponent,
    NeweditcollectionComponent,
    AddPostsBoxComponent,
  ],
    imports: [
        BrowserModule,
        NgReduxModule,
        NgReduxRouterModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, AppRoutingModule,
        MatInputModule, MatDialogModule, MatTableModule, HttpClientModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule,
        MatInputModule, MatCardModule, MatGridListModule, MatListModule, MatCheckboxModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        MatRippleModule, MatRadioModule,
    ],

  providers: [AuthService, AuthGuard, SecureInnerPagesGuard, AngularFireStorage],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<AppState>,
              private devTool: DevToolsExtension,
              private ngReduxRouter: NgReduxRouter, ) {
    this.ngRedux.configureStore(rootReducer, {}, [], [devTool.isEnabled() ? devTool.enhancer() : f => f]);
    ngReduxRouter.initialize(/* args */);
  }
}
