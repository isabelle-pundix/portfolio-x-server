import { IsString } from "class-validator";

export class LogInDto {

    @IsString()
    public walletAddress!: string;

    // @IsString()
    // public email!: string;

    // @IsString()
    // public password!: string
}