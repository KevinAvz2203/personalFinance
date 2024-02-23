export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/stadistics", "/goals", "/addGoal", "/addTransaction"],
};
