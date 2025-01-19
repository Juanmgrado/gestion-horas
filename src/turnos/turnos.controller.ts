import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { AgendarTurnoDTO } from 'src/dto/agendarTurno.dto';

@Controller('turnos')
export class TurnosController {
    constructor(
        private readonly turnosService: TurnosService){}
    
    @Post("agendarTurno")
    @HttpCode(201)    
    async agendarTurno(
        @Body()nuevoTurno: AgendarTurnoDTO
    ): Promise<AgendarTurnoDTO | string>{
        return  await this.turnosService.agendarTurno(nuevoTurno)
    }
}
