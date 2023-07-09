import React, { useState, useEffect } from "react";
import { fido } from "./functions";
import blogUrl from "./blogUrl";
import Post from "./Post";
import Blog from "./Blog";
import { Link, useLoaderData, useParams } from 'react-router-dom';
import LoadAnimation from "./LoadAnimation";

export default function PostList() {
    const [postsDisplay, setPostDisplay] = useState();
    const { id } = useParams();
    const headerData = useLoaderData();


    useEffect(() => {
        const abortController = new AbortController();
        setPostDisplay(<LoadAnimation />);
        fido(`${blogUrl('posts')}?userId=${id}`, createPosts, abortController, setPostDisplay);

        async function createPosts(data) {
            setPostDisplay(data.map((post) => <Post key={post.id} id={post.id} title={post.title} body={post.body} />))
        }

        return () => {
            abortController.abort();
            window.scrollTo({
                top: Number.MIN_VALUE,
                behavior: 'smooth'
            });
        }
    }, [id]);

    return (<>
        {<Blog blogInfo={headerData} className={'selected'} />}
        <Link to={'/'}><button id='reset'>back to blog list</button></Link>
        {postsDisplay}
    </>);
}