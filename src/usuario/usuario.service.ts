import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EliminarUsuarioDTO } from 'src/dto/eliminarUsuario.dto';
import { nuevoUsuarioDto } from 'src/dto/nuevoUsuario.dto';
import { Usuario } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly UsuarioRepository: Repository<Usuario>
    ){}

    async agregarUsuario(nuevoUsuario: nuevoUsuarioDto): Promise<Partial<nuevoUsuarioDto>>{

        const { nombre } = nuevoUsuario;
        
        const comprobarNombre = await this.UsuarioRepository.findOneBy({nombre});
            if(comprobarNombre) throw new ConflictException( 'El usuario ya se encuentra registrado');

        try{

            const usuario: Usuario = new Usuario()
            usuario.nombre = nuevoUsuario.nombre
            usuario.contraseña = nuevoUsuario.contraseña
                await this.UsuarioRepository.save(usuario);

            return {nombre: usuario.nombre};
        
        }catch(err){
            throw new InternalServerErrorException({message: 'No se pudo registrar el usuario', err});

        }
    }

    async borrarUsuario(nombreUsuario: EliminarUsuarioDTO): Promise<string | null>{

        const {nombre} = nombreUsuario;

        try{
            const usuarioEncontrado = await this.UsuarioRepository.findOneBy({nombre})
                if (!usuarioEncontrado) new NotFoundException("Usuario no encontrado")

            usuarioEncontrado.active = false;

            return "Usuario eliminado con éxito."
        
        }catch(err){
            new ConflictException(`${err}`)
        }
    }
}
