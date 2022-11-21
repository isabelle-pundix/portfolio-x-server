import { IsBoolean, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";

export class NoteDto {

    //implicit constructor

    @IsString()
    public content!: string;

    @IsString()
    public group!: string;
}