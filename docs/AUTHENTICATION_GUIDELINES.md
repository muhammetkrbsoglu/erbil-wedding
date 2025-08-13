# AUTHENTICATION_GUIDELINES.md

## 1. Philosophy: Managed Service First

For this project, we will not build an authentication system from scratch. We will use **Clerk** as our primary authentication provider. This strategy significantly reduces development time, enhances security, and provides a rich feature set (social logins, password resets, multi-factor authentication) out of the box.

## 2. Core Implementation Strategy

The authentication flow will be managed primarily by Clerk's official Next.js SDK on the frontend (`@clerk/nextjs`). The NestJS backend will act as a resource server, validating the JWTs issued by Clerk to protect its endpoints.

## 3. Step-by-Step Implementation Plan

### 3.1. Initial Setup and Environment Variables

1.  Create a new application in your Clerk Dashboard.
2.  Add the required environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, etc.) to the `.env` files in both the `web` and `api` applications. Do not commit these keys to version control.

### 3.2. Frontend Integration (Next.js - `web` app)

1.  **Wrap the Root Layout:** The entire application must be wrapped in the `<ClerkProvider>` component in the root `layout.tsx` to provide authentication context.
2.  **Create Authentication Pages:** Clerk provides pre-built components for sign-in, sign-up, and user profiles. Create the following routes under `(auth)` group in the `app` directory:
    * `app/(auth)/sign-in/[[...sign-in]]/page.tsx` using `<SignIn />` component.
    * `app/(auth)/sign-up/[[...sign-up]]/page.tsx` using `<SignUp />` component.
3.  **Implement Middleware:** Create a `middleware.ts` file in the root of the `web` app. Use the `clerkMiddleware` helper to protect routes. The admin panel (`/admin/**`) must be a protected route. Public pages (home, salon details) should be public routes.

### 3.3. Backend API Protection (NestJS - `api` app)

1.  **JWT Verification:** The NestJS API will not manage user sessions. It will be a stateless API that validates a JWT on every request to a protected endpoint.
2.  **Create a Custom `AuthGuard`:**
    * Develop a `ClerkAuthGuard` that implements NestJS's `CanActivate` interface.
    * This guard will extract the JWT from the `Authorization: Bearer <token>` header of incoming requests.
    * It will use Clerk's Node.js SDK (`@clerk/clerk-sdk-node`) to verify the token against Clerk's JWKS (JSON Web Key Set).
    * If the token is valid, it will attach the authenticated user's payload (e.g., `userId`, `role`) to the request object for use in controllers. If invalid, it will throw an `UnauthorizedException`.
3.  **Apply the Guard:** Apply this `ClerkAuthGuard` globally or on a per-controller/per-route basis for all endpoints that require admin authentication.

### 3.4. Accessing User Data

* **Frontend:** Use hooks provided by `@clerk/nextjs` like `useUser()` and `useAuth()` to access user information and authentication state in Client Components.
* **Backend:** In protected controllers, access the user data attached to the request object by the `ClerkAuthGuard`.