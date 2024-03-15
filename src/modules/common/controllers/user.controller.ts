import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../dto/users.dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
})
@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService){}
    @Get()
    async index(@Query() query, @Query('page') page:number, @Query('perPage') perPage:number) {
        return await this._userService.findAndCount(page, perPage, query);
    }
    
    @Post()
    async create(@Body() createUserDTO:CreateUserDTO) { 
        return await this._userService.create(createUserDTO)
    }
    
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO) {
        return await this._userService.update(id, updateUserDTO);
     }
    
    @Get('/:id')
    async getById(@Param('id') id: number) { 
        return this._userService.findById(id);
    }
    
    @Delete('/:id')
    async distroy(@Param('id') id: number) { 
        return this._userService.destroy(id);
    }
}