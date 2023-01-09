export const checkRating = (rating: number) => {
    if (rating > 0) {
      return <i className="bi bi-arrow-up-circle" />;
    } else if (rating == 0) {
      return 
    } else {
      return <i className="bi bi-arrow-down-circle" />;
    }
  };