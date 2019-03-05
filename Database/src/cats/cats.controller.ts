import { Controller, Get, Post, Body } from '@nestjs/common';
import { create } from 'domain';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
    @Post()
    create(@Body() CreateCatDto){
        
        return 'This Return a Cats';
    }
}
