type SubsectionTitleProps = {
  children: React.ReactNode;
};

export default function SubsectionTitle({ children }: SubsectionTitleProps) {
  return <h3 className="subsection-title subsection-heading">{children}</h3>;
}
