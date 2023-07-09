import React, { useEffect, useState } from 'react';
import { fido, getLength } from "./functions";
import blogUrl from './blogUrl';

export default function Blog(props) {
    const { id, username, website, company: { name: companyName, catchPhrase, bs: blogName } } = props.blogInfo;
    const [postCount, setPostCount] = useState();
    const blogSelector = props.blogSelector || function () { };
    const className = props.className || '';

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            setPostCount(await fido(`${blogUrl('posts')}?userId=${id}`, getLength, abortController));
        })();

        return () => {
            abortController.abort();
        };
    }, [id]);

    return (<section className={`blogBox ${className}`} onClick={(e) => blogSelector(e, id)}>
        <h2>{blogName}</h2>
        <h4>by {username}</h4>
        <a href="https://pcsnynj.org/course/software-web-and-app-development/" target="_blank" rel="noreferrer">{website}</a>
        <div className="postCount">
            <div>{postCount && 'Posts'}</div>
            <div>{postCount}</div>
        </div>
        <div className="company">
            <div>{companyName}</div>
            <div>{catchPhrase}</div>
        </div>
    </section>);
}
