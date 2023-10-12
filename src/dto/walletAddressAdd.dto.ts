import { IsString } from "class-validator";

export class WalletAddressAddDto {
    @IsString()
    public walletAddress!: string; 

    // @IsString()
    // public name!: string;
}