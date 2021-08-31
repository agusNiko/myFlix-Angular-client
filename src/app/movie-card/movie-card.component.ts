import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public Router: Router) { }

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

  goToGenre(): void {
    this.Router.navigate(['genre']);
  }

  goToDirector(): void {
    this.Router.navigate(['director']);
  }

  goToSynopsis(): void {
    this.Router.navigate(['synopsis']);
  }



}
