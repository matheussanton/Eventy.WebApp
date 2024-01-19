'use client'

import { Header } from "../Components/Header/Header";

import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect } from "react";
import { api } from "@/services/api";
import { formatStringDateTime } from "@/utils/datetimeUtils";
import { Box, Button, IconButton, Link, Modal, Tab, Tabs, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from "react-toastify";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { EStatus } from "../enums/EStatus";

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

    const eventsColumns: GridColDef[] = [
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
                                href={`/events/form?id=${params.id}`}
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

    const pendingEventsColumns: GridColDef[] = [
        { field: 'owner.name',
            valueGetter: (params : GridCellParams) => {
                return params?.row?.owner?.name;
            },
            headerName: 'Anfitrião', flex: 1},
        { field: 'name', headerName: 'Nome', flex: 1},
        { field: 'startDate', headerName: 'Início', flex: 1},
        { field: 'endDate', headerName: 'Fim', flex: 1},
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
                                aria-label="accept"
                                component={Link}
                                onClick={() => patchEventStatus(params.id, EStatus.ACTIVE)}
                            >
                                <CheckIcon className="text-accent hover:text-accent-hover transition-all duration-300" />
                            </IconButton>
                            <IconButton
                                aria-label="decline"
                                component={Link}
                                onClick={() => patchEventStatus(params.id, EStatus.INACTIVE)}
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
        await api.delete(`Events/v1/${idForDeletion}`)
        .then(response => {
            setOpenDeleteModal(false);
            setIdForDeletion('');
            toast.success('Evento deletado com sucesso!');

            fetchData();
        });
    }

    const patchEventStatus = (eventId : GridRowId, status : EStatus) => {
        api.patch(`Events/v1/${eventId}?status=${status}`)
        .then(response => {
            let action = status == EStatus.ACTIVE ? 'aceito' : 'recusado';
            toast.success(`Evento ${action} com sucesso!`);

            fetchData();
        });
    }

    const [events, setEvents] = React.useState([]);
    const [pendingEvents, setPendingEvents] = React.useState([]);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [idForDeletion, setIdForDeletion] = React.useState<GridRowId>('');

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
            setEvents(data);
        });

        await api.get('Events/v1/pending')
        .then(response => {
            let data = response.data.map((item : any) => {
                return {
                    id: item.id,
                    name: item.name,
                    startDate: formatStringDateTime(item.startDate),
                    endDate: formatStringDateTime(item.endDate),
                    owner: item.owner
                }
            });
            setPendingEvents(data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Header/>
            
            <div className="pt-8 flex flex-row justify-center">
                <div className="container">

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Meus eventos" value="1" />
                            <Tab label="Convites pendentes" value="2" />
                        </TabList>
                        </Box>

                        <TabPanel value="1">
                            <div className="flex flex-col items-center justify-center mt-3 text-black">
                                <h1 className="text-2xl py-5 uppercase font-medium">Meus eventos</h1>

                                <div className="w-full container">
                                    <Link href="/events/form" sx={{color: 'white', textDecoration: 'none'}}
                                    className="bg-accent hover:bg-accent-hover font-bold py-2 px-4 rounded float-right
                                                transition-all duration-300">
                                        Criar Evento
                                    </Link>
                                </div>

                                <div className="container mt-5">
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rowSelection={false}
                                            rows={events}
                                            columns={eventsColumns}
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
                        </TabPanel>

                        <TabPanel value="2">
                            <div className="flex flex-col items-center justify-center mt-3 text-black">
                                <h1 className="text-2xl py-5 uppercase font-medium">Convites pendentes</h1>

                                <div className="container mt-5">
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rowSelection={false}
                                            rows={pendingEvents}
                                            columns={pendingEventsColumns}
                                            initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                    </TabContext>
                </div>
            </div>
            
        </>
    );
}
