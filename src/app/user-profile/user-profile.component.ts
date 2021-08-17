import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserdataComponent } from '../update-userdata/update-userdata.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})



export class UserProfileComponent implements OnInit {
  userData: any = '';
  favoriteMovies: any
  constructor(
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    let userName = localStorage.getItem('user')
    this.fetchApiData.getUser(userName).subscribe((resp: any) => {
      this.userData = resp;

      this.favoriteMovies = resp.FavoriteMovies
      console.log(this.favoriteMovies);
      return this.userData;
    });

  }

  openUserUpdateDialog(): void {
    this.dialog.open(UpdateUserdataComponent, { width: '280px' })
  }

  deleteMovie(i: any): void {
    this.fetchApiData.removeMovie(this.favoriteMovies[i]).subscribe((resp: any) => { this.getUser() })

  }

}
