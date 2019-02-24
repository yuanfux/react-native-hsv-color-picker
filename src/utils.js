const normalizeValue = (value) => {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

export default normalizeValue;
