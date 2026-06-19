export const routeProtectionStrategy = {
  publicRoutes: [
    "/",
    "/login",
    "/verify-otp",
    "/review/:token",
  ],

  protectedRoutes: [
    "/home",
    "/challenges/create",
    "/challenges/:id",
    "/profile",
  ],

  authenticationFlow: [
    "User enters phone number",
    "OTP verification",
    "Receive JWT token",
    "Store authentication state",
    "Allow access to protected routes",
  ],

  unauthenticatedBehavior:
    "Redirect user to /login",

  futureImplementation: [
    "ProtectedRoute component",
    "JWT persistence",
    "Route guards",
  ],
};