import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/role.dto";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@ApiTags('Roles')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
})
@UseGuards(AuthorizationGuard)
@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService){}
    @Get()
    async index(@Query() query, @Query('page') page:number, @Query('perPage') perPage:number) {
        return await this._roleService.findAndCount(page, perPage, query);
    }

    @Get('/all')
    async all() {
        return await this._roleService.findAll();
    }

    @Post()
    async create(@Body() createRoleDTO:CreateRoleDTO) { 
        return await this._roleService.create(createRoleDTO)
    }
    
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() updateRoleDTO: UpdateRoleDTO) {
        return await this._roleService.update(id, updateRoleDTO);
     }
    
    @Get('/:id')
    async getById(@Param('id') id: number) { 
        return this._roleService.findById(id);
    }
    
    @Delete('/:id')
    async distroy(@Param('id') id: number) { 
        return this._roleService.destroy(id);
    }
}