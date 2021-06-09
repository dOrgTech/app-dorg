export const truncate = (s: string, length = 5) => {
  return s.substr(0, length) + "..." + s.substr(s.length - length, s.length);
};
