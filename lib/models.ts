export interface AffiliateLink {
  product_id: number;
  url: string;
  user_id: number;
}

export interface CategoryInterface {
  ID: number;
  Name: string;
  Description: string;
  Thumbnail: string;
}

export interface ProductInterface {
  ID: number;
  Name: string;
  Description: string;
  Filename: string;
  Price: string;
  UserID: number;
  CategoryID: number;
  Category: {
    ID: number;
    Name: string;
    Description: string;
    Thumbnail: string;
  };
  thumbnail: string;
}

export interface Purchase {
  affiliate_link_id: number;
  amount: number;
  product_id: number;
  status: string;
  transaction_hash: string;
  user_id: number;
}

export interface Review {
  comment: string;
  purchase_id: number;
  rating: number;
}

export interface ShowcaseImage {
  filename: string;
  product_id: number;
}

export interface User {
  id: number;
  wallet_address: string;
}

export interface UsersResponse {
  id: number;
  wallet_address: string;
}
