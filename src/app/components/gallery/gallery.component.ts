import { Component, OnInit } from '@angular/core';

interface Card {
  src: string;
  thumbnail?: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  cards: Card[] = [
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
    },
    {
      src: "https://www.youtube.com/watch?v=4Nlcbl9-1Z8",
      thumbnail: "../../../assets/images/visualizing_sound.jpg", 
      alt: "youtube video"
    },
    {
      src: "https://www.youtube.com/watch?v=y7NoS3GUtZc",
      thumbnail: "../../../assets/images/flashback.jpg", 
      alt: "youtube video"
    },
    {
      src: "https://www.youtube.com/watch?v=2KbkUySv6RM",
      thumbnail: "../../../assets/images/friendship.jpg", 
      alt: "youtube video"
    },
    {
      src: "https://www.youtube.com/watch?v=B2_WuPjRtJQ",
      thumbnail: "../../../assets/images/behind_the_scenes.jpg", 
      alt: "youtube video"
    },
    
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
