'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import LoginModal from '../modals/LoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const safeCurrentUser = currentUser ?? null;

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col py-3 px-4 rounded-full transition">
          <div className="hidden md:block text-sm font-semibold text-black dark:text-white">Norske utbytte aksjer!</div>
          <div className="hidden md:block text-sm font-light dark:text-white">{safeCurrentUser !== null && `Hei, ${safeCurrentUser.name} 🙋‍♂️`}</div>
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md: px-2 border-[1px] border-neutral-200 dark:text-white flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white dark:bg-black dark:border dark:border-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push('/portfolio')} label="Portfolio" />
                <MenuItem onClick={() => router.push('/favorites')} label="Favoritter" />
                <MenuItem onClick={() => router.push('/konto')} label="Min konto" />
                <hr />
                <MenuItem onClick={() => signOut({ callbackUrl: '/' })} label="Logg ut" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Logg inn" />
                <MenuItem onClick={registerModal.onOpen} label="Lag en konto" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
