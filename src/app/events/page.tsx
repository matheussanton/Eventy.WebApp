'use client'

import { Header } from "../Components/Header/Header";

import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect } from "react";
import { api } from "@/services/api";
import { formatStringDateTime } from "@/utils/datetimeUtils";
import { Box, Button, IconButton, Link, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'black',
    border: 'none',
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function Dashboard() {

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
                                onClick={() => callDeleteModal(params.id)}
                            >
                                <DeleteIcon className="text-accent hover:text-accent-hover transition-all duration-300" />
                            </IconButton>
                    </div>
                );
            },
        },
    ];
    
    const callDeleteModal = (id : GridRowId) => {
        setOpenDeleteModal(true);
        setIdForDeletion(id);
    }

    const deleteEvent = async () => {
        alert(idForDeletion);
        // await api.delete(`Events/v1/${idForDeletion}`)
        // .then(response => {
        //     console.log(response);
        // });
    }

    const [rows, setRows] = React.useState([]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [idForDeletion, setIdForDeletion] = React.useState<GridRowId>('');

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
                            rowSelection={false}
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </div>

                <Modal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onTransitionExited={() => setIdForDeletion('')}
                    >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="font-bold">
                        Tem certeza?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Ao deletar o evento, todos os dados serão perdidos.
                        </Typography>
                        <div className="w-full flex flex-row justify-between gap-x-2 pt-8">
                            <Button variant="contained"  onClick={() => setOpenDeleteModal(false)}>CANCELAR</Button>
                            <Button onClick={deleteEvent}>DELETAR</Button>
                        </div>
                    </Box>
                </Modal>

            </div>
        </>
    );
}
