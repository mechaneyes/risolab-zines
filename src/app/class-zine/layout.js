import Head from 'next/head';
import "@app/styles.scss";

export const metadata = {
  title: "RisoLAB - Summer 2024",
  description: "Projects created for RisoLAB Summer 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script src="https://unpkg.com/p5.js-svg@1.3.1"></script>
      </Head>
      <body className="risolab">{children}</body>
    </html>
  );
}
