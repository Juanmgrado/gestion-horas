import { UsuarioEstado } from "src/usuario/enums/usuarioEstado.enum";


export interface IPayload{
    nombre: string,
    phone: number,
    estaActivo: UsuarioEstado
}