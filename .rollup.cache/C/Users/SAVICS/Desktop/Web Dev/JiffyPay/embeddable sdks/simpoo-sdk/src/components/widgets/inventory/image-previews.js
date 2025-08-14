import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from "../../atoms/container";
import placeholderImage from "../../../assets/images/placeholder-image.svg";
function ImagePreviews({ images }) {
    return (_jsxs(Container, { className: "p-5 flex flex-col gap-2.5", children: [_jsx("div", { className: "relative flex-grow", children: _jsx("img", { src: images?.[0] ?? placeholderImage, sizes: "100%", alt: "item image", draggable: false, className: "rounded-xl object-cover w-full h-full" }) }), _jsx("div", { className: "flex gap-4 overflow-auto", children: images
                    .filter((_, index) => index !== 0)
                    .map((image, index) => (_jsx("div", { className: "w-[89px] h-[79px] relative shrink-0", children: _jsx("img", { src: image ?? placeholderImage, alt: "item image", draggable: false, className: "rounded-xl object-cover h-full w-full" }) }, index))) })] }));
}
export default ImagePreviews;
//# sourceMappingURL=image-previews.js.map