import { Typography, CssBaseline, Container, makeStyles, Grid, TextField, Snackbar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import { useHistory, Redirect } from 'react-router-dom';
import EventDTO from '../models/EventDTO'
import Events from '../models/Events';
import { getEvents, setEvents, deleteEvent } from '../remote/event-remote';
import MuiAlert from '@material-ui/lab/Alert';
import AppUser from '../models/AppUser';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface TableState {
    columns: Array<Column<EventDTO>>;
    data: EventDTO[];
}

const useStyles = makeStyles((theme) => ({
    reimbContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    alert: {
        display: "flex",
        justifyContent: "center",
        margin: 5,
        padding: 20
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    toolbar: theme.mixins.toolbar
}));

export interface IEventProps {
    authUser: AppUser;
}

export default function EventComponent(props: IEventProps) {
    const classes = useStyles();
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');
    const [eventDTO, SetEvents] = useState([new EventDTO(0, '', '', '', '')]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [openFailure, setOpenFailure] = React.useState(false);
    const [state] = useState<TableState>({
        columns: [
            { title: 'Id', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { title: 'Location', field: 'location' },
            { title: 'Date', field: 'date', type: 'date' },
            {
                title: 'Time', field: 'time', editComponent: ((props) => (
                    <form className={classes.container} noValidate>
                        <TextField
                            id="time"
                            type="time"
                            defaultValue="00:00"
                            onChange={e => props.onChange(e.target.value)}
                            value={props.value}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
                ))
            }
        ],
        data: [],
    });

    let getData = async () => {
        try {
            let result = await getEvents();
            SetEvents(result);
        }
        catch (e) {
            setErrorMessage('Table is empty');
        }
    }

    let saveData = async (name: string, location: string, date: string, hours: number, minutes: number) => {
        try {
            let result = await setEvents(name, location, date, hours, minutes);
            getData();
            setDisplayMessage("Successfully saved an event!");
            setOpen(true);
        }
        catch (e) {
            setErrorMessage('Error Occured');
            setOpenFailure(true);
        }
    }

    let delData = async (id: number) => {
        try {
            let result = await deleteEvent(id);
            setDisplayMessage("Successfully deleted an event!");
            setOpen(true);
            getData();
        }
        catch (e) {
            setErrorMessage('Error Occured');
            setOpenFailure(true);
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    useEffect(() => {
        getData();
        console.log(props.authUser);
    }, [])

    return (
        !props.authUser ?
            <Redirect to="/login" /> :
            <>
            
                <div className={classes.toolbar} style={{marginLeft: '30em !important'}} />
                <Container maxWidth="md" >
                    <Typography variant="h4" style={{ marginTop: '1em', marginBottom: '1em' }}>Time in words App</Typography>
                    <MaterialTable
                        title="Events"
                        columns={state.columns}
                        data={eventDTO}
                        localization={{
                            body: {
                                editRow: {
                                    deleteText: 'Are you sure you want to delete this item?',
                                    cancelTooltip: 'Cancel',
                                    saveTooltip: 'Save'
                                }
                            }
                        }}
                        editable={{
                            // onRowUpdate: (newData, oldData) =>
                            //     new Promise((resolve) => {
                            //         resolve();


                            //     }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    resolve();
                                    let arr = newData.time.split(':');
                                    saveData(newData.name, newData.location, newData.date, parseInt(arr[0]), parseInt(arr[1]));

                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    resolve();
                                    delData(oldData.id);

                                })
                        }}
                    />
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            {displayMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openFailure} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </>
    )
}