'use client'

import { Header } from "../Components/Header/Header";

import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect } from "react";
import { api } from "@/services/api";
import { formatStringDateTime } from "@/utils/datetimeUtils";
import { IconButton, Link } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1},
    { field: 'startDate', headerName: 'Início', flex: 1},
    { field: 'endDate', headerName: 'Fim', flex: 1},
    //a column with two action icons
    {
        field: 'actions',
        headerName: 'Ações',
        sortable: false,
        width: 150,
        disableClickEventBubbling: true,
        renderCell: (params: GridCellParams) => {
            return (
                <div className="flex flex-row items-center justify-center">
                    <IconButton
                        aria-label="edit"
                        component={Link}
                        href={`/dashboard/events/${params.id}`}
                    >
                        <EditIcon className="text-accent hover:text-accent-hover transition-all duration-300" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        component={Link}
                        href={`/dashboard/events/${params.id}`}
                    >
                        <DeleteIcon className="text-accent hover:text-accent-hover transition-all duration-300" />
                    </IconButton>
                </div>
            );
        },
    },
];

export default function Dashboard() {

    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await api.get('Events/v1/all')
            .then(response => {
                let data = response.data.map((item : any) => {
                    return {
                        id: item.id,
                        name: item.name,
                        startDate: formatStringDateTime(item.startDate),
                        endDate: formatStringDateTime(item.endDate),
                    }
                });
                setRows(data);
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <Header/>

            <div className="flex flex-col items-center justify-center mt-3 text-black">
                <h1 className="text-2xl py-5">Meus eventos</h1>

                <div className="w-full container">
                    <Link href="/events/create" sx={{color: 'white', textDecoration: 'none'}}
                     className="bg-accent hover:bg-accent-hover font-bold py-2 px-4 rounded float-right
                                transition-all duration-300">
                        Criar Evento
                    </Link>
                </div>

                <div className="container mt-5">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            }}
                            pageSizeOptions={[5, 10]}
                            // checkboxSelection
                        />
                    </div>
                </div>

            </div>
        </>
    );
}
