import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: a rounded-square monogram "is" (Indrajit Sahani) in white on a
// dark gradient, matching the site's minimalist look.
export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "linear-gradient(135deg, #2a2a2a 0%, #050505 100%)",
					color: "#ffffff",
					fontSize: 44,
					fontWeight: 800,
					letterSpacing: -3,
					borderRadius: 14,
				}}
			>
				is
			</div>
		),
		{ ...size }
	);
}
