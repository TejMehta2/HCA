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
      <body>      
        <Themes theme={'A-HCA-White'}>{children}</Themes>
      </body>
    </html>
  );
}
