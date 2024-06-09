import Head from 'next/head';
import "@app/styles.scss";

export const metadata = {
  title: "RisoLAB v Mechaneyes",
  description: "Projects created for RisoLAB Summer 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body className="risolab">{children}</body>
    </html>
  );
}
