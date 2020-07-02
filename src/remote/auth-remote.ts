import { timeApp } from "./client";

export async function authenticate(username:string, password: string) {
    let response = await timeApp.post('/users/auth', {username, password});
    localStorage.setItem('authorization', response.headers.authorization);
    return response.data;
}