// Reuse the /rle Open Graph card for the Twitter/X card (route-segment config
// must be declared literally, so only the render function is reused).
import OGImage from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "ChipGPT Engineering RLE — executable evaluation for silicon-engineering agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;
