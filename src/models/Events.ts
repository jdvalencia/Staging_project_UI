export default class Events {
    name: string;
    location: string;
    date: string;
    hours: number;
    minutes: number;

    constructor( name: string, loc: string, date: string, h: number, m: number) {
        this.name = name;
        this.location = loc;
        this.date = date;
        this.hours = h;
        this.minutes = m;
    }

}