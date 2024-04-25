export const validatingData = (data) => {
  if (data) {
    if (data.length >= 3) {
      return true;
    }
  } else {
    return false;
  }
};
