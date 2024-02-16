'use client'

import { Avatar, Tooltip } from '@mui/material'
import Link from 'next/link'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

type User = {
    id?: string;
    name?: string;
    email?: string;
    token?: string;
}

export function Header() {

    const [user, setUser] = useState<User>({});
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
        <header className="w-full flex flex-row justify-center h-[7rem] bg-slate-50 drop-shadow-lg">
            <div className="container px-5 flex flex-row items-center justify-between">
                <Link href="/events">
                    <h1 className="text-5xl font-bold cursor-pointer text-gradient">Eventy</h1>
                </Link>

                <nav className="flex flex-row justify-between items-center gap-6 text-black">
                    <h1 className='text-2xl'>Olá, {capitalizeFirstLetter(user.name ?? '')}!</h1>
                    {/* <Link href="/abc">
                        abc
                    </Link>

                    <Link href="/xyz">
                        xyz
                    </Link> */}
                    <Tooltip title="Sair" placement="bottom">
                        <button onClick={handleSignOut}>
                            <Avatar className='m-1 button-gradient hover:bg-accent-hover'>
                                <ExitToAppIcon />
                            </Avatar>
                        </button>
                    </Tooltip>
                     
                </nav>
            </div>
        </header>
    )
}
