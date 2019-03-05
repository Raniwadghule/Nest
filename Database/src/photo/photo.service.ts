import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { EmployeeDTO } from './photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async create(data:EmployeeDTO){
    //const Employee = await this.photoRepository.create(data);
   // console.log(JSON.stringify(Employee));
    await this.photoRepository.save(data);
    return data;
  }

  async read(EmpId : string){
    return await this.photoRepository.findOne({where: {EmpId}});
  }

  async update(EmpId: number, data:EmployeeDTO){
    await this.photoRepository.update({ EmpId },data);
    return this.photoRepository.findOne({EmpId});
  }

  async destory(EmpId : number){
    await this.photoRepository.delete({EmpId});
    return {delete: true};
  }
}