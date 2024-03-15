import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PermissionService } from "../services/permissions.service";
import { CreatePermissionDTO, UpdatePermissionDTO } from "../dto/permission.dto";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
@ApiTags('Permission')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
})
@Controller('permission')
export class PermissionController {
    constructor(private readonly _permissionService: PermissionService) { }
    @Get()
    async index(@Query() query, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this._permissionService.findAndCount(page, perPage, query);
    }

    @Get('/all')
    async all() {
        return await this._permissionService.findAll();
    }



    @Post()
    async create(@Body() createPermissionDTO: CreatePermissionDTO) {
        return await this._permissionService.create(createPermissionDTO)
    }

    @Patch('/:id')
    async update(@Param('id') id: number, @Body() updatePermissionDTO: UpdatePermissionDTO) {
        return await this._permissionService.update(id, updatePermissionDTO);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this._permissionService.findById(id);
    }

    @Delete('/:id')
    async distroy(@Param('id') id: number) {
        return this._permissionService.destroy(id);
    }
}