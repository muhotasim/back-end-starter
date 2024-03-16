import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const saltOrRounds = 10;

export const hashPassword = (password:string)=>{
    return bcrypt.hash(password, saltOrRounds);
}
export const checkPassword = (password:string, hashedString: string)=>{
    return bcrypt.compare(password, hashedString)
}
export const  encodePayload=(payload: any): string =>{
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const hmac = crypto.createHmac('sha256', process.env.JWT_ACCESS_TOKEN_SECRET);
    hmac.update(encodedPayload);
    const signature = hmac.digest('hex');
    return `${encodedPayload}.${signature}`;
}

export const  decodePayload=(encodedPayloadWithSignature: string): any =>{
    const [encodedPayload, signature] = encodedPayloadWithSignature.split('.');
    const hmac = crypto.createHmac('sha256', process.env.JWT_ACCESS_TOKEN_SECRET);
    hmac.update(encodedPayload);
    const calculatedSignature = hmac.digest('hex');
    if (calculatedSignature !== signature) {
        throw new Error('Invalid signature');
    }
    return JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
}
export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      return request.user; 
    },
  );