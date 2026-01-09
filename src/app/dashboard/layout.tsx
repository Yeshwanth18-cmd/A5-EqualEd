export const dynamic = 'force-dynamic';

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 container max-w-7xl mx-auto items-start">
                <aside className="hidden md:block w-64 shrink-0 border-r min-h-[calc(100vh-4rem)]">
                    <Sidebar />
                </aside>
                <main className="flex-1 w-full p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}


