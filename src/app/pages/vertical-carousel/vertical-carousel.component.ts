// Import statements
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-vertical-carousel',
  templateUrl: './vertical-carousel.component.html',
  styleUrls: ['./vertical-carousel.component.css'],
})
export class VerticalCarouselComponent implements OnInit {
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  currentIndex = 1;
  visibleItems: string[] = [];

  ngOnInit() {
  }


}
