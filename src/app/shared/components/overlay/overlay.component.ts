import { Component, Inject, OnInit } from '@angular/core';
import { IOverlayContent } from 'src/app/core/interfaces/overlay.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public overLayContent: IOverlayContent) { }

  ngOnInit(): void {
  }

}
