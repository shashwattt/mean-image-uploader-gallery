import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery.comp.html'
})

export class Gallery {
  @Input() galleryItems: [
    { 
      fileName:       string;
      filePath:       string;
      isDeleted:      boolean;
      size:           string;
      mimeType:       string;
      _id:            string;
    }
  ];
}