import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery.comp.html'
})

export class Gallery {
  constructor(private _galleryService: GalleryService) {  }
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

  deleteMultiple(){
    let deleteList:string[]=[];
    this.galleryItems.forEach(function(item:any) {
      if(item.checked){
        deleteList.push(item._id);
      }
    });

    if(deleteList && deleteList.length<1){
      alert("Please select atleast one item");
      return;
    }else{
      console.log('Going to delete',deleteList)
      this._galleryService.deleteMultiple(deleteList)
      .then((resp) => {
       //TODO
       console.log(resp);
       if(resp.status=='success'){
        this.galleryItems.forEach(function(item:any) {
          if(deleteList.indexOf(item._id) > -1){
            item.isDeleted = true;
            item.checked = false;
          }
        });
       }
       deleteList = [];
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}