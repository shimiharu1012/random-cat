import {GetServerSideProps,NextPage} from "next";
import { useEffect, useState } from "react";

// GetServerSidePropsから渡される引数の型
type Props={
    initialImageUrl: string;
}

const IndexPage: NextPage<Props>=({initialImageUrl})=>{
    const [ImageUrl,setImageUrl]=useState(initialImageUrl);
    const [loading,setLoading]=useState(false);

    // useEffect(()=>{
    //     fetchImage().then((newImage)=>{
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // },[]);

    // useEffect(()=>{
    //     console.log(loading)
    // },[loading])
    //　ボタンをクリックしたときに画像を読み込む処理
    // const handleClick=async()=>{
    //     setLoading(true);
    //     const newImage=await fetchImage();
    //     setImageUrl(newImage.url)
    //     setLoading(false);
    // }
    
    const handleClick=()=>{
        setLoading(true);
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url)
            setLoading(false)
        })
    }

    return(
        <div className="">
            <button onClick={handleClick}>他のニャンコも見る</button>
            <div>{loading ? <p>LOADING</p> : <img src={ImageUrl}/>}</div>
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
    console.log(images);
    return images[0];
}

fetchImage();
