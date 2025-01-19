import { IsString, Length } from "class-validator";

export class EliminarUsuarioDTO{
@IsString({message: "Nombre de usuario incorrecto"})
@Length(3,30,{message: "Nombre muy largo o muy extenso"})
nombre: string;
}