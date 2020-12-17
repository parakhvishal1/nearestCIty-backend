import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-admin.dto';


@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService
    ) {}
    async userLogin(data: UserAuthDto): Promise<{}> {
        const { username, password } = data
    
        if (username != 'user9876' && password != 'User@1234') {
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

}
