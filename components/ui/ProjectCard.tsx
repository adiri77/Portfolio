type ProjectCardProps = {
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
};

export default function ProjectCard({ title, subtitle, children }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{title}</h3>
        {subtitle ? <p className="project-tech">{subtitle}</p> : null}
      </div>
      <div className="project-body">{children}</div>
    </div>
  );
}
