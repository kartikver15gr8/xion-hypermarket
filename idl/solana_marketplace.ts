/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_marketplace.json`.
 */
export type SolanaMarketplace = {
  address: "9Ce5K5AHdn64wrcj622AWZcGUicy9hTmNeV2MCDmpJpW";
  metadata: {
    name: "solanaMarketplace";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Solana Marketplace";
  };
  instructions: [
    {
      name: "addSellerLevel";
      discriminator: [32, 214, 37, 160, 234, 46, 56, 115];
      accounts: [
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
          writable: true;
        },
        {
          name: "manager";
          docs: ["Manager account."];
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          docs: ["const accounts"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "addSellerLevelParams";
            };
          };
        }
      ];
    },
    {
      name: "claimAffiliatePayout";
      discriminator: [213, 61, 11, 217, 83, 124, 101, 27];
      accounts: [
        {
          name: "affiliate";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "protocolFee";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  116,
                  111,
                  99,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "buyer";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "claimPayout";
      discriminator: [127, 240, 132, 62, 227, 198, 146, 133];
      accounts: [
        {
          name: "sellerPda";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "seller";
          writable: true;
          signer: true;
        },
        {
          name: "buyer";
          writable: true;
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "protocolFee";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  116,
                  111,
                  99,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "claimReviewPayout";
      discriminator: [157, 104, 192, 54, 197, 222, 140, 103];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "depositStake";
      discriminator: [160, 167, 9, 220, 74, 243, 228, 43];
      accounts: [
        {
          name: "sellerPda";
          docs: ["Seller PDA account"];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "seller";
          docs: ["seller"];
          writable: true;
          signer: true;
        },
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
        },
        {
          name: "systemProgram";
          docs: ["const accounts"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "depositStakeParams";
            };
          };
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "contractState";
          docs: ["Account storing the state of this contract."];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  110,
                  116,
                  114,
                  97,
                  99,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
          writable: true;
        },
        {
          name: "manager";
          docs: [
            "Manager for the protocol. Only manager has the authority to initialize a new protocol.",
            "Manager also pays for any costs incurred during initialize."
          ];
          writable: true;
          signer: true;
        },
        {
          name: "protocolFee";
          docs: ["Account storing the protocol fee."];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  116,
                  111,
                  99,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          docs: ["const accounts"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "processPurchase";
      discriminator: [38, 233, 48, 62, 162, 120, 177, 244];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "seller";
          docs: ["seller"];
          writable: true;
        },
        {
          name: "sellerPda";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "protocolFee";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  116,
                  111,
                  99,
                  111,
                  108,
                  95,
                  102,
                  101,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "processPurchaseParams";
            };
          };
        }
      ];
    },
    {
      name: "registerSeller";
      discriminator: [9, 50, 144, 162, 206, 176, 154, 111];
      accounts: [
        {
          name: "sellerPda";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "seller";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "removeSellerLevel";
      discriminator: [55, 30, 62, 137, 157, 220, 204, 115];
      accounts: [
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's score list."];
          writable: true;
        },
        {
          name: "manager";
          docs: ["Manager account."];
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          docs: ["const accounts"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "removeSellerLevelParams";
            };
          };
        }
      ];
    },
    {
      name: "reviewPurchase";
      discriminator: [146, 40, 51, 26, 53, 21, 59, 157];
      accounts: [
        {
          name: "sellerPda";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "seller";
          writable: true;
        },
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
        },
        {
          name: "buyer";
          signer: true;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "reviewPurchaseParams";
            };
          };
        }
      ];
    },
    {
      name: "withdrawStake";
      discriminator: [153, 8, 22, 138, 105, 176, 87, 66];
      accounts: [
        {
          name: "sellerPda";
          docs: ["Seller PDA account"];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 108, 108, 101, 114];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "seller";
          writable: true;
          signer: true;
        },
        {
          name: "sellersLevelList";
          docs: ["Account storing the Seller's level list."];
        },
        {
          name: "systemProgram";
          docs: ["const accounts"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "withdrawStakeParams";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "contractState";
      discriminator: [190, 138, 10, 223, 189, 116, 222, 115];
    },
    {
      name: "escrow";
      discriminator: [31, 213, 123, 187, 186, 22, 218, 155];
    },
    {
      name: "protocolFee";
      discriminator: [121, 127, 98, 139, 72, 110, 44, 118];
    },
    {
      name: "seller";
      discriminator: [76, 163, 162, 59, 115, 49, 116, 39];
    },
    {
      name: "sellersLevelList";
      discriminator: [190, 230, 106, 158, 62, 95, 121, 177];
    }
  ];
  types: [
    {
      name: "addSellerLevelParams";
      docs: ["Parameters passed to the RemoveSeller instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "stepScore";
            type: "u64";
          },
          {
            name: "minStake";
            type: {
              option: "u64";
            };
          },
          {
            name: "maxProductCount";
            type: "u64";
          },
          {
            name: "maxProductPriceTotal";
            type: "u64";
          },
          {
            name: "protocolFeeBps";
            type: "u16";
          },
          {
            name: "affiliateFeeBps";
            type: "u16";
          },
          {
            name: "reviewFeeBps";
            type: "u16";
          },
          {
            name: "maxDaysToList";
            type: "u64";
          },
          {
            name: "maxDaysToAppeal";
            type: "u64";
          },
          {
            name: "payoutHoldDays";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "bumpSeeds";
      type: {
        kind: "struct";
        fields: [
          {
            name: "contractStateBump";
            type: "u8";
          },
          {
            name: "protocolFeeBump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "contractInitialized";
      type: {
        kind: "struct";
        fields: [
          {
            name: "manager";
            type: "pubkey";
          },
          {
            name: "protocolFee";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "contractState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bumpSeeds";
            docs: ["Common bump seeds required by instructions"];
            type: {
              defined: {
                name: "bumpSeeds";
              };
            };
          },
          {
            name: "manager";
            docs: ["Manager authority"];
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "depositStakeParams";
      docs: ["Parameters passed to the deposit stake instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amountLamports";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "escrow";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "unlockTime";
            type: "i64";
          },
          {
            name: "affiliate";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "affiliateFee";
            type: "u64";
          },
          {
            name: "reviewFee";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payoutClaimed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "payoutType";
            type: "string";
          },
          {
            name: "address";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "processPurchaseParams";
      docs: ["Parameters passed to the ProcessPurchase instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "productId";
            type: "u64";
          },
          {
            name: "priceLamports";
            type: "u64";
          },
          {
            name: "affiliate";
            type: {
              option: "pubkey";
            };
          }
        ];
      };
    },
    {
      name: "protocolFee";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalFee";
            docs: ["Total fee in the reserve"];
            type: "u64";
          }
        ];
      };
    },
    {
      name: "purchaseProcessed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "productId";
            type: "u64";
          },
          {
            name: "price";
            type: "u64";
          },
          {
            name: "protocolFee";
            type: "u64";
          },
          {
            name: "affiliateFee";
            type: "u64";
          },
          {
            name: "reviewFee";
            type: "u64";
          },
          {
            name: "sellerAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "removeSellerLevelParams";
      docs: ["Parameters passed to the RemoveSeller instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "levelIndex";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "reviewProcessed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "rating";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "reviewPurchaseParams";
      docs: ["Parameters passed to the RatePurchase instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "rating";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "seller";
      type: {
        kind: "struct";
        fields: [
          {
            name: "level";
            type: "u8";
          },
          {
            name: "totalStake";
            type: "u64";
          },
          {
            name: "salesAmount";
            type: "u64";
          },
          {
            name: "salesVolume";
            type: "u64";
          },
          {
            name: "rating";
            type: "u8";
          },
          {
            name: "totalReviews";
            type: "u64";
          },
          {
            name: "isBanned";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "sellerLevelAdded";
      type: {
        kind: "struct";
        fields: [
          {
            name: "sellerLevelList";
            type: "pubkey";
          },
          {
            name: "params";
            type: {
              defined: {
                name: "addSellerLevelParams";
              };
            };
          }
        ];
      };
    },
    {
      name: "sellerLevelInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "stepScore";
            type: "u64";
          },
          {
            name: "minStake";
            type: {
              option: "u64";
            };
          },
          {
            name: "maxProductCount";
            type: "u64";
          },
          {
            name: "maxProductPriceTotal";
            type: "u64";
          },
          {
            name: "protocolFeeBps";
            type: "u16";
          },
          {
            name: "affiliateFeeBps";
            type: "u16";
          },
          {
            name: "reviewFeeBps";
            type: "u16";
          },
          {
            name: "maxDaysToList";
            type: "u64";
          },
          {
            name: "maxDaysToAppeal";
            type: "u64";
          },
          {
            name: "payoutHoldDays";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "sellerLevelRemoved";
      type: {
        kind: "struct";
        fields: [
          {
            name: "sellerLevelList";
            type: "pubkey";
          },
          {
            name: "levelIndex";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "sellerLevelUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "level";
            type: "u8";
          },
          {
            name: "score";
            type: "u64";
          },
          {
            name: "baseLevel";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "sellerRegistered";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "level";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "sellersLevelList";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalLevels";
            docs: ["Count of sellers levels"];
            type: "u64";
          },
          {
            name: "sellersLevelList";
            docs: ["List of sellers levels info"];
            type: {
              vec: {
                defined: {
                  name: "sellerLevelInfo";
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "stakeDeposited";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "stakeWithdrawn";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "withdrawStakeParams";
      docs: ["Parameters passed to the deposit stake instruction."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amountLamports";
            type: "u64";
          }
        ];
      };
    }
  ];
};
