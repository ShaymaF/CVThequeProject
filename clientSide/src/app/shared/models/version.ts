export class Version {
   FID:string;
   temp:string;
   author: string;
   reason: string;
   statut:any;
   dateVersion: string;
   concatVersion: any;
   personVersion:any;
   aboutVersion:any;
   langueVersion:any;
   diverVersion:any;
   loisirVersion:any;
   experienceVersion:any;
   formationVersion:any;
   certfificatVersion:any;
   competenceVersion:any;
   image:any;
   FirstColor:any;
   SecondColor:any;
   profilePicture:any;
   positionName:any;
   positionEmail:any;positionTel:any;
   positionAdress:any;positionLinkedin:any; positionAbout:any;
   positionFormation:any;positionCetificat:any;positionCompetence:any;
   positionLangue:any;positionLoisirs:any;positionDivers:any;
   positionExperience:any;positionImage:any;positionArabeName:any;
   positionGender:any;
}
export class Folder {
   FID:any;
   name:any
   creation_date:any;
   versions:Version[];
}