"use client";

import React from "react";
import { jsPDF } from "jspdf";

export const ProductList = ({
  products,
  imageBase64,
}: {
  products: { id: number; name: string; price: number }[];
  imageBase64: string;
}) => {
  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 15;
    const imgHeight = 15;
    doc.addImage(imageBase64, "PNG", 10, 10, imgWidth, imgHeight);

    const textX = imgWidth + 12;

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("SENDIT", textX, 16);
    doc.setFontSize(18);
    doc.text("MARKETPLACE", textX, 25);

    doc.setFontSize(16);
    doc.text("Transactions Summary", 10, 45);

    doc.setFontSize(12);

    products.forEach((product, index) => {
      const text = `ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`;
      doc.text(text, 10, imgHeight + 40 + index * 5);
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

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
