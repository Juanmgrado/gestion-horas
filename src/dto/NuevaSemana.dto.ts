import { IsNotEmpty, IsString } from "class-validator";

export class NuevaSEmanaDTO{
    
    @IsNotEmpty({message: "Debe ingresar un empleado"})
    @IsString({message: "El formato del nombre de empleado no es correcto"})
    empleado: string;

    @IsNotEmpty({message: "Debe ingresar una fecha de inicio de semana"})
    @IsString({message: "La fecha de inicio no es el formato correcto, dd/mm/yyyy"})
    inicioSemana: string;

    @IsNotEmpty({message: "Debe ingresar una fecha de final de semana"})
    @IsString({message: "La fecha de fin no es el formato correcto, dd/mm/yyyy"})
    finalSemana: string;
}