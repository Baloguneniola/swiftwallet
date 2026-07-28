export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("swiftWalletUsers")) || [];

  users.push(user);

  localStorage.setItem(
    "swiftWalletUsers",
    JSON.stringify(users)
  );
}


export function getUsers() {
  return JSON.parse(
    localStorage.getItem("swiftWalletUsers")
  ) || [];
}


export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem("swiftWalletCurrentUser")
  );
}


export function setCurrentUser(user) {
  localStorage.setItem(
    "swiftWalletCurrentUser",
    JSON.stringify(user)
  );
}


export function updateUser(updatedUser) {

  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === updatedUser.email
      ? updatedUser
      : user
  );

  localStorage.setItem(
    "swiftWalletUsers",
    JSON.stringify(updatedUsers)
  );

  localStorage.setItem(
    "swiftWalletCurrentUser",
    JSON.stringify(updatedUser)
  );
}