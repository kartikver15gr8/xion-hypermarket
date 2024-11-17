export interface AffiliateLink {
  id: number;
  product_id: number;
  user_id: number;
}

export interface CategoryInterface {
  ID: string | number;
  Name: string;
  Description: string;
  ThumbnailURL: string;
  Slug: string;
  Products: any;
}

export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  transaction_hash: string;
  product_id: number;
  Product: {
    id: number;
    name: string;
    description: string;
    filename: string;
    file_type: string;
    file_size: number;
    file_checksum: string;
    price: string;
    compare_price: string;
    user_id: number;
    category_id: number;
    category: {
      id: number;
      name: string;
      description: string;
      thumbnail_url: string;
    };
    thumbnail_url: string;
  };
  user_id: number;
  user: {
    id: number;
    wallet_address: null | string;
    created_at: string;
    updated_at: string;
    seller_reg_tx_hash: null | string;
  };
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  status: string;
  filename: string;
  file_type: string;
  file_size: number;
  file_checksum: string;
  price: string;
  compare_price: string;
  user_id: number;
  category_id: number;
  category: {
    id: number;
    name: string;
    description: string;
    thumbnail_url: string;
    created_at: string;
    updated_at: string;
  };
  thumbnail_url: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  seller_wallet_address: string;
}

export interface ProductInterfaceTwo {
  ID: string;
  Name: string;
  Description: string;
  status: string;
  Filename: string;
  FileType: string;
  FileSize: number | bigint;
  FileChecksum: string;
  Price: number;
  ComparePrice: number;
  SellerID: string;
  CategoryID: string;
  ThumbnailURL: string;
  ViewCount: number;
  CreatedAt: string;
  UpdatedAt: string;
  Slug: string;
  Seller: null;
  Category: {
    ID: string;
    Name: string;
    Description: string;
    ThumbnailURL: string;
    Slug: string;
    Products: null;
  };
  ProductAnalytics: null;
  Reviews: null;
  seller_wallet_address: string;
}

export interface PurchasesInterface {
  id: number;
  product_id: number;
  user_id: number;
  amount: number;
  status: string;
  affiliate_id: number;
  transaction_hash: string;
  created_at: string;
  updated_at: string;
  product_title: string;
  product_description: string;
  product_filename: string;
  product_file_size: string;
  product_file_type: string;
  product_file_checksum: string;
  product_thumbnail_url: string;
  product_category_name: string;
  seller_wallet_address: string;
  affiliate_wallet_address: string;
  buyer_wallet_address: string;
}

export interface Purchase {
  affiliate_id: number;
  amount: number;
  product_id: number;
  status: number;
  transaction_hash: string;
  user_id: number;
}

export interface Review {
  comment: string;
  product_id: number;
  rating: number;
  user_id: number;
}

export interface ShowcaseImage {
  filename: string;
  product_id: number;
}

export interface User {
  created_at: string;
  id: number;
  seller_reg_tx_hash: string;
  updated_at: string;
  wallet_address: string;
}

export interface UsersResponse {
  created_at: string;
  id: number;
  seller_reg_tx_hash: string;
  updated_at: string;
  wallet_address: string;
}

export interface SellerAnalytics {
  user_id: number;
  user: {
    id: number;
    wallet_address: string;
    created_at: string;
    updated_at: string;
    seller_reg_tx_hash: null | string;
  };
  view_count: number;
  sale_count: number;
  sale_amount: number;
  average_rating: number;
  review_count: number;
}

export interface ProductAnalytics {
  product_id: number;
  product: {
    id: number;
    name: string;
    description: string;
    status: string;
    filename: string;
    file_type: string;
    file_size: number;
    file_checksum: string;
    price: string;
    compare_price: string;
    user_id: number;
    category_id: number;
    category: {
      id: number;
      name: string;
      description: string;
      thumbnail_url: string;
      created_at: string;
      updated_at: string;
    };
    thumbnail_url: string;
    view_count: number;
    created_at: string;
    updated_at: string;
  };
  seller_wallet_address: string;
  views: number;
  sales: number;
  average_rating: number;
  review_count: number;
}

export interface AffiliateAnalytics {
  sale_amount: number;
  sale_count: number;
  user: {
    created_at: string;
    id: number;
    seller_reg_tx_hash: string;
    updated_at: string;
    wallet_address: string;
  };
  user_id: number;
}
