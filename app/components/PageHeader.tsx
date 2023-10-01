'use client';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  stockCount?: number
  lastUpdate?: Date
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, stockCount, lastUpdate }) => {
  return (
    <div className="text-start">
      <div className="text:text-sm md:text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};
export default PageHeader;
