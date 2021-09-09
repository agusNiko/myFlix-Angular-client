import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  name: any = '';
  genre: any = [];
  Description: any = '';
  constructor(
    private route: ActivatedRoute,
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name")
    console.log(this.name)
    this.getGenre(this.name);
  }

  getGenre(id: any): void {
    this.fetchApiData.getGenre(id).subscribe((resp: any) => {
      this.genre = resp;

      console.log(this.genre);
      console.log(this.genre.genre.Description)
    });
  }

  goBack(): void {
    this.Router.navigate(['movies']);
  }


}
