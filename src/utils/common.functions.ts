import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export const hashPassword = (password:string)=>{
    return bcrypt.hash(password, saltOrRounds);
}
export const checkPassword = (password:string, hashedString: string)=>{
    return bcrypt.compare(password, hashedString)
}