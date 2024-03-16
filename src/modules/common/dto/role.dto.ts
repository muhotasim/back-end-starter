import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateRoleDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  is_active: boolean;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  is_active: boolean;
}