import "styles/tailwind.css"
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";
import { AuthButtons } from "@/components/AuthButtons";
import { Suspense } from "react";
import { RoleProvider } from "@/components/RoleProvider";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { NavLinks } from "@/components/NavLinks";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>
        <html lang="en">
          <body>
            <Suspense fallback={null}>
              <RoleProvider>
                <header className="bg-white border-b">
                  <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <a href="/" className="text-xl font-bold text-green-800">
                      Rythu Mowa
                    </a>
                    <div className="flex items-center gap-4">
                      <Suspense fallback={null}>
                        <NavLinks />
                      </Suspense>
                      <Suspense fallback={null}>
                        <RoleSwitcher />
                      </Suspense>
                      <Suspense fallback={null}>
                        <AuthButtons />
                      </Suspense>
                    </div>
                  </div>
                </header>
                {children}
              </RoleProvider>
            </Suspense>
          </body>
        </html>
      </StackTheme>
    </StackProvider>
  )
}
