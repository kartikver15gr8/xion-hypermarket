"use client";

import React from "react";
import { jsPDF } from "jspdf";

const ProductList: React.FC<{
  products: { id: number; name: string; price: number }[];
}> = ({ products }) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Sendit Markets", 10, 10); // Adjust Y position for header

    // Title
    doc.setFontSize(14);
    doc.text("Affiliate and Commission", 10, 20);

    // Set font size for product details
    doc.setFontSize(12);

    // Add product details to PDF
    products.forEach((product, index) => {
      const text = `ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`;
      doc.text(text, 10, 30 + index * 10); // Adjust Y position for each product
    });

    // Footer
    // const pageCount = doc.internal.getNumberOfPages();
    // for (let i = 1; i <= pageCount; i++) {
    //   doc.setPage(i);
    //   doc.setFontSize(10);
    //   doc.text(
    //     "Your Brand Name - Page " + i,
    //     10,
    //     doc.internal.pageSize.height - 10
    //   ); // Adjust Y position for footer
    // }

    // Save the PDF
    doc.save("product-list.pdf");
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <button onClick={exportPDF}>Export PDF</button>
    </div>
  );
};

export default ProductList;
