export function randomItemId() {
  const items = ["Coils"]; //, "Rods", "Example"
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

