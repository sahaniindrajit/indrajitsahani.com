import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: full-bleed square (iOS applies its own rounded mask).
export default function AppleIcon() {
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
					fontSize: 110,
					fontWeight: 800,
					letterSpacing: -6,
				}}
			>
				is
			</div>
		),
		{ ...size }
	);
}
