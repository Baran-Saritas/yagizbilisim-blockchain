export function passwordValidator(password) {
  if (password.length < 5)
    return "Password must be at least 5 characters long.";
  return "";
}
export function passwordControlValidator(password, passworControl) {
  if (password != passworControl)
    return "Passwords you entered are not matching.";
  return "";
}
