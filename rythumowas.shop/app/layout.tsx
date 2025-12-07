import "styles/tailwind.css"
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";
import { AuthButtons } from "@/components/AuthButtons";
import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>
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
                  <Suspense fallback={null}>
                    <AuthButtons />
                  </Suspense>
                </div>
              </div>
            </header>
            {children}
          </body>
        </html>
      </StackTheme>
    </StackProvider>
  )
}
