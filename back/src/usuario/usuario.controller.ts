import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { nuevoUsuarioDto } from 'src/dto/nuevoUsuario.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ){}

    @Post('agregar')
    @HttpCode(201)
    async agregarUsuario(
        @Body()nuevoUsuario: nuevoUsuarioDto
    ): Promise<Partial <nuevoUsuarioDto>>{
       
        return await this.usuarioService.agregarUsuario(nuevoUsuario)
    }
    
}
