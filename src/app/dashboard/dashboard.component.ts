import { UserState } from './../store/Store';
import { Post } from 'src/app/entities/Post';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app/store/Store';
import { PostActions } from '../../app/store/actions/PostActions'
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public posts: Post[];
  user;
  invitations;
  collaborations;
  showMoreInvitations;
  showMoreCollaborations;

//   posts: any = [
//     {
//       id: 1,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "The online Zoom choir practice was a success",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
//       status: "invited"
//     },
//     {
//       id: 2,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "Post2",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com","a@gmail.com", "b@gmail.com"],
//       status: "invited"
//     },
//     {
//       id: 3,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "How to manage and consult in times of crisis",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
//       status: "invited"
//     },
//     {
//       id: 4,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "CBS Gin Podcast EP7 - A gin-gin situation",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
//       status: "invited"
//     },
//     {
//       id: 5,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "Post2",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com","a@gmail.com", "b@gmail.com"],
//       status: "accepted"
//     },
//     {
//       id: 6,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "CBS Gin Podcast EP8 - A gin-gin situation",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
//       status: "accepted"
//     },
//     {
//       id: 7,
//       organization: "CBS",
//       createdDate: "19 MAY 2020",
//       title: "CBS Gin Podcast EP9 - A gin-gin situation",
//       text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
//       collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
//       status: "accepted"
//     }
// ]



  constructor(
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.postActions.readPosts();
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.posts = res.posts;
    });

    this.showMoreInvitations = false;
    this.showMoreCollaborations = false;
    this.invitations = this.posts.filter(post => post.collaborations.some(collaboration => collaboration.email === this.user.email && collaboration.accepted === false));
    this.collaborations = this.posts.filter(post => post.collaborations.some(collaboration => collaboration.email === this.user.email && collaboration.accepted === true));
    console.log("Posts ",this.posts);
  }

  showInvitations() {
    this.showMoreInvitations = !this.showMoreInvitations;
  }
  showCollaborations() {
    this.showMoreCollaborations = !this.showMoreCollaborations;
  }

}
