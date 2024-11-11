import Sidebar from "@/components/Sidebar"

// import "../globals.css"
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return ( 
        <html lang="en">
        <body>
            <main className="">
              <Sidebar /> {children}
            </main>
        </body>
        </html>
    )
}
