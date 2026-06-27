import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Indrajit Sahani - Full-Stack Developer";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					backgroundColor: "#111010",
					padding: "80px",
				}}
			>
				<div
					style={{
						fontSize: 80,
						fontWeight: 700,
						color: "#ffffff",
						letterSpacing: "-0.04em",
					}}
				>
					Indrajit Sahani
				</div>
				<div
					style={{
						fontSize: 40,
						color: "#a3a3a3",
						marginTop: 16,
					}}
				>
					Full-Stack Developer
				</div>
				<div
					style={{
						fontSize: 28,
						color: "#737373",
						marginTop: 40,
					}}
				>
					Building Sendkit at Enrich Labs · React · Next.js · Node.js · Go
				</div>
			</div>
		),
		{
			...size,
		}
	);
}
