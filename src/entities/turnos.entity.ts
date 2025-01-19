import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Semana } from "./semanas.entity";
import { Usuario } from "./user.entity";

@Entity('TURNOS')
export class TurnoLaboral{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({nullable: false})
    fecha: string;

    @Column({nullable: false})
    dia: string;

    @Column({nullable: false})
    horaIngreso: string;

    @Column({nullable: false})
    horaSalida: string;

    @Column({nullable: false})
    totalHoras: string;

    @ManyToOne(() => Semana, (semana) => semana.turnoLaboral)
    semana: Semana;
    
    @ManyToOne(() => Usuario, (usuario) => usuario.turnos)
    usuario: Usuario;
}