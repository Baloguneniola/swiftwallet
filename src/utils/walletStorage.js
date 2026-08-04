export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem("swiftWalletCurrentUser")
  );
}


export function saveCurrentUser(user) {
  localStorage.setItem(
    "swiftWalletCurrentUser",
    JSON.stringify(user)
  );


  const users =
    JSON.parse(
      localStorage.getItem("swiftWalletUsers")
    ) || [];


  const updatedUsers = users.map((item) =>
    item.email === user.email
      ? user
      : item
  );


  localStorage.setItem(
    "swiftWalletUsers",
    JSON.stringify(updatedUsers)
  );
}


export function updateBalance(amount) {

  const user = getCurrentUser();

  if (!user) return;


  user.balance += amount;


  saveCurrentUser(user);


  return user;
}


export function addTransaction(transaction) {

  const user = getCurrentUser();

  if (!user) return;


  user.transactions = [
    ...(user.transactions || []),
    transaction,
  ];


  saveCurrentUser(user);


  return user;
}