import { Request, Response } from "express";
import { WalletAddressService } from "../service/walletAddress.service";
import { WalletAddressInterface } from "../types/walletAddress";
import { WalletAddressAddDto } from "../dto/walletAddressAdd.dto";
import { WalletAddressUpdateDto } from "../dto/walletAddressUpdate.dto";
import logger from "../logs/logger";

export class WalletAddressController {
  private walletAddressService = new WalletAddressService();

  constructor() {
    this.walletAddressService = new WalletAddressService();
  }

  public getUserWalletAddresseses = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId: String = req.user.toString();
      const userWalletAddresses: Array<WalletAddressInterface> =
        await this.walletAddressService.getUserWalletAddresses(userId);
      res.status(200).json({
        userWalletAddresses,
      });
    } catch (error) {
      logger.error("Wallet addresses retrieval error");
      throw error;
    }
  };

  public addUserWalletAddress = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId: String = req.user.toString();
      const walletAddressData: WalletAddressAddDto = req.body;
      const newWalletAddress: WalletAddressInterface =
        await this.walletAddressService.addUserWalletAddress(
          userId,
          walletAddressData
        );
      logger.info(
        `New wallet address added: ${newWalletAddress.user.walletAddresses}, ${newWalletAddress.name}: ${newWalletAddress.id}`
      );
      res.status(201).json({
        message: "Wallet address added",
        walletAddress: newWalletAddress,
      });
    } catch (error) {
      logger.error(`Add wallet address error`);
      throw error;
    }
  };

  public updateUserWalletAddress = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId: String = req.user.toString();
      const walletAddressId: String = req.params.walletAddressId;
      const walletAddressData: WalletAddressUpdateDto = req.body;

      const updatedWalletName: WalletAddressInterface | null =
        await this.walletAddressService.updateUserWalletAddress(
          userId,
          walletAddressId,
          walletAddressData
        );
      const userWalletAddresses: Array<WalletAddressInterface> =
        await this.walletAddressService.getUserWalletAddresses(userId);
      logger.info(
        `Wallet address updated ${updatedWalletName?.user.walletAddresses} - ${updatedWalletName?.id}`
      );
      res.status(201).json({
        message: "Wallet address name updated",
        name: updatedWalletName,
        userWalletAddresses: userWalletAddresses,
      });
    } catch (error) {
      logger.info(`Wallet address update error`);
      throw error;
    }
  };

  public deleteUserWalletAddress = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId: String = req.user.toString();
      const walletAddressId: String = req.params.walletAddressId;
      const deletedWalletAddress: WalletAddressInterface | null =
        await this.walletAddressService.deleteUserWalletAddress(
          userId,
          walletAddressId
        );
      const userWalletAddresses: Array<WalletAddressInterface> =
        await this.walletAddressService.getUserWalletAddresses(userId);
      logger.info(
        `Wallet address deleted: ${deletedWalletAddress?.user.walletAddresses}`
      );
      res.status(200).json({
        message: "Wallet address deleted",
        walletAddress: deletedWalletAddress,
        userWalletAddresses: userWalletAddresses,
      });
    } catch (error) {
      logger.info(`Wallet address delete error`);
      throw error;
    }
  };
}
