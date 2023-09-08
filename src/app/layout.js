import "./globals.css";
import { Roboto } from "next/font/google";
import Icon from "../../public/assets/Images/Ripeseed.jpeg";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Ripeseed | Chat",
  description: "Created by Ripeseed.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
