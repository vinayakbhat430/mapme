"use client";

import React, { useState } from 'react'
import CardWrapper from './cardWrapper';
import { LoginSchema } from '../../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';

const LoginForm = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const form = useForm({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
        email:"", 
        name:"",
        password:"",
        confirmPassword:""
    }
  });

  // Setup useRequest hook with the registration endpoint
  const { errors, doRequest } = useRequest({
    url: "/api/users/signin",
    method: "post",
    onSuccess: () =>{
        setLoading(false);
        router.push('/')
    }
  });

  const onSubmit= async (data: z.infer<typeof LoginSchema>)=>{      
      setLoading(true);
      await doRequest(data);
  }

  const {pending} = useFormStatus();
  return (
    <CardWrapper label="Login to your account" title="Login" backbuttonHref="/auth/register" backButtonLabel="Dont have an account? Register.">
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
                    <FormField control={form.control} name="password" render={({field})=>{
                        return <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                  <Input {...field} type="password"></Input>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>;
                    }}/>
                </div>
                <Button type="submit" className="w-full" disabled={pending}> {loading ? "loading...":"login"}</Button>
            </form>
        </Form>
        {errors}
    </CardWrapper>
  )
}

export default LoginForm;