import { Component, OnInit } from '@angular/core';
//import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-menub',
  templateUrl: './menub.component.html',
  styleUrls: ['./menub.component.css']
})
export class MenubComponent implements OnInit {
  nombreArchivo="";
  constructor () { }

  ngOnInit(): void {
  }
  uploadFile(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }

    //UN ARCHIVO A JSON
    /*const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    //var files = e.target.files;
    //files = [...files].filter(s=>s.type.includes("text"));
    if (fileList) {
      console.log("ARchivoSubido -> Archivo", fileList.item.prototype);
    }*/

  }

}
