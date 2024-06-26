export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/checkout", "/golden-admin/:path*"],
};
