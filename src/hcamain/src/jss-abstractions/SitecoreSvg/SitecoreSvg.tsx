interface SitecoreSvgProps {
  children?: string;
}

const SitecoreSvg = (props: SitecoreSvgProps) => {
  const { children } = props;
  if (!children) return <></>;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
};

export default SitecoreSvg;
