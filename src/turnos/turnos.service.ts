import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgendarTurnoDTO } from 'src/dto/agendarTurno.dto';
import { TurnoLaboral } from 'src/entities/turnos.entity';
import { Usuario } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { parse } from 'date-fns';

@Injectable()
export class TurnosService {
    constructor(
        @InjectRepository(TurnoLaboral)
        private readonly turnoLaboraRepository: Repository<TurnoLaboral>,
        @InjectRepository(Usuario)
        private readonly usuarioRespository: Repository<Usuario>
    ){}

    
    calcularHorasTotales(horaEntrada: string, horaSalida: string): string {
        const horaEntradaRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
        const horaSalidaRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    
        if (!horaEntradaRegex.test(horaEntrada)) {
            throw new Error("La hora de entrada no tiene el formato correcto. Debe ser HH:mm.");
        }
    
        if (!horaSalidaRegex.test(horaSalida)) {
            throw new Error("La hora de salida no tiene el formato correcto. Debe ser HH:mm.");
        }
    
        const [horaEntradaHoras, horaEntradaMinutos] = horaEntrada.split(':').map(Number);
        const [horaSalidaHoras, horaSalidaMinutos] = horaSalida.split(':').map(Number);
    
        if (horaEntradaHoras < 0 || horaEntradaHoras > 23 || horaEntradaMinutos < 0 || horaEntradaMinutos > 59) {
            throw new Error("La hora de entrada contiene valores inválidos.");
        }
        if (horaSalidaHoras < 0 || horaSalidaHoras > 23 || horaSalidaMinutos < 0 || horaSalidaMinutos > 59) {
            throw new Error("La hora de salida contiene valores inválidos.");
        }
    
        const minutosEntrada = horaEntradaHoras * 60 + horaEntradaMinutos;
        const minutosSalida = horaSalidaHoras * 60 + horaSalidaMinutos;
    
        if (minutosEntrada > minutosSalida) {
            throw new Error("La hora de entrada no puede ser mayor que la hora de salida.");
        }
    
        let diferenciaMinutos = minutosSalida - minutosEntrada;
        
        if (diferenciaMinutos < 0) {
            diferenciaMinutos += 24 * 60; 
        }
    
        const horas = Math.floor(diferenciaMinutos / 60);
        const minutos = diferenciaMinutos % 60;
    
        const totalHorasString = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
    
        return totalHorasString;
    }
    
    async agendarTurno(nuevoTurno: AgendarTurnoDTO): Promise<AgendarTurnoDTO | string>{

        const { empleado, fecha, horaIngreso, horaSalida } = nuevoTurno;
        const fechaParseada = parse(fecha, "dd/MM/yyy", new Date())
        
        try{
            const empleadoEncontrado = await this.usuarioRespository.findOneBy({nombre: empleado});
            if (!empleadoEncontrado) throw new NotFoundException("Empleado no encontrado");

            const fechaActual = new Date();
                if(fechaParseada < fechaActual) throw new BadRequestException("La fecha del turno debe ser mayo a la actual");
        
            let totalHoras = this.calcularHorasTotales(horaIngreso, horaSalida);

            const agendarTurno: TurnoLaboral = new TurnoLaboral();
                agendarTurno.dia = nuevoTurno.dia 
                agendarTurno.fecha = nuevoTurno.fecha
                agendarTurno.horaIngreso = nuevoTurno.horaIngreso
                agendarTurno.horaSalida = nuevoTurno.horaSalida
                agendarTurno.totalHoras = totalHoras
                agendarTurno.usuario = empleadoEncontrado
            
                await this.turnoLaboraRepository.save(agendarTurno);
                await this.usuarioRespository.save(empleadoEncontrado);

            return {
                empleado: empleadoEncontrado.nombre,
                fecha: agendarTurno.fecha,
                dia: agendarTurno.dia,
                horaIngreso: agendarTurno.horaIngreso,
                horaSalida: agendarTurno.horaSalida
            };
        
        }catch(err){
            throw new InternalServerErrorException(`Ha ocurrido un error ${err}`)
        }

    }
}
