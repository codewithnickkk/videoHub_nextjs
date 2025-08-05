"use client"
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";

const imgkit_url_endpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <SessionProvider refetchInterval={5*60}>
            <ImageKitProvider urlEndpoint={imgkit_url_endpoint}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    );
}