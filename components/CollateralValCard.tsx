"use client";
export default function CollateralValCard({
  heading,
  value,
}: {
  heading: string;
  value: string;
}) {
  return (
    <div className="flex shadow-inner shadow-[#CCCBCA] bg-[#faf9f9] rounded-md flex-col p-3 border-[#CCCBCA] hover:bg-[#e4e4e2] hover:border hover:rounded-md transition-all duration-300 my-1 lg:my-0">
      <p className="">{heading}</p>
      <p className="text-xl font-medium text-[#4E6465] mt-1">{value}</p>
    </div>
  );
}
