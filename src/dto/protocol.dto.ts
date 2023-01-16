import { IsBoolean, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";

export class ProtocolDto {

    //implicit constructor

    @IsString()
    public protocolName!: string;
}