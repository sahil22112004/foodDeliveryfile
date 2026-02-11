const BASE_URL = 'http://localhost:4000';

export const apiCreateDish = async (dish: any) => {
    const res = await fetch(`${BASE_URL}/dishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dish),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || ' failed');
    return data;
};


export async function fetchdishes(
  offset: number,
  limit: number,
  dishname?: string,
  restaurantId?:string
) {
  let url = `${BASE_URL}/dishes/restaurent?restaurantId=${restaurantId}&offset=${offset}&limit=${limit}`

  if (dishname) url += `&dishname=${dishname}`

  const res = await fetch(url)
  const data = await res.json()
  return data || []   
}

export async function fetchsellerdishes(id:any) {
  let url = `${BASE_URL}/dishes/user/${id}`
  const res = await fetch(url)
  const data = await res.json()
  return data || []   
}

export async function deleteProduct(id: string) {
  console.log('coming in this')
  const res = await fetch(`${BASE_URL}/dishes/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}


export async function changeisAvailabledish(id: string,isAvailable:boolean) {
  console.log('coming in this',id,isAvailable)
  const res = await fetch(`${BASE_URL}/dishes/isAvailable/${id}?isAvailable=${isAvailable}`, {
    method: "PATCH",
  });
  return await res.json();
}
