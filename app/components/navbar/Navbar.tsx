import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

  const safeCurrentUser = currentUser ?? null;

  return (
    <div className="fixed w-full z-10 shadow-sm bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu currentUser={safeCurrentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
