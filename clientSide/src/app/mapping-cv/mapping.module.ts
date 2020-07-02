import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ListTemplateComponent } from './list-template/list-template.component';
import { NewTemplateComponent } from './new-template/new-template.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ListTemplateComponent, NewTemplateComponent],
  imports: [
    BrowserModule,
    SharedModule,
     FormsModule,
     AppRoutingModule,
      CommonModule,
      CodeEditorModule.forRoot()
      ,MonacoEditorModule,
      RouterModule,
      MatTabsModule,
      DragDropModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MappingModule { }
