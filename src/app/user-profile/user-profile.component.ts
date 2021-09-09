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
  movies: any = [];
  favoriteMovies: any;
  favMoviesName: any = [];

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
      this.getMovies()
      return this.userData;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies)
      this.getFavoriteMoviesName()
      return this.movies
    })
  }

  getFavoriteMoviesName(): void {
    let favMovies: any = this.favoriteMovies
    console.log(favMovies)

    favMovies.map((X: any) => {
      let pelis = this.movies
      let movieId = X
      console.log(movieId)
      let found = pelis.find((element: any) => element._id === movieId)
      console.log(found)
      this.favMoviesName.push(found)
    })
    console.log(this.favMoviesName)

  }


  openUserUpdateDialog(): void {
    this.dialog.open(UpdateUserdataComponent, { width: '280px' })
  }

  deleteMovie(id: any, index: any): void {
    this.fetchApiData.removeMovie(id).subscribe((resp: any) => {
      console.log(this.favMoviesName)
      this.favMoviesName.splice(index, 1)
      console.log(this.favMoviesName)
    })
  }

  goBack(): void {
    this.Router.navigate(['movies']);
  }
}
