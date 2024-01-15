import axiosInstance from './axiosInstance';

export const getPokemonByName = async (name: string) => {
    const delay = Math.random() * 2000;
    await new Promise(res => setTimeout(res, delay));
    const response = await axiosInstance.get("/pokemon/" + name);
    return response.data;
}

export async function getPokemonPage(page: number) {
    const pageSize = 10;
    const response = await axiosInstance.get(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    return response.data;
}

export async function updateNickname(pokemon: any, nickname:string) {
    await new Promise(res => setTimeout(res, Math.random() * 2000));
    return { ...pokemon, name: nickname };
}