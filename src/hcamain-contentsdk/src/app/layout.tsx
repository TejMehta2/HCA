import './globals.css';
import '@component-library/globals/index.scss';
import Themes from '@component-library/foundation/Themes/Themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mdu7dnk.css" />
      </head>
      <body>
        <Themes theme={'A-HCA-White'}>{children}</Themes>
      </body>
    </html>
  );
}
