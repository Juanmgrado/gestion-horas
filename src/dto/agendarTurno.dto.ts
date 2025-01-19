import { IsDate, IsNotEmpty, IsString, Matches } from "class-validator";


export class AgendarTurnoDTO{

    @IsNotEmpty({message: "Debe asignar un empleado"})
    @IsString()
    empleado: string;

    @IsNotEmpty({ message: "La fecha es obligatoria" })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: "La fecha debe estar en formato dd/mm/yyyy" })
    fecha: string;

    @IsNotEmpty({message: "El dia es obligatorio"})
    @IsString({message: "Día no válido"})
    dia: string;

    @IsNotEmpty({message: "Debe asginar una hora de entrada"})
    @IsString({message: "Hora no válida"})
    horaIngreso: string;

    @IsNotEmpty({message: "Debe asignar un hora de salida"})
    @IsString({message: "Hora no válida"})
    horaSalida: string;
}