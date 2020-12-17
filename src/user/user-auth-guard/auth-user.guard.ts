import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import contextService = require('request-context')

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        if (!request.headers.authorization) {
            return false
        }
        const decoded = await this.validateToken(request.headers.authorization)
        request.user = decoded
    
        if ( request.user.username!='user9876' ) {
            throw new HttpException(
                'User Token Not Valid',
                HttpStatus.FORBIDDEN
            )
        }

        const data = { username: request.user.username}
        request.user = data
      //  contextService.set('request:admin', request.user.username)
        return true
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN)
        }
        const token = auth.split(' ')[1]
        try {
            const decoded = jwt.verify(token, 'sku@1234')
            return decoded
        } catch (err) {
            const message = 'Token error:' + (err.messgae || err.name)
            throw new HttpException(message, HttpStatus.FORBIDDEN)
        }
    }
}