import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-frame',
  templateUrl: './video-frame.component.html',
  styleUrls: ['./video-frame.component.css']
})
export class VideoFrameComponent implements OnInit {

  @Input() source: any;
  @Input() width: string | number;
  @Input() height: string | number;

  constructor(private domSanitizer: DomSanitizer) { }


  ngOnInit() {
    this.source = this.domSanitizer.bypassSecurityTrustResourceUrl(this.source);
    this.conditionalIframeAdjustment();
    window.onresize = () => {
      this.conditionalIframeAdjustment();
    }
  }


  conditionalIframeAdjustment() {
    if (window.innerWidth > 768) {
      this.width = window.innerWidth - 100;
      this.height = window.innerHeight + 100;
    } else if (window.innerWidth <= 768 && window.innerWidth >= 499) {
      this.width = 500;
      this.height = 300;
    } else if (window.innerWidth <= 500 && window.innerWidth >= 361) {
      this.width = 400;
      this.height = 300;
    } else {
      this.width = '100%';
      this.height = '100%';
    }
  }
}
