const getUniqueId = (): string => {
  return `id-${Math.random().toString(16).slice(2)}`;
};

export default getUniqueId;
