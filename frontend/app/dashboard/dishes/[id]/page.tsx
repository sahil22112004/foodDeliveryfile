import Dishes from "./dashboard"

export default async function editProductPage({ params }: any) {
  const {id} = await params

  
  return (
    <div>
        <Dishes restaurantId={id}/>
    </div>
  )
}