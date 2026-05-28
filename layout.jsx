import "./globals.css";

export const metadata = {
  title: "第三屆縣市串連散步節—台北場：還路於民大富翁",
  description: "Vision Zero Taiwan traffic card draw game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
