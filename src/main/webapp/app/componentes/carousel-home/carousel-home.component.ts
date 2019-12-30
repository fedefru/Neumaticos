import { Component } from '@angular/core';

@Component({
  selector: 'jhi-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss']
})
export class CarouselHomeComponent {
  images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);
}
