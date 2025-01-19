import { IsNotEmpty, IsString, IsStrongPassword, Length, Matches, Validate } from "class-validator";
import { VerificadorContraseña } from "src/decoradores/verificarContraseña.decorator";

export class nuevoUsuarioDto{

    @IsString()
    @IsNotEmpty({message: "El nombre no puede estar vacio"})
    @Length(3,20, {message: "El nombre de usuario no puede ser menor a 3 caracteres ni mayor a 20"})
    @IsNotEmpty({message: "El nombre de usuario no puede estar vacio"})
    @Matches(/^[a-zA-Z\s]+$/, {
        message: 'El nombre solo puede contener carácteres alfabéticos',
      })
    nombre: string;

    @IsNotEmpty({message: "La contraseña no puede estar vacía"})
    @IsStrongPassword({
    minLength: 8,           
    minNumbers: 1,          
    minLowercase: 1,        
    minUppercase: 1,        
    minSymbols: 1,          
  },{message: "La contraseña no cumple con las condiciones de seguridad"})
  @Length(8, 50, {message: 'La contraseña no respera las condiciones de longitud'})
   contraseña: string;

  @IsNotEmpty({message: "La verificación de contraseña no puede estar vacía"})
  @Validate(VerificadorContraseña, ["contraseña"])
  repetirContraseña: string;

}