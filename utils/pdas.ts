import { utils, web3 } from "@coral-xyz/anchor";

export class KeyBumpPair {
  public key: web3.PublicKey | undefined;
  public bump: number | undefined;
}

export const SELLER_LEVELS_LIST_SEED = "seller_levels_list";
export const SELLER_SCORE_LIST_SEED = "seller_score_list";

// This class manages all the PDAs used in the program.
export class PDA {
  private readonly programId: web3.PublicKey;
  public readonly sellersScoreList: web3.PublicKey;
  public readonly contractState: KeyBumpPair;
  public readonly sellersLevelList: web3.PublicKey;
  public readonly reserveStake: KeyBumpPair;
  public readonly protocolMint: KeyBumpPair;
  public readonly protocolFee: KeyBumpPair;
  public readonly fundingAuthority: KeyBumpPair;

  // It is intentionally private. Please use `new()` to create an instance of `PDA`.
  private constructor(
    programId: web3.PublicKey,
    sellersScoreList: web3.PublicKey,
    contractState: KeyBumpPair,
    sellersLevelList: web3.PublicKey,
    reserveStake: KeyBumpPair,
    protocolMint: KeyBumpPair,
    protocolFee: KeyBumpPair,
    fundingAuthority: KeyBumpPair
  ) {
    this.programId = programId;
    this.sellersScoreList = sellersScoreList;
    this.contractState = contractState;
    this.sellersLevelList = sellersLevelList;
    this.reserveStake = reserveStake;
    this.protocolMint = protocolMint;
    this.protocolFee = protocolFee;
    this.fundingAuthority = fundingAuthority;
  }

  static async new(
    programId: web3.PublicKey,
    manager: web3.PublicKey
  ): Promise<PDA> {
    const sellersScoreList = await web3.PublicKey.createWithSeed(
      manager,
      SELLER_SCORE_LIST_SEED,
      programId
    );
    const sellersLevelList = await web3.PublicKey.createWithSeed(
      manager,
      SELLER_LEVELS_LIST_SEED,
      programId
    );
    // Accounts as PDAs with seed and bump
    const [contractStateKey, contractStateBump] =
      web3.PublicKey.findProgramAddressSync(
        [Buffer.from("contract_state")],
        programId
      );
    const [reserveStakeKey, reserveStakeBump] =
      web3.PublicKey.findProgramAddressSync(
        [Buffer.from("reserve_stake")],
        programId
      );
    const [protocolMintKey, protocolMintBump] =
      web3.PublicKey.findProgramAddressSync(
        [Buffer.from("protocol_mint")],
        programId
      );
    const [protocolFeeKey, protocolFeeBump] =
      web3.PublicKey.findProgramAddressSync(
        [Buffer.from("protocol_fee")],
        programId
      );
    const [fundingAuthorityKey, fundingAuthorityBump] =
      web3.PublicKey.findProgramAddressSync(
        [Buffer.from("funding_authority")],
        programId
      );

    return new PDA(
      programId,
      sellersScoreList,
      {
        key: contractStateKey,
        bump: contractStateBump,
      },
      sellersLevelList,
      {
        key: reserveStakeKey,
        bump: reserveStakeBump,
      },
      {
        key: protocolMintKey,
        bump: protocolMintBump,
      },
      {
        key: protocolFeeKey,
        bump: protocolFeeBump,
      },
      {
        key: fundingAuthorityKey,
        bump: fundingAuthorityBump,
      }
    );
  }

  async sellerSdtLamports(
    seller: web3.PublicKey,
    protocolMint: web3.PublicKey
  ): Promise<KeyBumpPair> {
    const [key, bump] = web3.PublicKey.findProgramAddressSync(
      [
        seller.toBuffer(),
        utils.token.TOKEN_PROGRAM_ID.toBuffer(),
        protocolMint.toBuffer(),
      ],
      utils.token.ASSOCIATED_PROGRAM_ID
    );
    return { key: key, bump: bump };
  }

  async escrowPda(buyer: web3.PublicKey): Promise<KeyBumpPair> {
    const [key, bump] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), buyer.toBuffer()],
      this.programId
    );
    return { key: key, bump: bump };
  }
}
