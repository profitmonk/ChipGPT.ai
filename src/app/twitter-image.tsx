// Reuse the homepage Open Graph card for the Twitter/X card. Route-segment config
// must be declared literally (Next.js cannot statically parse a re-exported
// runtime), so only the render function is reused.
import OGImage from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "ChipGPT — AI co-workers for the semiconductor lifecycle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;
