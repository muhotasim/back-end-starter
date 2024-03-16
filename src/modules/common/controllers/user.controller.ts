import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../dto/users.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { hashPassword } from "src/utils/common.functions";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { PermissionGuard } from "src/guards/permission.guard";

@ApiTags('Users')
@UseGuards(AuthorizationGuard)
@Controller('users')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly _userService: UserService){}
    @Get()
    @UseGuards(new PermissionGuard(['can-get-users-with-count']))
    async index(@Query() query, @Query('page') page:number, @Query('perPage') perPage:number) {
        return await this._userService.findAndCount(page, perPage, query);
    }
    
    @Post()
    @UseGuards(new PermissionGuard(['can-create-user']))
    async create(@Body() createUserDTO:CreateUserDTO) { 
        createUserDTO.password = await hashPassword(createUserDTO.password);
        return await this._userService.create(createUserDTO)
    }
    
    @Patch('/:id')
    @UseGuards(new PermissionGuard(['can-update-user']))
    async update(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO) {
        const user = await this._userService.findById(id);
        if(user&&user.password!=updateUserDTO.password){
            updateUserDTO.password =  await hashPassword(updateUserDTO.password)
        }
        return await this._userService.update(id, updateUserDTO);
     }
    
    @Get('/:id')
    @UseGuards(new PermissionGuard(['can-get-single-user']))
    async getById(@Param('id') id: number) { 
        return this._userService.findById(id);
    }
    
    @Delete('/:id')
    @UseGuards(new PermissionGuard(['can-delete-user']))
    async distroy(@Param('id') id: number) { 
        return this._userService.destroy(id);
    }
}