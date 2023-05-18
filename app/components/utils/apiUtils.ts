export function pickRandomItems(arr: any[], quantity: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, quantity);
}
