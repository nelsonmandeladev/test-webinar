"use client"

import { buildPathNAme } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

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

export function Navigation() {

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    return (
        <div className="py-6 flex flex-col gap-5 bg-slate-100 px-2.5">
            {NAV_LINKS.map(nav_link => (
                <Link
                    key={nav_link.label}
                    href={buildPathNAme(currentLocale, nav_link.link)}
                    className='text-lg font-medium'
                >
                    {nav_link.label}
                </Link>
            ))}
        </div>
    )
}
