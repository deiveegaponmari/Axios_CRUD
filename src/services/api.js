import axios from 'axios';

const API=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/users"
})

export const getUsers=()=>API.get("/");
export const createUser=(userData)=>API.post("/",userData)
export const updateUser=(userData)=>API.put(`/${id}`,userData)
export const deleteUser=(id)=>API.delete(`/${id}`)