import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AddCity } from './interfaces/add-city.interface';
import { AddCityDto } from './dto/add-city.dto';
import { AuthDto } from './dto/auth-admin.dto';

@Injectable()

export class AuthAdminService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel('AddCity') private readonly addCityModel: Model<AddCity>)
     {}
    async adminLogin(data: AuthDto): Promise<{}> {
        const { username, password } = data
    
       
        if (username != 'admin1234' && password != 'Cc@1234') {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST
            )
        }
        const payload = { username }
        const accessToken = await this.jwtService.sign(payload)

        return {
            statusCode: HttpStatus.OK,
            message: 'Login successfully',
            token: accessToken,
        }
        
    }

    async addCity(data: AddCityDto): Promise<{}> {
        const newCity = await this.addCityModel.create(data);
        return newCity.save();
    }
        //Edit city details
    async updateCity(cityID, AddCityDto: AddCityDto): Promise<{}> {
        const updatedCustomer = await this.addCityModel
            .findByIdAndUpdate(cityID, AddCityDto, { new: true });
        return updatedCustomer;
    }

    async getCity(): Promise<AddCity[]> {
        const city = await this.addCityModel.find().exec();
        return city;
    }

    async deleteCity(cityID): Promise<any> {
        const deletedCity = await this.addCityModel.findByIdAndRemove(cityID);
        return deletedCity;
    }
    
}




