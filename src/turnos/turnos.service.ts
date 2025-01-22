import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgendarTurnoDTO } from 'src/dto/agendarTurno.dto';
import { TurnoLaboral } from 'src/entities/turnos.entity';
import { Usuario } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { parse } from 'date-fns';
import { Semana } from 'src/entities/semanas.entity';
import { HorasTrabajadas } from 'src/entities/horasTrabajadas.entity';

@Injectable()
export class TurnosService {
    constructor(
        @InjectRepository(TurnoLaboral)
        private readonly turnoLaboraRepository: Repository<TurnoLaboral>,
        @InjectRepository(Usuario)
        private readonly usuarioRespository: Repository<Usuario>,
        @InjectRepository(Semana)
        private readonly semanasRepository: Repository<Semana>,
        @InjectRepository(HorasTrabajadas)
        private readonly horasTrabajadasRepository: Repository<HorasTrabajadas>
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
    
    async agendarTurno(nuevosTurnos: AgendarTurnoDTO[]): Promise<(AgendarTurnoDTO | string)[]> {
        try {
            const resultados = await Promise.all(
                nuevosTurnos.map(async (nuevoTurno) => {
                    try {
                        const { empleado, fecha, horaIngreso, horaSalida, dia } = nuevoTurno;
                        const fechaParseada = parse(fecha, "dd/MM/yyyy", new Date());
    
                        const empleadoEncontrado = await this.usuarioRespository.findOneBy({ nombre: empleado });
                        if (!empleadoEncontrado) {
                            throw new Error(`Empleado ${empleado} no encontrado`);
                        }
    
                        const fechaActual = new Date();
                        if (fechaParseada < fechaActual) {
                            throw new Error(`La fecha del turno para ${empleado} debe ser mayor a la actual`);
                        }
    
                        const totalHoras = this.calcularHorasTotales(horaIngreso, horaSalida);
    
                        const agendarTurno: TurnoLaboral = new TurnoLaboral();
                        agendarTurno.dia = dia;
                        agendarTurno.fecha = nuevoTurno.fecha;
                        agendarTurno.horaIngreso = horaIngreso;
                        agendarTurno.horaSalida = horaSalida;
                        agendarTurno.totalHoras = totalHoras;
                        agendarTurno.usuario = empleadoEncontrado;
    
                        await this.turnoLaboraRepository.save(agendarTurno);
                        return {
                            empleado: empleadoEncontrado.nombre,
                            fecha: agendarTurno.fecha,
                            dia: agendarTurno.dia,
                            horaIngreso: agendarTurno.horaIngreso,
                            horaSalida: agendarTurno.horaSalida,
                        };
                    } catch (error) {
                        return `Error al procesar el turno para ${nuevoTurno.empleado}: ${error.message}`;
                    }
                })
            );
            return resultados; 
        } catch (error) {
            throw new InternalServerErrorException(`Ha ocurrido un error general: ${error.message}`);
        }
    }

    convertirHorasMinutos(arrayHoraMinuto: string[]): string {

        const totalMinutos = arrayHoraMinuto.reduce((acumulador, horaMinuto) => {
            const [horas, minutos] = horaMinuto.split(':').map(Number);  
            return acumulador + horas * 60 + minutos;
        }, 0);
    
        const horasTotales = Math.floor(totalMinutos / 60); 
        const minutosRestantes = totalMinutos % 60; 
    
        const totalHorasString = `${String(horasTotales).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
        
        return totalHorasString;
    }
    
 
    async totalHorasTrabajadas(horasTotalesEmpleado: []){

        const { empleado, horasTrabajadas, dia, fecha } = horasTotalesEmpleado;

        const totalHoras = convertirHorasMinutos(horasTrabajadas);

        const nuevaSemana = new Semana()
        const inicioSemana = fecha.filter(fechas => fechas =)
    }

}
