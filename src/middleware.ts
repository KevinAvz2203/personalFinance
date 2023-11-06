export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/data", "/goals", "/addGoal", "/addTransaction"],
};
