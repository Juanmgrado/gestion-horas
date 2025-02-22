import { Module } from '@nestjs/common';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig }  from '../configs/jwtoken.config'

@Module({
  imports:[
    JwtModule.register({
      secret: jwtConfig().jwt.secret,
      signOptions: {expiresIn: jwtConfig().jwt.accessExpiresIn}
    })
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService]
})
export class AutenticacionModule {}
