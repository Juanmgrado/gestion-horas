import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './configs/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeOrm'),
    }),
    UsuarioModule,
    TurnosModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
