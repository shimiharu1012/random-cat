import {NextPage} from "next";
import { useEffect, useState } from "react";


const IndexPage: NextPage=()=>{
    const [ImageUrl,setImageUrl]=useState("");
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url);
            setLoading(false);
        });
    },[]);

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
