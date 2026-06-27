export type Orientation = "horizontal" | "vertical";

export function getNextIndex(
  currentIndex: number,
  itemCount: number,
  key: string,
  orientation: Orientation = "horizontal",
  loop = true
): number {
  const previousKeys = orientation === "horizontal" ? ["ArrowLeft"] : ["ArrowUp"];
  const nextKeys = orientation === "horizontal" ? ["ArrowRight"] : ["ArrowDown"];

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return itemCount - 1;
  }

  if (previousKeys.includes(key)) {
    return currentIndex === 0 ? (loop ? itemCount - 1 : 0) : currentIndex - 1;
  }

  if (nextKeys.includes(key)) {
    return currentIndex === itemCount - 1 ? (loop ? 0 : itemCount - 1) : currentIndex + 1;
  }

  return currentIndex;
}
