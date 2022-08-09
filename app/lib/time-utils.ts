import { differenceInHours, differenceInMinutes } from "date-fns";

export const timeDiff = (a: Date | number, b: Date | number) => {
  const hours = differenceInHours(a, b);
  const minutes = differenceInMinutes(a, b);

  return hours >= 1 ? hours : minutes;
};
