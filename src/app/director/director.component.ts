import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  name: any = '';
  director: any = '';


  constructor(
    private route: ActivatedRoute,
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log(this.name);
    this.getDirector(this.name);
  }

  getDirector(id: any): void {
    this.fetchApiData.getDirector(id).subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director.Name);
      return this.director;
    });
  }

  goBack(): void {
    this.Router.navigate(['movies']);
  }
}
