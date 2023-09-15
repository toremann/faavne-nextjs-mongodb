'use client';

import { SafeUser } from '@/app/types';

import { useRouter } from 'next/navigation';

interface ListingCardProps {
  data: any;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/stock/${data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">{data.id}</div>
    </div>
  );
};
export default ListingCard;
