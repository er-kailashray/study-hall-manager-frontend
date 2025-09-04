// app/_components/SidebarContainer.tsx
'use client';

import { usePathname } from 'next/navigation';
// or: import { useSelectedLayoutSegments } from 'next/navigation';

const HIDE_ON = ['/', '/auth/login', '/landing'];

export default function SidebarContainer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hidden = HIDE_ON.some(p => pathname === p || pathname.startsWith(p + '/'));
    if (hidden) return null;
    return <>{children}</>;
}
