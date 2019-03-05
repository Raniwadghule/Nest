import { Controller,Get, Post, Body, Param, Put, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { EmployeeDTO } from './photo.dto';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll(@Res() res): Promise<Photo[]> {
    return this.photoService.findAll();
  }
  @Post()
  createEmployee(@Body() data: EmployeeDTO){
    return this.photoService.create(data)
  }
  @Get()
  readEmployee(@Param('EmpId') EmpId: string){
   return this.photoService.read(EmpId);
  }
  @Put()
  updateEmployee(@Query() query){
    return query.name;
  }
  // @Delete(':EmpId')
  // destroyEmployee(@Param('EmpId') EmpId:string){
  //   return this.photoService.destory(EmpId)
  // }

}
