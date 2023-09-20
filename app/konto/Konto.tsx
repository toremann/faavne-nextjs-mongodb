'use client';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

import { SafeUser } from '../types';

interface KontoProps {
  currentUser?: SafeUser | null;
}

const Konto: React.FC<KontoProps> = ({ currentUser }) => {
  const safeCurrentUser = currentUser ?? null;

  return (
    <Container>
      <PageHeader title={'Min konto'} subtitle={'Informasjon lagret om din konto'} />
      <div>Brukernavn: {safeCurrentUser !== null && safeCurrentUser.name}</div>
      <div>Epost: {safeCurrentUser !== null && safeCurrentUser.email}</div>
    </Container>
  );
};
export default Konto;
