'use client'
export default function BorrowBtn({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    // mt-6 h-16 mx-8 rounded-sm
    <div
      className={`${className} relative border flex justify-center items-center`}
    >
      <div className="absolute rounded inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/8ea6/e432/6e6564e66f68b7295f71eac4bf133b3b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAltG6ZOq3hR8Pyy0NQANZBJq~dDkETRFggK1v-eULrMH9xS9WHIk5AvwrWmree9H8A2bA3IhN2w-gjww8k2HWhVZc9Jivt3HulR3w~aIkVuUPFuXCTpeGhX7Ia3jyKXI2E8TRee8Wtuk5IitIo1053~DMxTMtD0OqMXJb2biowxTYrUGTrfEOvtQGXyro-jDBkFW0EAv-3go02lD5HLoKEjSUrbim-XwurnXupz9~r4m~IfOLPH1DwRcmMfzhpaV9QV03NfkMqUI2BodXgjTgeL3bsoFEBF1MH~2NNaiuNwdz5OCSLR4O-LIG7pZuZ2cxFPse0UHZE9H5mD4paHNg__')] bg-black bg-cover   mix-blend-multiply"></div>
      <div className="relative z-10 overflow-y-auto hide-scrollbar w-[100%] h-[100%]  ">
        <p className=" text-white w-[100%] h-[100%] justify-center items-center flex hover:scale-110 transition-all duration-300 ">
          {title}
        </p>
      </div>
    </div>
  );
}
