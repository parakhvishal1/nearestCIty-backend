import { Body, Controller, Get, Post, ValidationPipe, UseGuards, Request, Res, HttpStatus, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthDto } from './dto/auth-admin.dto'; 
import { AdminAuthGuard } from './admin-auth-guard/admin-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';
import { AddCityDto } from './dto/add-city.dto';
@Controller('auth-admin')
export class AuthAdminController {
    constructor(
        private readonly authAdminService: AuthAdminService,
        
    ) {}
    @Post()
    login(@Body(ValidationPipe) data: AuthDto) {
        return this.authAdminService.adminLogin(data);
    }

    @Post('/addcity')
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    async addCity(@Res() res,@Body() data: AddCityDto) {
        const addCity = await this.authAdminService.addCity(data);
        return res.status(HttpStatus.OK).json({
            message: "City has been created successfully",
            addCity
        })
    }

    @Get('/get')
    async getCity(@Res() res) {
        const city = await this.authAdminService.getCity();
        return res.status(HttpStatus.OK).json(city);
    }

    @Put('/update')
    async updateCity(@Res() res, @Query('cityID') cityID, @Body() addCityDTO: AddCityDto) {
        const city = await this.authAdminService.updateCity(cityID, addCityDTO);
        if (!city) throw new NotFoundException('City does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'City has been successfully updated',
            city
        });
    }

    // Delete a city
    @Delete('/delete')
    async deleteCity(@Res() res, @Query('cityID') cityID) {
        const city = await this.authAdminService.deleteCity(cityID);
        if (!city) throw new NotFoundException('City does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'City has been deleted',
            city
        })
    }
}
    

