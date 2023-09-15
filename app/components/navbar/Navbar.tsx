import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log('currentUser', currentUser);
  return (
    <div className="fixed w-full z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
