import { Competence } from './competence';

export class Experience {
    //fonction,location,emp,dateDebut,dateFin,projet
  id: string;
    fonction: string;
    location: string;
    emp: string;
    dateDebut: Date;
    dateFin: Date;
    projet:any;

  constructor( 
    fonction: string,
    location: string,
    emp: string,
    dateDebut: Date,
    dateFin: Date,
    projet:any){
   
    this.fonction=fonction;
    this.location=location;
    this.emp=emp;
    this.dateDebut=dateDebut;
    this.dateFin=dateFin;
    this.projet=projet;
    
} 
}
export interface Projet {
ProjetName:string;
ProjetDesc:string;
ProjetShort:string;

MOE:string;
MOA:string;
competence:string;
}
