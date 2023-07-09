import React, { useState, useEffect } from "react";
import { fido } from "./functions";
import blogUrl from "./blogUrl";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import LoadAnimation from "./LoadAnimation";

export default function BlogList() {
    const navigate = useNavigate()
    const [blogsDisplay, setBlogsDisplay] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        setBlogsDisplay(<LoadAnimation />)
        fido(blogUrl('users'), createBlogs, abortController, setBlogsDisplay);

        async function createBlogs(data) {
            setBlogsDisplay(
                data.map((blog) => <Blog blogSelector={blogSelector} key={blog.id} blogInfo={blog} />)
            )
        }

        function blogSelector(e, id) {
            if (e.target.tagName !== 'A') {
                navigate(`/postlist/${id}`);
            }
        }

        return () => {
            abortController.abort();
            window.scrollTo({
                top: Number.MIN_VALUE,
                behavior: 'smooth'
            });
        };
    }, [navigate]);

    return (<>{blogsDisplay}</>);
}