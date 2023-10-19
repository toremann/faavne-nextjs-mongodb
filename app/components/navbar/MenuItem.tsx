'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        dark:hover:bg-gray-800/50
        transition
        font-semibold
        dark:text-white
        dark:border
        dark:border-gray-600
      "
    >
      {label}
    </div>
  );
};

export default MenuItem;
