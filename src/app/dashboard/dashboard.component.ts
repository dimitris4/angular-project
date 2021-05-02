import { UserState } from './../store/Store';
import { Post } from 'src/app/entities/Post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user;
  invitations;
  collaborations;
  showMoreInvitations;
  showMoreCollaborations;

  posts: any = [
    {
      id: 1,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "The online Zoom choir practice was a success",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
      status: "invited"
    },
    {
      id: 2,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "Post2",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com","a@gmail.com", "b@gmail.com"],
      status: "invited"
    },
    {
      id: 3,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "How to manage and consult in times of crisis",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
      status: "invited"
    },
    {
      id: 4,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "CBS Gin Podcast EP7 - A gin-gin situation",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
      status: "invited"
    },
    {
      id: 5,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "Post2",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com","a@gmail.com", "b@gmail.com"],
      status: "accepted"
    },
    {
      id: 6,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "CBS Gin Podcast EP8 - A gin-gin situation",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
      status: "accepted"
    },
    {
      id: 7,
      organization: "CBS",
      createdDate: "19 MAY 2020",
      title: "CBS Gin Podcast EP9 - A gin-gin situation",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dolores, deleniti, cum hic numquam harum eveniet eius adipisci voluptatem dolor eum dignissimos fugiat inventore nam officiis rerum non dolorem exercitationem.",
      collaborations: ["dimi@gmail.com", "a@gmail.com", "b@gmail.com"],
      status: "accepted"
    }
]

showInvitations() {
  this.showMoreInvitations = !this.showMoreInvitations;
}
showCollaborations() {
  this.showMoreCollaborations = !this.showMoreCollaborations;
}



  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.showMoreInvitations = false;
    this.showMoreCollaborations = false;
    this.invitations = this.posts.filter(post => post.collaborations.includes(this.user.email) && post.status==='invited');
    this.collaborations = this.posts.filter(post => post.collaborations.includes(this.user.email) && post.status==='accepted');
  }

}
