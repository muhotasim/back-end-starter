import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/role.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { PermissionGuard } from "src/guards/permission.guard";

@ApiTags('Roles')
@UseGuards(AuthorizationGuard)
@Controller('roles')
@ApiBearerAuth()
export class RoleController {
    constructor(private readonly _roleService: RoleService){}
    @Get()
    @UseGuards(new PermissionGuard(['can-get-roles-with-count']))
    async index(@Query() query, @Query('page') page:number, @Query('perPage') perPage:number) {
        return await this._roleService.findAndCount(page, perPage, query);
    }

    @Get('/all')
    @UseGuards(new PermissionGuard(['can-get-all-roles']))
    async all() {
        return await this._roleService.findAll();
    }

    @Post()
    @UseGuards(new PermissionGuard(['can-create-role']))
    async create(@Body() createRoleDTO:CreateRoleDTO) { 
        return await this._roleService.create(createRoleDTO)
    }
    
    @Patch('/:id')
    @UseGuards(new PermissionGuard(['can-update-role']))
    async update(@Param('id') id: number, @Body() updateRoleDTO: UpdateRoleDTO) {
        return await this._roleService.update(id, updateRoleDTO);
     }
    
    @Get('/:id')
    @UseGuards(new PermissionGuard(['can-get-single-role']))
    async getById(@Param('id') id: number) { 
        return this._roleService.findById(id);
    }
    
    @Delete('/:id')
    @UseGuards(new PermissionGuard(['can-delete-role']))
    async distroy(@Param('id') id: number) { 
        return this._roleService.destroy(id);
    }
}