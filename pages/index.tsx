import {GetServerSideProps,NextPage} from "next";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css"


type Props={
    initialImageUrl: string;
}


const IndexPage: NextPage<Props>=({initialImageUrl})=>{


    const [ImageUrl,setImageUrl]=useState(initialImageUrl);
    const [loading,setloading]=useState(false);

    const handleClick=()=>{
        setloading(true)
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url)
        })
    }

    const handleLoad=()=>{
        setloading(false);
    }

    const color=loading ? styles.red : ""
    const isLoaderVisible=loading ?  "" : styles.hidden;
    const isImageVisible=loading ? styles.hidden : "";

    return(
        
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.toNext}>他のニャンコも見る</button>
            <div className={styles.imageContainer}>
                {/* <div className={`${color}`}>hello</div> */}
                <div className={`${styles.loader} ${isLoaderVisible}`}></div>
                <img onLoad={handleLoad} className={`${styles.image} ${isImageVisible}`} src={ImageUrl}/>
            </div>
        </div>
    )
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props>=async ()=>{
    const image =await fetchImage();
    return {
        props:{
            initialImageUrl:image.url
        },
    };
};

type Imgae={
    url:string;
}

const fetchImage=async():Promise<Imgae>=>{
    const res=await fetch("https://api.thecatapi.com/v1/images/search");
    const images =await res.json();
    return images[0];
}

fetchImage();
