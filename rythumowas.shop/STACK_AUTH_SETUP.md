# Stack Auth Setup Guide

I have successfully replaced Clerk with Stack Auth in the codebase.

## 1. Get Your Stack Auth Keys
1.  Go to [Stack Auth](https://stack-auth.com/) and sign up/login.
2.  Create a new project.
3.  Go to the **API Keys** section.
4.  Copy the following keys:
    *   `Project ID`
    *   `Publishable Client Key`
    *   `Secret Server Key`

## 2. Update Environment Variables
Open `.env` file in `rythumowas.shop` and replace the placeholders with your actual keys:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
STACK_SECRET_SERVER_KEY=your_secret_key
```

## 3. Database Schema (Optional)
The `prisma/schema.prisma` file still contains `clerkId`. You might want to rename it to `authId` or `stackId` in the future.
Run `pnpm prisma db push` if you make changes.

## 4. Run the App
```bash
pnpm dev
```

## 5. Verify
*   Visit `http://localhost:3000`.
*   You should see "Sign In" button (or User Button if logged in).
*   Clicking "Sign In" should take you to the Stack Auth hosted sign-in page (or handler).
