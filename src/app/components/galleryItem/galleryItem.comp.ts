import { Component, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'gallery-item',
  templateUrl: './galleryItem.comp.html',
  styleUrls: ['./galleryItem.comp.css']
})
export class GalleryItem {
  DELETE_API = "/api/delete/";
  DOWNLOAD_API = "/download/";
  @Input() item: { 
    fileName:       string;
    filePath:       string;
    isDeleted:      boolean;
    size:           string;
    mimeType:       string;
    _id:            string;
  };
  
  constructor(private _galleryService: GalleryService){}
  
  deleteItem(item){
    console.log('Deleting ', item._id);
    this._galleryService.deleteImage(item._id)
    .then((resp) => {
      if(resp.status=='success'){
        item.isDeleted = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  fromattedName(name:string){

    if(name.length>20){
      console.log(name)
      console.log(name.length)
      name = name.substring(0,20)+'...';
    }
    return name;
  }
}