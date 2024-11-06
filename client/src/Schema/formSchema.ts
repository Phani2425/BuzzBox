import {z} from 'zod';

export const userSchema = z.object({
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(5,{message:'password must be of 5 character long'}),
    userName:z.string().min(3,{message:'username must be of 3 character long'})
})