import { Body, Controller, Get, Patch, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/modules/common/services/user.service";
import { User, checkPassword, encodePayload } from "src/utils/common.functions";
import { TokenService } from "src/modules/common/services/token.service";
import { AuthorizationGuard } from "src/guards/authorization.guard";
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _userService: UserService,
        private readonly _tokenService: TokenService,
        private readonly _jwtService: JwtService) { }
    
    @Post('token')
    async login(@Body() body: LoginDTO) {
        const user = await this._userService.findByEmail(body.email);
        if (!user) {
            throw new UnauthorizedException()
        }

        if (checkPassword(body.password, user.password)) {
            let payload = {payload:encodePayload({ uId: user.id })}
            let currentTime = new Date().getTime();
            const acTokenExpiryAt = (parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY)*1000);
            const rfTokenExpiryAt = (parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY)*1000);
            const accessToken = await this._jwtService.signAsync(payload, { secret: process.env.JWT_ACCESS_TOKEN_SECRET, expiresIn: acTokenExpiryAt });
            const refreshToken = await this._jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: rfTokenExpiryAt });
            const savedToken = await this._tokenService.create({
                ac_token_expires_at: currentTime+acTokenExpiryAt,
                access_token: accessToken,
                rf_token_expires_at: currentTime+rfTokenExpiryAt,
                refresh_token: refreshToken,
                user: user
            });
            return  await this._tokenService.findById(savedToken.id);
        }

        throw new UnauthorizedException()
    }
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Post('refresh-token')
    refreshToken(@Body('access_token') access_token:string) {

     }


    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Post('logout')
    logout() { }

    @Post('forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDTO) { }

    @Patch('reset-password')
    resetPassword(@Body() body: ResetPasswordDTO) { }


    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Get('user')
    @UseGuards(AuthorizationGuard)
    user(@User() user) { 
        if(user){
            delete user.password;
            delete user.tokens;
            delete user.roles;
            
        }
        return user;
    }

    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Patch('update-password')
    changePassword() { }
}