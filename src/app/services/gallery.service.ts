import { NOTINITIALIZED } from 'dns';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';

const API_URL = '/api/';
@Injectable()
export class GalleryService {
  
	constructor(private http: Http){}

  // Getting all images
  getImages() {
    return this.http.get(API_URL)
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  //Delete Image
  deleteImage(id : String){
    var URL = API_URL + "delete/" +id;
    return this.http.delete(URL)
    .map((response: Response) => response.json())
    .toPromise()
    .catch((err: any) => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  //DeleteMultiple
  deleteMultiple(idList:string[]){
    console.log('In delete service' + idList)
    var URL = API_URL + "deleteMultiple/";
    var body = JSON.stringify(idList);
    const header = new Headers({'Content-Type':'application/json'});
    return this.http.post(URL,body,{headers:header})
    .map((response: Response) => response.json())
    .toPromise()
    .catch((err: any) => {
      console.log(err);
      return Promise.reject(err);
    });
  }
}
