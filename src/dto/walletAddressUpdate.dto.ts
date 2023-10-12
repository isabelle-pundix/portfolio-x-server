import { IsString } from "class-validator";

export class WalletAddressUpdateDto {

    @IsString()
    public name!: string;
}