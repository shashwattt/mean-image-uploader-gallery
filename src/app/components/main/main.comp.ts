import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'main-view',
  templateUrl: './main.comp.html',
  styleUrls: ['./main.comp.css']
})

export class Main implements OnInit  {
  fetchItems: any[];
  dataLoading : boolean;
  updteGalleryItems(){
    this.dataLoading = true;
    console.log('Updating Gallery Items')
    this._galleryService.getImages()
    .then((resp) => {
      this.fetchItems = resp.obj;
      this.dataLoading = false;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  constructor(private _galleryService: GalleryService, private _snackBar: MatSnackBar) {  }
  ngOnInit() {
    this.updteGalleryItems();
  }

  onLinkClick(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index==0){
      this.updteGalleryItems();
    }
}
}