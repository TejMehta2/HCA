//This version works with a single <script> tag, if we expect multiple scripts in the field value then this components needs to be refactored.
import Script from 'next/script';

type Props = {
  html: string; // CMS value, e.g. "<script>console.log('x')</script>"
  id: string;
};

export function CmsScript({ html, id }: Props) {
  const scriptContent = html
    .replace(/^<script[^>]*>/i, '')
    .replace(/<\/script>$/i, '');

  return (
    <Script
      id={id}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}