export function recalculateRating(rating: number): number {
    if (rating < 0) {
      return 0;
    }
    if (rating > 500) {
      return 500;
    }
    return rating;
  }