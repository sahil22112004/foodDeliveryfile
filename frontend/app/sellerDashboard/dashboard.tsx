'use client'

import { useEffect, useState } from 'react'
import './dashboard.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { apiCreateRestaurent, apiRestaurentforUser } from '../services/restaurentApi';
import { apiCreateDish, fetchsellerdishes } from '../services/dishApi';
import Card from './card/card';
import { useSnackbar } from 'notistack';
import { logout } from '../redux/slice/authSlice';
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '../component/cloudnairy'


export default function dashboard() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [dishes, setdishes] = useState<any[]>([])
    const { enqueueSnackbar } = useSnackbar()
    const [restaurantinfo, setRestauarantInfo] = useState<any>({})


    const getRestaurantInfo = async () => {
        const restaurantInfo = await apiRestaurentforUser(currrentUser?.id)
        setRestauarantInfo(restaurantInfo)

    }

    const currrentUser = useSelector((state: RootState) => state.auth.currentUser)

    const fetchsellerDishes = async () => {
        const payload = await fetchsellerdishes(currrentUser?.id)
        setdishes(payload)
    }

    useEffect(() => {
        fetchsellerDishes()
        getRestaurantInfo()
    }, [currrentUser])


    const restaurentSchema = z.object({
        restaurantname: z.string().min(3, "Name must be at least 3 chars"),
        description: z.string().min(1, "discription cannot be empty"),
        image: z.any().refine((files) => files?.length > 0, "File is required"),

    });
    type restaurentFormData = z.infer<typeof restaurentSchema>;

    const dishSchema = z.object({
        dishname: z.string().min(3, "Name must be at least 3 chars"),
        description: z.string().min(1, "Description must be greater than 0"),
        price: z.coerce.number().min(1, "Price must be greater than 0"),
        image: z.any().refine((files) => files?.length > 0, "File is required"),

    });
    type diishFormData = z.infer<typeof dishSchema>;
    console.log('res infp', restaurantinfo)


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<restaurentFormData>({
        resolver: zodResolver(restaurentSchema),
    });
    const {
        register: dishRegister,
        handleSubmit: dishhandleSubmit,
        formState: { errors: disherrors },
        reset: dishReset,
        watch: dishwatch,
    } = useForm<diishFormData>({
        resolver: zodResolver(dishSchema),
    });

    const [addRestaurentmodal, setAddRestaurentmodal] = useState<boolean>(false)
    const [addDishmodal, setAddDishmodal] = useState<boolean>(false)



    const onSubmitRestaurent = async (restaurentInfo: any) => {
        const fileToUpload = restaurentInfo.image[0];
        const uploadedUrl = await uploadToCloudinary(fileToUpload);
        console.log('uploadedUrl', uploadedUrl)
        if (uploadedUrl) {
            const RestaurentInfo = {
                ...restaurentInfo,
                image: uploadedUrl,
                userId: currrentUser?.id
            }
            console.log(RestaurentInfo)
            try {
                const res = await apiCreateRestaurent(RestaurentInfo)
                reset()
                setAddRestaurentmodal(false)
                fetchsellerDishes()
                window.location.reload()
            } catch (error: any) {
                console.log(error)
            }
        } else {
            enqueueSnackbar("failed to upload image", { variant: "error" })
            return
        }


    }
    const onSubmitDish = async (dishInfo: any) => {
        console.log('working')
        const fileToUpload = dishInfo.image[0];
        const uploadedUrl = await uploadToCloudinary(fileToUpload);
        if (uploadedUrl) {
            const DishInfo = {
                ...dishInfo,
                image: uploadedUrl,
                userId: currrentUser?.id,
                restaurantId: restaurantinfo?.id
            }
            console.log(DishInfo)
            try {
                const res = await apiCreateDish(DishInfo)
                dishReset()
                setAddDishmodal(false)
                fetchsellerDishes()


            } catch (error: any) {
                console.log(error)

            }

        }else{
            enqueueSnackbar("failed to upload image", { variant: "error" })
            return
        }

    }

    const handleAddDishModal = () => {
        if (Object.keys(restaurantinfo).length === 0) {
            enqueueSnackbar("register Restaurant first to add Dish", { variant: "error" })
        } else {
            setAddDishmodal(true)

        }
    }
    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };


    return (
        <>
            <header>
                <h3>seller Dashoard</h3>
                {Object.keys(restaurantinfo).length === 0 && <button onClick={() => setAddRestaurentmodal(true)}>Add restaurent</button>}
                <button onClick={handleAddDishModal}>Add Dish in Menu</button>
                <button onClick={handleLogout}>Log Out</button>

            </header>
            <main>
                {addRestaurentmodal &&
                    <form onSubmit={handleSubmit(onSubmitRestaurent)} className="form">
                        <input
                            type="text"
                            placeholder="Restaurant Name"
                            {...register("restaurantname")}
                        />
                        {errors.restaurantname && (
                            <p className="error">{errors.restaurantname.message}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Description"
                            {...register("description")}
                        />
                        {errors.description && <p className="error">{errors.description.message}</p>}



                        <input type="file" accept="image/*" {...register("image")} className="block" />
                        {errors.image && <p className="text-red-500">{errors.image.message as string}</p>}

                        <div className='formbuttons'>
                            {Object.keys(restaurantinfo).length === 0 && <button type='submit'>Add Restaurent</button>}
                            <button onClick={() => setAddRestaurentmodal(false)} >Cancel</button>
                        </div>

                    </form>
                }
                {addDishmodal &&

                    <form onSubmit={dishhandleSubmit(onSubmitDish)} className="form">
                        <input
                            type="text"
                            placeholder="Dish Name"
                            {...dishRegister("dishname")}
                        />
                        {disherrors.dishname && (
                            <p className="error">{disherrors.dishname.message}</p>
                        )}

                        <input
                            type="number"
                            placeholder="Price"
                            {...dishRegister("price")}
                        />length
                        {disherrors.price && (
                            <p className="error">{disherrors.price.message}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Description"
                            {...dishRegister("description")}
                        />
                        {disherrors.description && <p className="error">{disherrors.description.message}</p>}

                        <input type="file" accept="image/*"  {...dishRegister("image")} className="block" />
                        {errors.image && <p className="text-red-500">{errors.image.message as string}</p>}

                        <div className='formbuttons'>
                            <button type='submit'>Add Dish</button>
                            <button onClick={() => setAddDishmodal(false)} >Cancel</button>
                        </div>

                    </form>

                }
                {dishes.length ? (
                    dishes.map((dish: any) => <Card key={dish.id} dish={dish} fetchsellerDishes={fetchsellerDishes} />)
                ) : (
                    <p style={{ textAlign: "center" }}>
                        <p>No dishes found</p>
                    </p>
                )}
            </main>

        </>
    )
}


