import { ImageResponse } from "next/og";

export const alt = "LeoLogic — Leo Rao";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 96px",
          background: "#050507",
          backgroundImage:
            "radial-gradient(ellipse 80% 70% at 15% 55%, rgba(0,60,20,0.55) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 60% at 85% 15%, rgba(0,20,10,0.4) 0%, transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          LEOLOGIC.ORG
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#00ff41",
            letterSpacing: -3,
            marginBottom: 24,
            display: "flex",
          }}
        >
          Leo Rao
        </div>
        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: -0.5,
            display: "flex",
          }}
        >
          AI Systems Engineer · Process Engineer
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.32)",
            marginTop: 20,
            display: "flex",
          }}
        >
          Precision systems at the intersection of chemical engineering and AI.
        </div>
      </div>
    ),
    { ...size }
  );
}
