"use client";

import React, { useState } from 'react'
import CardWrapper from './cardWrapper';
import { RegisterSchema } from '../../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import useRequest from '@/hooks/useRequest';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const form = useForm({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
        email:"", 
        name:"",
        password:"",
        confirmPassword:""
    }
  });

  // Setup useRequest hook with the registration endpoint
  const { errors, doRequest } = useRequest({
    url: "/api/users/signup",
    method: "post",
    onSuccess: () =>{
        setLoading(false);
        router.push('/')
    }
  });

  const onSubmit= async (data: z.infer<typeof RegisterSchema>)=>{
    if (data.password !== data.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      
      setPasswordError(null);
      setLoading(true);
      await doRequest(data);
      setLoading(false);
  }

  const {pending} = useFormStatus();


  return (
    <CardWrapper label="Crate an account" title="Register" backbuttonHref="/auth/login" backButtonLabel="Already have an account? Login.">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field})=>{
                        return <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                  <Input {...field} type="email" placeholder="johndoe@gmail.com"></Input>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>;
                    }}/>
                    <FormField control={form.control} name="name" render={({field})=>{
                        return <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                  <Input {...field} placeholder="John Doe"></Input>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>;
                    }}/>
                    <FormField control={form.control} name="password" render={({field})=>{
                        return <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                  <Input {...field} type="password"></Input>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>;
                    }}/>
                    <FormField control={form.control} name="confirmPassword" render={({field})=>{
                        return <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                  <Input {...field} type="password"></Input>
                              </FormControl>
                              <FormMessage/>
                              {passwordError && <p className="text-red-500">{passwordError}</p>}
                          </FormItem>;
                    }}/>
                </div>
                <Button type="submit" className="w-full" disabled={pending}> {loading ? "Loading..." : "Register"}</Button>
            </form>
        </Form>
        {errors}
    </CardWrapper>
  )
}

export default RegisterForm;