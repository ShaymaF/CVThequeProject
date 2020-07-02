import { Component, OnInit, Version } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-show-version',
  templateUrl: './show-version.component.html',
  styleUrls: ['./show-version.component.css']
})
export class ShowVersionComponent implements OnInit {
  listVersion=[];
  arrayListVersion=[];
  image; id; private sub: Subscription;

  constructor(private versionService: VersionService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  //  this.getAllVersions();
  //private sub: Subscription;

    this.sub = this.route.paramMap.subscribe(
      params => {
       this.id = params.get('id');});  
        console.log('id',this.id )
        this.getAllVersions();
  }
  sendImage(imageVersion){
this.image=imageVersion;


  }
  getAllVersions() {
    this.arrayListVersion=[];
    this.versionService.openFolder(this.id).subscribe((data: Version[]) => {
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
