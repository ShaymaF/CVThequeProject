export class Version {
   FID:string
   author: string;
   reason: string;
   statut:any;
   dateVersion: string;
   concatVersion: any;
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
}
export class Folder {
   FID:any;
   name:any
   creation_date:any;
   versions:Version[];
}