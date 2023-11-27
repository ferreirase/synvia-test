import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  responsibleId?: number;
}
