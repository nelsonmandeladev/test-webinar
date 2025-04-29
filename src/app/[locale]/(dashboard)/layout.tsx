import Link from 'next/link';
import React from 'react'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const NAV_LINKS = [
    {
        label: "Home",
        link: "/"
    },
    {
        label: "Trainers",
        link: "/trainers"
    },
]
export default function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props;
    return (
        <div className='container h-screen w-full'>
            <div className="grid grid-cols-1 lg:grid-cols-[8%_1fr]">
                <div className="py-6 flex flex-col gap-5 bg-slate-100 px-2.5">
                    {NAV_LINKS.map(nav_link => (
                        <Link
                            key={nav_link.label}
                            href={nav_link.link}
                            className='text-lg font-medium'
                        >
                            {nav_link.label}
                        </Link>
                    ))}
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
