import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  toFavorites(movieId: any): void {
    this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
      console.log(movieId + " added to favorites")
    })

  }

  goToProfile(): void {
    this.Router.navigate(['profile']);
  }

  goToGenre(genre: any): void {
    this.Router.navigate([genre]);
  }

  goToDirector(director: any): void {
    this.Router.navigate([director]);
  }

  goToSynopsis(synopsis: any): void {
    this.Router.navigate([synopsis]);
  }



}
