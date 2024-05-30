import {GetServerSideProps,NextPage} from "next";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css"


// console.log(styles.loader<"string">.visibility)
// GetServerSidePropsから渡される引数の型
type Props={
    initialImageUrl: string;
}


const IndexPage: NextPage<Props>=({initialImageUrl})=>{


    // const loader=document.querySelector(styles.loader)
    // console.log(loader)
    // console.log(typeof(loader))

    const [ImageUrl,setImageUrl]=useState(initialImageUrl);
    // fecthing APIからの取得中はtrue,　取得後はfalse
    // const [fecthing,setFetching]=useState(false);
    // ページへの画像読み込み中はtrue，取得後はfalse
    const [loading,setloading]=useState(false);

    const handleClick=()=>{
        // setFetching(true);
        setloading(true)
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url)
            // setFetching(false)
        })
    }

    const handleLoad=()=>{
        setloading(false);
    }

    const color=loading ? styles.red : ""
    const isLoaderVisible=loading ?  "" : styles.hidden;
    const isImageVisible=loading ? styles.hidden : "";
    // console.log(`isLoader ${isLoader}`)
    // console.log(`isImage ${isImage}`)
    console.log(color)

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
    // console.log(images);
    // console.log(images[0]['url'])
    return images[0];
}

fetchImage();
