export const validateRating = (arr: number[]): boolean => {
  if (arr.length < 2) {
    return false;
  } else {
    const lastTwo = arr.slice(-2);
    return true;
  }
};
