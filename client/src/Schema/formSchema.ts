import {z} from 'zod';

export const userSchema = z.object({
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(5,{message:'password must be of 5 character long'})
})