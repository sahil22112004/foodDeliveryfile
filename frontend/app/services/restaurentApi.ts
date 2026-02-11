const BASE_URL = 'http://localhost:4000';

export const apiCreateRestaurent = async (resaturent: any) => {
    const res = await fetch(`${BASE_URL}/restaurent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resaturent),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Register failed');
    return data;
};

export const apiGetAllRestaurent = async () => {
    const res = await fetch(`${BASE_URL}/restaurent`)

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Register failed');
    return data;


}

export const apiRestaurentforUser = async (id:any) => {
    const res = await fetch(`${BASE_URL}/restaurent/${id}`)

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Register failed');
    return data;


}