"use client";

import Image from "next/image"
import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, UserCog, LogOut } from "lucide-react"
import { AccessibilitySettings } from "@/components/features/accessibility-settings"
import { Logo } from "@/components/ui/logo"
import { useSession, signOut } from "next-auth/react"

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <Logo />
                    </div>
                </Link>

                {/* Logo Marquee */}
                <div className="flex-1 overflow-hidden ml-8 mr-4 hidden md:block mask-image-gradient">
                    <div className="flex animate-marquee whitespace-nowrap items-center hover:pause-animation">
                        <div className="flex items-center gap-16 mx-4 shrink-0">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={`p1-${i}`} className="relative h-12 w-auto shrink-0 transition-all duration-300">
                                    <Image
                                        src={`/partners/partner-${i}.${i === 5 ? 'png' : 'jpg'}`}
                                        alt={`Partner ${i}`}
                                        height={48}
                                        width={120}
                                        className="h-full w-auto object-contain"
                                        priority={i <= 2}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate for seamless scrolling */}
                        <div className="flex items-center gap-16 mx-4 shrink-0">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={`p2-${i}`} className="relative h-12 w-auto shrink-0 transition-all duration-300">
                                    <Image
                                        src={`/partners/partner-${i}.${i === 5 ? 'png' : 'jpg'}`}
                                        alt={`Partner ${i}`}
                                        height={48}
                                        width={120}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AccessibilitySettings />
                    <Link href="/dashboard">
                        <Button variant="ghost">Dashboard</Button>
                    </Link>

                    {session ? (
                        <div className="flex items-center gap-2">
                            {session.user?.role === 'teacher' && (
                                <Link href="/teacher">
                                    <Button variant="outline" size="sm" className="gap-2 border-indigo-200 bg-indigo-50 text-indigo-700">
                                        <UserCog className="h-4 w-4" /> Teacher Portal
                                    </Button>
                                </Link>
                            )}
                            <Button variant="default" size="sm" onClick={() => signOut()} className="gap-2">
                                <LogOut className="h-4 w-4" /> Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="gap-2">
                                <UserCog className="h-4 w-4" /> Teacher Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
