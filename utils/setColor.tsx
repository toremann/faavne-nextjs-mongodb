export const setColor = (rating: number) => {
  if (rating >= 450) {
    return "custom-color-500";
  }
  if (rating >= 400) {
    return "custom-color-400";
  }
  if (rating >= 350) {
    return "custom-color-300";
  }
  if (rating >= 300) {
    return "custom-color-200";
  }
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
    if (rating >= 0) {
      return "custom-color-30";
    }
  };