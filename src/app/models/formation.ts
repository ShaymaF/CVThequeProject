export class Formation {
    private typeFormation: any;
   
  
    constructor(typeFormation: any) {
      this.typeFormation = typeFormation;
   
    }
  
  
    set setTypeFormation(value: any) {
      this.typeFormation = value;
    }
  
   
    get getTypeFormation(): any {
      return this.typeFormation;
    }
}
  