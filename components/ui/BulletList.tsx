type BulletListProps = {
  items: string[];
  className?: string;
};

export default function BulletList({ items, className = "content-list" }: BulletListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
