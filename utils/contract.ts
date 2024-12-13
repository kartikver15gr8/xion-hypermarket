// types/contract.ts
export type Uint128 = string;

export interface SellerLevelInfo {
  affiliate_fee_bps: number;
  max_days_to_appeal: number;
  max_days_to_list: number;
  max_product_count: number;
  max_product_price_total: number;
  payout_hold_days: number;
  protocol_fee_bps: number;
  review_fee_bps: number;
  step_score: number;
  min_stake?: Uint128 | null;
}

export interface InstantiateMsg {
  owner?: string | null;
  protocol_fee_address: string;
}

export type ExecuteMsg =
  | { add_seller_level: { seller_level_info: SellerLevelInfo } }
  | {
      update_seller_level: {
        level_index: number;
        seller_level_info: SellerLevelInfo;
      };
    }
  | { register_seller: {} }
  | {
      stake: {
        amount: Uint128;
        seller_address: string;
      };
    }
  | {
      unstake: {
        amount: Uint128;
        seller_address: string;
      };
    }
  | {
      purchase: {
        affiliate_address: string;
        amount: Uint128;
        product_id: string;
        seller_address: string;
      };
    }
  | {
      review: {
        product_id: string;
        rating: number;
        seller_address: string;
      };
    };

export type QueryMsg =
  | { get_contract_state: {} }
  | { get_seller_level_list: {} }
  | {
      get_seller_level: {
        level_index: number;
      };
    }
  | {
      get_seller_info: {
        seller_address: string;
      };
    }
  | {
      get_seller_stake: {
        seller_address: string;
        staker_address: string;
      };
    };

export interface GetSellerInfoResponse {
  seller_info: {
    is_banned: boolean;
    level: number;
    own_stake: Uint128;
    rating: number;
    received_stake: Uint128;
    sales_amount: Uint128;
    sales_volume: Uint128;
    total_reviews: number;
  };
}

export const treasuryConfig = {
  treasury: "xion1z7yl7e7grg7lwzazky6hwhxc38vkn8k38cp964zs29x07hvvslfqlwn0mf",
};
