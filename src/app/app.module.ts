import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { FileUploaderComponent } from './components/fileUploader/uploader.comp';
import { AppComponent } from './app.component';
import { Gallery } from './components/gallery/gallery.comp';
import { GalleryItem } from './components/galleryItem/galleryItem.comp';
import { Main } from './components/main/main.comp';
import { Toolbar } from './components/toolbar/toolbar.comp';
import { GalleryService } from './services/gallery.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    FileSelectDirective,
    FileDropDirective,
    Gallery,
    GalleryItem,
    Main,
    Toolbar
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
