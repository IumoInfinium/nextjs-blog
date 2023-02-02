import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";
import styles from '../../styles/alert.module.css';
import {clsx} from "clsx";
import React, { useState } from "react";
import postStyles from "../../styles/posts.module.css";

export default function FirstPost(){
    // let error_state=false;
    const ImageComponent = () => {
        <Image
        src= "/images/profile.jpg"
        height ={144}
        width = {144}
        alt = "Profile Picture"
        />
    };
    
    let [error_state, set_error_state]= useState(true,"")
    return (
        <Layout>
            <Head>
                <title> First Post</title>
            </Head>
            {/* <Script
                src="https://www.github.com/iumoinfinium/dsa/tree/main/README.md"
                strategy="lazyOnload"
                onLoad={()=>{
                    console.log("script loaded successfully, window.GB has been populated!")
                }}
            /> */}
            <div
                className={clsx([postStyles.postBody],{
                    [styles.success] : error_state === false,
                    [styles.error] : error_state === true,
                })}
            >
                The color of this text can be changed used the toggle button below!
            </div>
            <button
                onClick={()=>{
                    error_state? set_error_state(error_state=false): set_error_state(error_state=true);
                }}
            >
                Toggle
            </button>

        </Layout>
    );
}