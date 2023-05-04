import {useGlobalContext} from "../context/context";
import {useEffect, useState} from "react";

export const usePost = (slug: string) => {
    const {data: {allWpPost}, findPost} = useGlobalContext()
    const [post, setPost] = useState<Queries.WpPost>()
    useEffect(() => {
        const post = findPost('header')
        post && setPost(post)
    }, [allWpPost])

    return [post]

}
