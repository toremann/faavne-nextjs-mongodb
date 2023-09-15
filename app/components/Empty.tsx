'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';

interface EmptyProps {
  title?: string;
  subtitle?: string;
}

export const Empty: React.FC<EmptyProps> = ({ title = 'Errr...', subtitle = 'Wheres my god damn stocks?' }) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};
