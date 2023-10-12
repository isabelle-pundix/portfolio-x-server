import { WalletAddressRepository } from "../repository/walletAddress.repository";
import WalletAddress from "../model/walletAddress.model";
import { WalletAddressAddDto } from "../dto/walletAddressAdd.dto";
import { WalletAddressUpdateDto } from "../dto/walletAddressUpdate.dto";
import { WalletAddressInterface } from "../types/walletAddress";

export class WalletAddressService {
    private walletAddressRepository: WalletAddressRepository;

    constructor() {
        this.walletAddressRepository = new WalletAddressRepository();
    }

    public async getUserWalletAddresses(userId: String): Promise<Array<WalletAddressInterface>> {
        const walletAddresses: WalletAddressInterface[] | null = await this.walletAddressRepository.getWalletAddresses(userId);
        return walletAddresses;
    }

    public async addUserWalletAddress(userId: String, walletAddressData: WalletAddressAddDto): Promise<WalletAddressInterface> {
        let walletAddressCount: Number = await this.walletAddressRepository.countWalletAddresses(userId);
        let numWallets: Number = new Number(1 + walletAddressCount.valueOf());

        const walletAddress: WalletAddressInterface = new WalletAddress( {
            user: userId,
            name: "Wallet " + numWallets,
            walletAddress: walletAddressData.walletAddress
        });
        const newWalletAddress: WalletAddressInterface = await this.walletAddressRepository.addWalletAddress(userId, walletAddress);
        return newWalletAddress;
    }

    public async updateUserWalletAddress(userId: String, walletAddressId: String, walletAddressData: WalletAddressUpdateDto): Promise<WalletAddressInterface | null> {
        const updatedWalletAddress: WalletAddressInterface | null = await this.walletAddressRepository.updateUserWalletAddress(userId, walletAddressId, walletAddressData);
        return updatedWalletAddress;
    }

    public async deleteUserWalletAddress(userId: String, walletAddressId: String): Promise<WalletAddressInterface | null> {
        const deletedWalletAddress: WalletAddressInterface | null = await this.walletAddressRepository.deleteUserWalletAddress(userId, walletAddressId);
        return deletedWalletAddress;
    }
}