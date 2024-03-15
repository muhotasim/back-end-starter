import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    @Post('token')
    login(@Body() body:LoginDTO){

    }
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Post('refresh-token')
    refreshToken(){}

    
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Post('logout')
    logout(){}

    @Post('forgot-password')
    forgotPassword(@Body() body:ForgotPasswordDTO){}

    @Patch('reset-password')
    resetPassword(@Body() body:ResetPasswordDTO){}

    
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Get('user')
    user(){}

    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @Patch('update-password')
    changePassword(){}
}