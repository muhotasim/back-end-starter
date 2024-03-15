import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    @Post('token')
    login(@Body() body:LoginDTO){

    }

    @Post('refresh-token')
    logout(){}

    @Post('forgot-password')
    forgotPassword(@Body() body:ForgotPasswordDTO){}

    @Patch('reset-password')
    resetPassword(@Body() body:ResetPasswordDTO){}

    
    @Get('user')
    user(){}

    @Patch('update-password')
    changePassword(){}
}