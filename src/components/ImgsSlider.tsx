type ImgProps = {
  src: string;
  alt: string;
};

export function ImgSlider({ src, alt }: ImgProps) {
  return (
    <div className="w-[1100px] m-auto h-[50vh]">
      <img
        className="w-[100vw] h-full object-contain text-center"
        src={src}
        alt={alt}
      />
    </div>
  );
}
