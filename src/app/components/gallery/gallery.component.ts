import { Component, OnInit } from '@angular/core';

interface Image {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: Image[] = [
    {
      src: "../../../assets/images/still_life.jpg",
      alt: "piece of multiple layers"
    },
    {
      src: "../../../assets/images/artist_collaboration.jpg",
      alt: "piece of multiple layers"
    },
    {
      src: "../../../assets/images/figure.jpg",
      alt: "piece of multiple layers"
    },
    {
      src: "../../../assets/images/landscape.jpg",
      alt: "piece of multiple layers"
    },
    {
      src: "../../../assets/images/place_mapping.jpg",
      alt: "piece of multiple layers"
    },
    {
      src: "../../../assets/images/place_mapping_closeup.jpg",
      alt: "piece of multiple layers"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
