import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { User, errorResponse, successResponse } from "src/utils/common.functions";
import messagesConst from "src/utils/message-const.message";
import { NotificationService } from "../services/notification.service";
import { NotificationStatus } from "src/utils/custome.datatypes";
@ApiTags('Notification')
@UseGuards(AuthorizationGuard)
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
    constructor(private readonly _notificationService: NotificationService) { }
    @Get()
    async index(@User() userInfo, @Query() query = {}, @Query('page') page: number, @Query('perPage') perPage: number) {
        try {
            const data = await this._notificationService.findAndCount(page, perPage, {...query, user_id: userInfo.id})
            return successResponse(data, messagesConst['en'].controller.notification.index);
        } catch (e) {
            return errorResponse(e);
        }
    }

    @Patch('/mark-read')
    async markAsRead(@User() userInfo, @Body('notificationIDs') ids: number[]){
        try{
            await this._notificationService.updateNotifications(ids, { status: NotificationStatus.read })
            return successResponse({}, messagesConst['en'].controller.notification.update)
        } catch (e) {
            return errorResponse(e);
        }
    }

    @Post()
    async createNotification(@User() userInfo, @Body() body){
        try{
            const data = await this._notificationService.createBatchNotification([body])
            return successResponse(data, messagesConst['en'].controller.notification.create)
        } catch (e) {
            return errorResponse(e);
        }
    }

}