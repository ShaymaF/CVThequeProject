export class About {
    private _desc: any;
   
  
    constructor(desc: any) {
      this._desc = desc;
   
    }
  
  
    set desc(value: any) {
      this._desc = value;
    }
  
   
    get desc(): any {
      return this._desc;
    }
}
  