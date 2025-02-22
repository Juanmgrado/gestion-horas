import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";
import { Semana } from "./semanas.entity";

@Entity('HORAS_TRABAJADAS')
export class HorasTrabajadas{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({nullable: false})
    totalHoras: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.horasTrabajadas)
    usuario: Usuario;

    @ManyToOne(() => Semana, (semana) => semana.horasTrabajadas)
    semana: Semana;
}