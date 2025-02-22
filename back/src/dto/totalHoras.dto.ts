import { IsNotEmpty, IsString } from "class-validator";

export class TotalHoras{

    @IsNotEmpty({message: "El campo del empleado no puede estar vacío"})
    @IsString({message: "El tipo de dato del empleado no es correcto"})
    empleado: string;

    @IsNotEmpty({message: "Debe ingresar un día"})
    @IsString({message: "EL tipo de dato del día no es correcto"})
    dia: string;

    @IsNotEmpty({message: "El campo de la fecha no puede estar vacío"})
    @IsString({message: "El tipo de dato de la fecha no es correcto"})
    fecha: string;
}