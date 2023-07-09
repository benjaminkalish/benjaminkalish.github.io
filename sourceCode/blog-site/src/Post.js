import React, { useState, useRef, useEffect } from "react";
import CommentList from "./CommentList";
import { fido, getLength } from "./functions";
import blogUrl from "./blogUrl";

export default function Post(props) {
    const { id, title, body } = props;
    const [isHidden, setIsHidden] = useState(true);
    const commentCount = useRef();
    const [buttonText, setbuttonText] = useState();
    const firstRender = useRef(true);

    useEffect(() => {
        (async () => {
            const abortController = new AbortController();
            commentCount.current = await fido(`${blogUrl('comments')}?postId=${id}`, getLength, abortController);
            if (firstRender.current) {
                setbuttonText(`${commentCount.current} comments`);
                firstRender.current = false;
            }
            else {
                setbuttonText(!isHidden ? 'hide comments' : `${commentCount.current} comments`);
            }
        })();
    }, [id, isHidden]);

    return (
        <>
            <section className="postBox" id={id}>
                <h2>{title}</h2>
                <div>{body}</div>
                <div className="buttonBox">
                    {commentCount.current && <button onClick={() => setIsHidden(!isHidden)}>{buttonText}</button>}
                </div>
            </section>
            {!isHidden && <CommentList id={id} />}
        </>
    )
}