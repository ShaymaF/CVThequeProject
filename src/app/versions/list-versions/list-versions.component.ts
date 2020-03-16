import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/services/version/version.service';
import { Router } from '@angular/router';
import { ShowVersionComponent } from '../show-version/show-version.component';

@Component({
  selector: 'app-list-versions',
  templateUrl: './list-versions.component.html',
  styleUrls: ['./list-versions.component.css']
})
export class ListVersionsComponent implements OnInit {
  list: any;
  arrayList=[];
  constructor(private serviceVersion: VersionService,
    private router:Router) {

    this.getVersionsList();

  }
  getVersionsList() {
    this.serviceVersion.getVersion().subscribe(versions => {
      this.list = versions;
  for(let key in this.list){
   if(this.list.hasOwnProperty(key)){
    this.arrayList.push(this.list[key]);
  
  }
  }
    });  
  }
  
  ngOnInit() {
  }
  showVersion(version){
 
  }
}
