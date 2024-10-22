import ProductList from "@/components/ProductList";
import React from "react";

const products = [
  { id: 1, name: "Product A", price: 29.99 },
  { id: 2, name: "Product B", price: 39.99 },
  { id: 3, name: "Product C", price: 49.99 },
];

const ProductsPage: React.FC = () => {
  return (
    <div className="pt-16">
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
