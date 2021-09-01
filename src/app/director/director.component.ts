import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  name: any = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name")
    console.log(this.name)
  }

}
