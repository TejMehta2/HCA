import { ConsultantFinderContextProvider } from '@component-library/context/consultantFinderContext';

export default function FinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsultantFinderContextProvider>
      {children}
    </ConsultantFinderContextProvider>
  );
}
