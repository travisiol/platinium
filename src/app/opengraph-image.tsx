import { ImageResponse } from "next/og";

export const alt = "PLATINIUM — Trade Memes. Stack Platinum.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05070A",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(148,161,172,0.28), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 180,
            height: 110,
            borderRadius: 10,
            background:
              "linear-gradient(180deg, #F5F7F9 0%, #B8C2CC 45%, #6B7680 100%)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 96,
            color: "#EEF1F3",
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          PLATINIUM
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 30,
            letterSpacing: 6,
            color: "#B8C2CC",
            fontWeight: 600,
          }}
        >
          TRADE MEMES. STACK PLATINUM.
        </div>
      </div>
    ),
    { ...size },
  );
}
