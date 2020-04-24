import { Component, OnInit } from '@angular/core';
import { VersionService } from '../services/version/version.service';
import { Version } from '../models/version';

@Component({
  selector: 'app-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.css']
})
export class VersionsListComponent implements OnInit {
  listVersion=[];
  arrayListVersion=[];
  constructor(private versionService: VersionService) { }

  ngOnInit() {
    this.getAllVersions();
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
}