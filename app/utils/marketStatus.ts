import { isAfter, isBefore } from 'date-fns';

// Check if market is open
export function getMarketStatusMessage() {
  const startOfDay = new Date();
  startOfDay.setHours(9, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(16, 30, 0, 0);

  if (isAfter(new Date(), endOfDay) || isBefore(new Date(), startOfDay)) {
    return {
      closed: true,
      content: 'Oslo børs er stengt.',
      subContent: 'Aksjehandel er for øyeblikket ikke tilgjengelig.',
    };
  }

  return {
    closed: false,
  };
}
