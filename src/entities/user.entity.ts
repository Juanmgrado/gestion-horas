import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TurnoLaboral } from "./turnos.entity";
import { HorasTrabajadas } from "./horasTrabajadas.entity";
import { Semana } from "./semanas.entity";

@Entity('USUARIOS')
export class Usuario{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({nullable: false, unique: true})
    nombre: string;

    @Column({nullable: false})
    contraseña: string;

    @Column({default: false})
    admin: boolean;

    @Column({default: true})
    active: boolean;

    @OneToMany(() => HorasTrabajadas, (horasTrabajadas) => horasTrabajadas.usuario)
    horasTrabajadas: HorasTrabajadas;

    @OneToMany(() => Semana, (semana) => semana.usuario)
    semana: Semana;

    @OneToMany(()=> TurnoLaboral, (turnoLaboral) => turnoLaboral.usuario)
    turnos: TurnoLaboral;
    
}