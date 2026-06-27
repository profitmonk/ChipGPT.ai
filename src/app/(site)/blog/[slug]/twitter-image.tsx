// Reuse the Open Graph card for the Twitter/X card too, so twitter:image is wired
// to the same generated "Silicon Bug Files" image. Route-segment config must be
// declared literally here (Next.js cannot statically parse a re-exported runtime),
// so only the render function is reused from opengraph-image.
import OGImage from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "ChipGPT — Silicon Bug Files";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;
