import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  id: any = '';
  movie: any = [];
  review: {} = { MovieID: this.route.snapshot.paramMap.get("id"), Comment: "best movie ever", Rating: 5 };
  constructor(
    private route: ActivatedRoute,
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)

    this.getMovie(this.id)
  }

  getMovie(id: any): void {
    this.fetchApiData.getMovieByID(id).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }

  letReview(review: {}) {
    this.fetchApiData.sendReview(review).subscribe((resp: any) => {
      this.review = resp;
      console.log(this.movie._id);
      return this.review;
      console.log("review works")
    });
  }

  goBack(): void {
    this.Router.navigate(['movies']);
  }
}


