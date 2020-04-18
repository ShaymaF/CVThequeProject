export interface Competence {
 id: string;
 type:string;
 competence:string;
 competence_level:string;
 tools:Tools[];   
  
   
  }
  export interface Tools{
tool:string
tools_level:string

  }