import {timeApp} from './client';
import Events from '../models/Events';

export async function getEvents() {
    let response = await timeApp.get('/events');
    return await response.data;
}

export async function setEvents(name:string, location:string, date: string, hours: number, minutes: number) {
    let response = await timeApp.post('/events', {name, location, date, hours, minutes} );
    return await response.data;
}

export async function deleteEvent(id: number) {
    let response = await timeApp.delete('/events/' + id);
    return response.data;
}