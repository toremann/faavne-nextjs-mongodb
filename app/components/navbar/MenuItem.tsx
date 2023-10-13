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
        dark:hover:bg-slate-400
        transition
        font-semibold
        dark:text-white
        dark:bg-black
      "
    >
      {label}
    </div>
  );
};

export default MenuItem;
