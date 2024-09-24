import { products } from "@/lib/blinksProducts";

export const GET = async (req: Request) => {
  //   const { searchParams } = new URL(req.url);
  //   const id = searchParams.get("id");

  const blinksProduct = products;

  if (blinksProduct) {
    return Response.json(blinksProduct[0]);
  }

  //   for (let elem of blinksProduct) {
  //     if (id == elem.id) {
  //       return Response.json({
  //         elem,
  //       });
  //     }
  //   }

  return Response.json({
    icon: "https://res.cloudinary.com/daily-now/image/upload/s--xR-Y2Atm--/f_auto/v1727166502/posts/SZRjDMa5V",
    label: "Buy me a coffee",
    description: "Buy Top 100 VCs List",
    title: "Get Top 100 VCs list",
    amount: 0.01,
  });
};
