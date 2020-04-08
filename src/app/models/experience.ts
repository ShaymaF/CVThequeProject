import { Competence } from './competence';

export class Experience {
    id: string;
    Poste: string;
    StartDate: Date;
    EndDate: Date;
Role:String;
  constructor( 
    Poste: string,
    StartDate: Date,
    EndDate: Date,
Role:String){
   
    this.Poste=Poste;
    this.StartDate=StartDate;
    this.EndDate=EndDate;
    this.Role=Role;
} 
}
export interface Projet {
ProjetName:string;
ProjetDesc:string;
ProjetShort:string;
ProjetStartDate:Date;
ProjetEndDate:Date;
MOE:string;
MOA:string;
competence:string;
   
}
