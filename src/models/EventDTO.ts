export default class EventsDTO {
    id: number;
    name: string;
    location: string;
    date: string;
    time: string;

    constructor(id:number, name: string, loc: string, date: string, time:string) {
        this.id = id;
        this.name = name;
        this.location = loc;
        this.date = date;
        this.time = time; 
    }

}