import React from "react";
import Container from "../../atoms/container";
import placeholderImage from "../../../assets/images/placeholder-image.svg";

function ImagePreviews({ images }: { images: string[] }) {
  return (
    <Container className="p-5 flex flex-col gap-2.5">
      <div className="relative flex-grow">
        <img
          src={images[0] ?? placeholderImage}
          sizes="100%"
          alt={"item image"}
          draggable={false}
          className="rounded-xl object-cover w-full h-full"
        />
      </div>
      <div className="flex gap-4 overflow-auto">
        {images
          .filter((_, index) => index !== 0)
          .map((image, index) => (
            <div key={index} className="w-[89px] h-[79px] relative shrink-0">
              <img
                src={image ?? placeholderImage}
                alt={"item image"}
                draggable={false}
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          ))}
      </div>
    </Container>
  );
}

export default ImagePreviews;
