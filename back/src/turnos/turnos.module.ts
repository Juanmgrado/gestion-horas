import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/user.entity';
import { TurnoLaboral } from 'src/entities/turnos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, TurnoLaboral])
  ],
  providers: [
    TurnosService
  ],
  controllers: [
    TurnosController
  ]
})
export class TurnosModule {}
