export enum JobTypes { mail = 'mail' }
export interface JobData { 
    jobType: JobTypes;
    data: { [key:string]:any}
}
export enum ResponseType { success = 'success', error = 'error', validate = 'validate', unauthorize = 'unauthorize' }
export interface ResponseInterface{
    type: ResponseType;
    message: '',
    data: {[key:string]: any},
    validation: any[]
}