export const setColor = (rating: number) => {
    if (rating >= 250) {
      return "custom-color-100";
    }
    if (rating >= 200) {
      return "custom-color-90";
    }
    if (rating >= 150) {
      return "custom-color-80";
    }
    if (rating >= 100) {
      return "custom-color-70";
    }
    if (rating >= 75) {
      return "custom-color-60";
    }
    if (rating >= 50) {
      return "custom-color-50";
    }
    if (rating >= 25) {
      return "custom-color-40";
    }
    if (rating <= 24) {
      return "custom-color-30";
    }
  };