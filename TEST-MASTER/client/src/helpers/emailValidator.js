export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
}
