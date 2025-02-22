import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TurnoLaboral } from "./turnos.entity";
import { HorasTrabajadas } from "./horasTrabajadas.entity";
import { Semana } from "./semanas.entity";
import { UsuarioEstado } from "src/usuario/enums/usuarioEstado.enum";

@Entity('USUARIOS')
export class Usuario{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true})
    nombre: string;

    @Column({nullable: true})
    telefono: number;

    @Column({nullable: false})
    contraseña: string;

    @Column({default: false})
    admin: boolean;

    @Column({default: true})
    estaActivo: boolean;

    @Column({type: "enum", default: UsuarioEstado.offline })
    estado: UsuarioEstado;

    @OneToMany(() => HorasTrabajadas, (horasTrabajadas) => horasTrabajadas.usuario)
    horasTrabajadas: HorasTrabajadas;

    @OneToMany(() => Semana, (semana) => semana.usuario)
    semana: Semana;

    @OneToMany(()=> TurnoLaboral, (turnoLaboral) => turnoLaboral.usuario)
    turnos: TurnoLaboral;
    
}