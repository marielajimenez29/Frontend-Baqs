import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }
  images = ['https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/5bf2eadc-f3d0-448d-a9f4-78754d2af5e2.jpeg?ixlib=rb-1.0.0&ch=Width%2CDPR&auto=format', 
  'https://i.ytimg.com/vi/xH5VGDWXs_k/maxresdefault.jpg',
    'https://i.ytimg.com/vi/AiOYa2nFuj8/maxresdefault.jpg',
  ]
  ngOnInit(): void {
    
  }

}
