import getCurrentUser from '@/app/actions/getCurrentUser';

import Konto from './Konto';

const KontoPage = async () => {
  const currentUser = await getCurrentUser();

  return <Konto currentUser={currentUser} />;
};

export default KontoPage;
