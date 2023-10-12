import { WalletAddressInterface } from "../types/walletAddress";
import WalletAddress from "../model/walletAddress.model";
import { WalletAddressAddDto } from "../dto/walletAddressAdd.dto";
import { WalletAddressUpdateDto } from "../dto/walletAddressUpdate.dto";
import User from "../model/user.model";
import { UserInterface } from "../types/user";
import logger from "../logs/logger";

export class WalletAddressRepository {
  private WalletAddress: any;
  private User: any;

  constructor() {
    this.WalletAddress = WalletAddress;
    this.User = User;
  }

  public async getWalletAddresses(
    userId: String
  ): Promise<WalletAddressInterface[]> {
    try {
      const walletAddresses: WalletAddressInterface[] =
        await this.WalletAddress.find({ user: userId });
      console.log("userid: ", userId);
      return walletAddresses;
    } catch (error) {
      throw error;
    }
  }

  public async countWalletAddresses(userId: String): Promise<Number> {
    try {
      const walletAddresses: Array<WalletAddressInterface> =
        await this.WalletAddress.find({ user: userId });
      let existingWalletAddressesCount: Number = walletAddresses.length;
      return existingWalletAddressesCount;
    } catch (error) {
      throw error;
    }
  }

  public async addWalletAddress(
    userId: String,
    walletAddress: WalletAddressInterface
  ): Promise<WalletAddressInterface> {
    try {
      let user: UserInterface = await this.User.findById(userId);
      user.walletAddresses.push(walletAddress);
      await user.save();

      await walletAddress.save();
      const newWalletAddress: WalletAddressInterface =
        await this.WalletAddress.findById(walletAddress._id);
      newWalletAddress.user.notes = user.notes;
      return newWalletAddress;
    } catch (error) {
      throw error;
    }
  }

  // check that this is properly persisting both sides based on db structure
  public async updateUserWalletAddress(
    userId: String,
    walletAddressId: String,
    walletAddressData: WalletAddressUpdateDto
  ): Promise<WalletAddressInterface | null> {
    try {
      console.log("Repo");
      const updatedUserWalletAddress: UserInterface | null =
        await this.User.findByIdAndUpdate(
          { _id: userId, "walletAddresses.id": walletAddressId },
          {
            $set: {
              name: walletAddressData.name,
            },
          }
        );

      const updatedWalletAddress: WalletAddressInterface | null =
        await this.WalletAddress.findByIdAndUpdate(
          { _id: walletAddressId },
          {
            $set: {
              name: walletAddressData.name,
            },
          }
        );

      if (updatedUserWalletAddress && updatedWalletAddress) {
        updatedWalletAddress.user.notes = updatedUserWalletAddress.notes;
      }
      return updatedWalletAddress;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserWalletAddress(
    userId: String,
    walletAddressId: String
  ): Promise<WalletAddressInterface | null> {
    try {
      const deletedUserWalletAddress: UserInterface | null =
        await this.User.findByIdAndUpdate(
          userId,
          {
            $pull: {
              walletAddresses: walletAddressId,
            },
          },
          { new: true }
        );
      const deletedWalletAddress: WalletAddressInterface | null =
        await this.WalletAddress.findByIdAndDelete(walletAddressId);
      return deletedWalletAddress;
    } catch (error) {
      throw error;
    }
  }
}
