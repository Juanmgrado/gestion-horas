import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";
import { HorasTrabajadas } from "./horasTrabajadas.entity";
import { TurnoLaboral } from "./turnos.entity";

@Entity('SEMANAS')
export class Semana{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    inicioSemana: Date;

    @Column()
    finSemana: Date;

    @Column()
    totalHoras: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.semana)
    usuario: Usuario;

    @OneToMany(() => HorasTrabajadas, (horasTrabajadas) => horasTrabajadas.semana)
    horasTrabajadas: HorasTrabajadas;

    @OneToMany(() => TurnoLaboral, (turnoLaboral) => turnoLaboral.semana)
    turnoLaboral: TurnoLaboral

}