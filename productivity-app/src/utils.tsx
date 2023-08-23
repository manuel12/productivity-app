export const setItem = (key: string, data: {}) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);

  if (item == null) {
    return null;
  }
  return JSON.parse(item);
};
