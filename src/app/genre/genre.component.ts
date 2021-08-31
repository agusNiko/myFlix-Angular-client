import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  name: any = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name")
    console.log(this.name)
  }

}
