import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionService } from "../services/permissions.service";
import { CreatePermissionDTO, UpdatePermissionDTO } from "../dto/permission.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { PermissionGuard } from "src/guards/permission.guard";
@ApiTags('Permission')
@UseGuards(AuthorizationGuard)
@Controller('permission')
@ApiBearerAuth()
export class PermissionController {
    constructor(private readonly _permissionService: PermissionService) { }
    
    @Get()
    @UseGuards(new PermissionGuard(['can-get-permission-with-count']))
    async index(@Query() query, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this._permissionService.findAndCount(page, perPage, query);
    }

    @Get('/all')
    @Get()
    @UseGuards(new PermissionGuard(['can-get-permission-with-count']))
    async all() {
        return await this._permissionService.findAll();
    }



    @Post()
    @Get()
    @UseGuards(new PermissionGuard(['can-create-permission']))
    async create(@Body() createPermissionDTO: CreatePermissionDTO) {
        return await this._permissionService.create(createPermissionDTO)
    }

    @Patch('/:id')
    @Get()
    @UseGuards(new PermissionGuard(['can-get-single-permission']))
    async update(@Param('id') id: number, @Body() updatePermissionDTO: UpdatePermissionDTO) {
        return await this._permissionService.update(id, updatePermissionDTO);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this._permissionService.findById(id);
    }

    @Delete('/:id')
    @Get()
    @UseGuards(new PermissionGuard(['can-delete-permission']))
    async distroy(@Param('id') id: number) {
        return this._permissionService.destroy(id);
    }
}