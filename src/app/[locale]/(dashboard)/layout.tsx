import { Navigation } from '@/components/common/navigation';
import React from 'react'

interface DashboardLayoutProps {
    children: React.ReactNode
}
export default function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props;
    return (
        <div className='container h-screen w-full'>
            <div className="grid grid-cols-1 lg:grid-cols-[8%_1fr]">
                <Navigation />
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
