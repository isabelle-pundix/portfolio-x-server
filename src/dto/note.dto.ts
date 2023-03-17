import { IsBoolean, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";

export class NoteDto {

    //implicit constructor

    @IsString()
    public content!: string;
    
}