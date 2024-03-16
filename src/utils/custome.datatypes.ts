export enum JobTypes { mail = 'mail' }
export interface JobData { 
    jobType: JobTypes;
    data: { [key:string]:any}
}