'use client';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

import { SafeUser } from '../types';

interface KontoProps {
  currentUser?: SafeUser | null;
}

const Konto: React.FC<KontoProps> = ({ currentUser }) => {
  const safeCurrentUser = currentUser ?? null;

  console.log(currentUser)

  return (
    <Container>
      <PageHeader title={'Min konto'} subtitle={'Informasjon lagret om din konto'} />
      <div>Brukernavn: {safeCurrentUser !== null && safeCurrentUser.name}</div>
      <div>Epost: {safeCurrentUser !== null && safeCurrentUser.email}</div>
      <div>Id: {safeCurrentUser !== null && safeCurrentUser.id}</div>
      <div>Konto opprettet: {safeCurrentUser !== null && new Date(safeCurrentUser.createdAt).toLocaleDateString('en-GB')}</div>
      <div>Konto oppdatert: {safeCurrentUser !== null && new Date(safeCurrentUser.updatedAt).toLocaleDateString('en-GB')}</div>
    </Container>
  );
};
export default Konto;
