import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/common/services/user.service';
import { decodePayload } from 'src/utils/common.functions';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService){}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if(!authHeader){
        throw new UnauthorizedException();
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    const result = await this._jwtService.verify(token, { secret: process.env.JWT_ACCESS_TOKEN_SECRET })
    if(result){
        const data = decodePayload(result.payload);
        const userId = data.uId;
        const user = await this._userService.user(userId)
        const matchToken = user.tokens.find(d=>d.access_token==token&&d.ac_token_expires_at>new Date().getTime())
        if(!user.is_active || !matchToken){
            throw new UnauthorizedException();
        }
        request.user = user;
        return true;
    }
    
    return false;
  }
}
