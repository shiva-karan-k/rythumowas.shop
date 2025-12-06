import "styles/tailwind.css"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Check if Clerk keys are configured
  const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  
  if (!hasClerkKeys) {
    console.warn('Clerk keys not configured - authentication disabled')
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <a href="/" className="text-xl font-bold text-green-800">
                Rythu Mowa
              </a>
              <div className="flex items-center gap-4">
                <a href="/shop" className="px-4 py-2 text-green-700 hover:text-green-800">
                  Shop
                </a>
                {hasClerkKeys ? (
                  <>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="px-4 py-2 text-green-700 hover:text-green-800">
                          Sign In
                        </button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </>
                ) : (
                  <a href="/farmer/register" className="px-4 py-2 text-green-700 hover:text-green-800">
                    Farmer Portal
                  </a>
                )}
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
