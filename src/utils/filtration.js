export const filtration = ({ firstName, lastName, phone }, filter) => {
  if (filter.match(/\d/)) {
    return phone.replace(/\D+/g, "").includes(filter.replace(/\D+/g, ""));
  }

  const [first, second] = filter.split(" ");
  if (second && second.length > 0) {
    return (
      (firstName.toLowerCase().includes(first) &&
        lastName.toLowerCase().includes(second)) ||
      (lastName.toLowerCase().includes(first) &&
        firstName.toLowerCase().includes(second))
    );
  }
  return (
    firstName.toLowerCase().includes(first) ||
    lastName.toLowerCase().includes(first) ||
    phone.includes(first)
  );
};
