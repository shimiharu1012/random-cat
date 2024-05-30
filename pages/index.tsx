import {GetServerSideProps,NextPage} from "next";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css"

// GetServerSidePropsから渡される引数の型
type Props={
    initialImageUrl: string;
}

const IndexPage: NextPage<Props>=({initialImageUrl})=>{
    const [ImageUrl,setImageUrl]=useState(initialImageUrl);
    const [loading,setLoading]=useState(false);

    
    const handleClick=()=>{
        setLoading(true);
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url)
        })
    }

    const handleLoad=()=>{
        setLoading(false)
 
    }


    const isVisibleLoader=loading ?  "" : styles.hidden 
    const isVisibleImage=loading ? styles.hidden : ""


    return(
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.toNext}>他のニャンコも見る</button>
            <div className={styles.imageContainer}>
                <div className={`${styles.loader} ${isVisibleLoader}`}></div>
                <img onLoad={handleLoad} className={`${styles.image} ${isVisibleImage}`} src={ImageUrl}></img>
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
    console.log(images)
    return images[0];
}

fetchImage();
