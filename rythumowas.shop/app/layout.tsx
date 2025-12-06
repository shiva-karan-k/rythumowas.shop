import "styles/tailwind.css"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
