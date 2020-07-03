import { Component, OnInit, Version } from '@angular/core';
import { Folder } from '../shared/models/version';
import { VersionService } from '../shared/services/version/version.service';

@Component({
  selector: 'app-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.css']
})
export class VersionsListComponent implements OnInit {
  listVersion=[];listFolders=[];
  arrayListVersion=[];
  arrayListFolder=[];

  image;folder:Folder;
  constructor(private versionService: VersionService) { }

  ngOnInit() {
    this.getAllVersions();
    this.getFolders();
  }
  sendImage(imageVersion){
this.image=imageVersion;


  }
  getAllVersions() {
    this.arrayListVersion=[];
    this.versionService.getVersion().subscribe((data: Version[]) => {
      this.listVersion = data;
  for(let key in this.listVersion){
   if(this.listVersion.hasOwnProperty(key)){
    this.listVersion[key].id=key;
  
    this.arrayListVersion.push(this.listVersion[key]);
 //   this.InitFormation.push(this.listFormation[key]);
  }
  }
  console.log(this.arrayListVersion);

});
}
DeleteVersion(id){
   this.versionService.deleteVersion(id).subscribe();
  //this.arrayListVersion=[];
  this.getAllVersions();
  console.log('version deleted');
}
addFolder(name){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

this.folder={name:name,creation_date:dateTime,FID:"",versions:null};
  this.versionService.addFolder(this.folder).subscribe();
 // this.arrayListFolder.concat(this.folder);
 this.getFolders();
}
getFolders() {
  this.arrayListFolder=[];
  this.versionService.getFolders().subscribe((data: Folder[]) => {
    this.listFolders = data;
for(let key in this.listFolders){
 if(this.listFolders.hasOwnProperty(key)){
  this.listFolders[key].FID=key;

  this.arrayListFolder.push(this.listFolders[key]);
   //this.listFolders.push(this.listFolders[key]);
}  
}
console.log('folder list',this.arrayListFolder);

});
}
deleteFolder(id,folder){
  //this.arrayListFolder.splice(id,1);

  this.versionService.deleteFolder(id).subscribe(data=>
    {

      console.log(data);
      //this.arrayListFolder.splice(id,1);

    });
    this.getFolders();
}

}