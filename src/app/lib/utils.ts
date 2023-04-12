export function mapBetween(
  currentNum: number,
  minAllowed: number,
  maxAllowed: number,
  min: number,
  max: number
) {
  return (
    ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
  );
}

export function percentageBetween(value: number, min: number, max: number) {
  return mapBetween(value, 0, 100, min, max);
}
