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
            setLoading(false)
        })
    }

    return(
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.toNext}>他のニャンコも見る</button>
            {console.log(ImageUrl)}
            <div className={styles.imageContainer}>{loading ? <div className={styles.loader}></div>: <img className={styles.image} src={ImageUrl}/>}</div>
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
    // console.log(images);
    // console.log(images[0]['url'])
    return images[0];
}

fetchImage();
