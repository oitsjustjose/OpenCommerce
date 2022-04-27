export default (term, all) => {
  if (term.length) {
    return all.filter((x) => x.name.toLowerCase().includes(term.toLowerCase()));
  }
  return all;
};
