import { IsBoolean, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";

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