import { Langue } from './langues';
import { Loisirs } from './loisirs';
import { Divers } from './divers';
import { Experience } from './experience';
import { Formation } from './formation';
import { Certificat } from './certificat';
import { Competence } from './competence';

export interface Traces {
  FirstColor: string;
  SecondColor: string;
  abouts:string;
  langues:Langue[];
  loisirs:Loisirs[];
  divers:Divers[];
  experiences:Experience[];
  formations:Formation[];
  certificats:Certificat[];
  competences:Competence[];
  positionName:any;
  positionEmail:any;
  positionTel:any;
  positionAdress:any;
  positionLinkedin:any;
  positionAbout:any;
  positionFormation:any;
  positionCetificat:any;
  positionCompetence:any;
  positionLangue:any;
  positionLoisirs:any;
  positionDivers:any;
  positionExperience:any;
  positionImage:any;
  positionArabeName:any;
  positionGender:any;
  
  }
  export interface ChartColors {
    FirstColor: string;
    SecondColor: string;
  
   
  }
  