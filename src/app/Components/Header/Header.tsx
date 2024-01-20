'use client'

import { Avatar, Tooltip } from '@mui/material'
import Link from 'next/link'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

export function Header() {

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            
            if (!user) {
                router.push('/');
            } else {
                setUser(JSON.parse(user || '{}'));
            }
        }
    }, []);

    const handleSignOut = () => {
        router.push('/');
    }

    return (
        <header className="w-full flex flex-row justify-center pt-5 bg-light drop-shadow-xl">
            <div className="container px-5 h-[5rem] flex flex-row items-center justify-between">
                <Link href="/events">
                    <img src="/logo.svg" alt="Logo" width={190} height={60} />
                </Link>

                <nav className="flex flex-row justify-between items-center gap-6 text-black">
                    <h1 className='text-2xl'>Olá, {capitalizeFirstLetter(user?.name)}!</h1>
                    {/* <Link href="/abc">
                        abc
                    </Link>

                    <Link href="/xyz">
                        xyz
                    </Link> */}
                    <Tooltip title="Sair" placement="bottom">
                        <button onClick={handleSignOut}>
                            <Avatar sx={{backgroundColor: '#1976d2'}} className='m-1 bg-accent hover:bg-accent-hover'>
                                <ExitToAppIcon />
                            </Avatar>
                        </button>
                    </Tooltip>
                     
                </nav>
            </div>
        </header>
    )
}
