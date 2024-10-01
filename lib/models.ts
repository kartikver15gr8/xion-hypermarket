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

export interface ReviewInterface {
  Comment: string;
  CreatedAt: string;
  ID: number;
  Product: {
    Category: {
      Description: string;
      ID: number;
      Name: string;
      ThumbnailUrl: string;
    };
    CategoryID: number;
    ComparePrice: string;
    Description: string;
    Filename: string;
    id: number;
    Name: string;
    Price: string;
    ThumbnailUrl: string;
    UserID: number;
  };
  ProductID: number;
  Rating: number;
  TransactionHash: string;
  UpdatedAt: string;
  User: {
    CreatedAt: string;
    ID: number;
    SellerRegTxHash: string;
    UpdatedAt: string;
    WalletAddress: string;
  };
  userID: number;
}

export interface ProductInterface {
  ID: number;
  Name: string;
  Description: string;
  Filename: string;
  Price: string;
  ComparePrice: string;
  UserID: number;
  CategoryID: number;
  Category: {
    ID: number;
    Name: string;
    Description: string;
    ThumbnailUrl: string;
  };
  ThumbnailUrl: string;
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
