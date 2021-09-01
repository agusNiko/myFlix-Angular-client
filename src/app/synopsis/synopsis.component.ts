import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  id: any = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
  }
}
