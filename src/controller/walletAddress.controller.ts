import { Request, Response } from "express";
import { WalletAddressService } from "../service/walletAddress.service";
import { WalletAddressInterface } from "../types/walletAddress";
import { WalletAddressAddDto } from "../dto/walletAddressAdd.dto";
import { WalletAddressUpdateDto } from "../dto/walletAddressUpdate.dto";
import logger from "../logs/logger";
import WalletAddress from "../model/walletAddress.model";

export class WalletAddressController {
  private walletAddressService = new WalletAddressService();
  private WalletAddress: any;

  constructor() {
    this.walletAddressService = new WalletAddressService();
    this.WalletAddress = WalletAddress;
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
      const userId: String = req.user.toString();
      const walletAddressData: WalletAddressAddDto = req.body;

      const walletExist = await this.WalletAddress.findOne({ walletAddress: walletAddressData.walletAddress });
      console.log("Wallet address data: ", walletAddressData);
      console.log("Wallet exist: ", walletExist);

      if (walletExist == null) {
        try {
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
      } else {
        logger.info(`Wallet address add failed as already exists`);
        res.status(500).json({
          message: "Wallet address add failed as already exists"
        });
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
