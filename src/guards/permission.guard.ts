import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly allowedPermissions: string[]) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPermited = request.user.is_superadmin || request.user.permissions.find(d=>{
      return this.allowedPermissions.includes(d.permission_key)
    });
    
    return isPermited?true:false;
  }
}
