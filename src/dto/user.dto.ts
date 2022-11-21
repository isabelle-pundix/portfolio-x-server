import { IsBoolean, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";
import { NoteDto } from "./note.dto";

export class UserDto {

    //implicit constructor
    
    @IsString()
    public name!: string;

    @IsString()
    public email!: string

    @IsString()
    public password!: string

    @IsBoolean()
    public status!: boolean
}