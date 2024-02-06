'use client'

import Loading from '@/app/Components/Loading/Loading';
import { EStatus } from '@/app/enums/EStatus';
import {LoadingContext} from '@/contexts/LoadingContext';
import { api } from '@/services/api';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const AcceptEvent = ({ params }: { params: { eventId: string, userId: string } }) => {

    const searchParams = useSearchParams()
    const eventId = searchParams.get('eventId') ?? '';
    const userId = searchParams.get('userId') ?? '';

    const { isLoading, setIsLoading }: any = useContext(LoadingContext);
    const [resultMessage, setResultMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    

    const patchAcceptEvent = async () => {
        await api.patch(`Events/v1/accept`, 
        {
            eventId: eventId,
            userId: userId
        })
        .then(response => {
           
            if(response.status === 200) {
                setSuccess(true);
                setResultMessage('You have accepted the event');
            }
        })
        .catch(e => {
            let data : any = e?.response?.data;
            let errorMessage = data[0]?.message ?? 'Erro';
            
            setResultMessage(errorMessage);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {

        if(eventId === undefined || eventId === null || eventId === '' ||
            userId === undefined || userId === null || userId === '') return;

       const fetch = async () => {
            await patchAcceptEvent()
        };

        fetch();
    }
    , [])

  return (
    // <div>id: {params.id}</div>
    <>
        {isLoading && <Loading/>}
        <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-3'>
            <Link href="/events">
                <img src="/logo.svg" alt="Logo" width={190} height={60} />
            </Link>
            <div className='bg-white rounded-lg flex flex-row justify-center items-center gap-5 text-black'>
                <h1 className='text-2xl font-bold '>{success ? 'Success' : 'Error'}</h1>
                <p className='text-lg'>{resultMessage}</p>
            </div>
        </div>
    </>
  )
}

export default AcceptEvent
