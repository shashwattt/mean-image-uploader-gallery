import { Component, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { MatSnackBar } from '@angular/material';

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
  
  constructor(private _galleryService: GalleryService, private _snackBar: MatSnackBar){}
  openSnackBar(msg : string) {
    this._snackBar.open(msg)._dismissAfter(2000);
  }
  deleteItem(item){
    this.openSnackBar('Deleting image ' + item.fileName);
    console.log('Deleting ', item._id);
    this._galleryService.deleteImage(item._id)
    .then((resp) => {
      if(resp.status=='success'){
        item.isDeleted = true;
        this.openSnackBar('Successfully deleted image ' + item.fileName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  fromattedName(name:string){
    if(name.length>20){
      name = name.substring(0,20)+'...';
    }
    return name;
  }
}