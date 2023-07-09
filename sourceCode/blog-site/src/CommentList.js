import React, { useState, useEffect, useRef } from "react";
import { fido } from "./functions";
import blogUrl from "./blogUrl";
import Comment from "./Comment";

export default function CommentList(props) {
    const id = props.id;
    const commentsShown = 3;
    const [start, setStart] = useState(0);
    let last = useRef(commentsShown);
    let length = useRef();
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        fido(`${blogUrl('comments')}?postId=${id}`, createCommentElements, abortController, setComments)

        function createCommentElements(data) {
            length.current = data.length;
            last.current = Math.min(start + commentsShown, length.current);
            let createdComments = [];
            for (let i = start; i < last.current; i++) {
                const { name, body } = data[i];
                createdComments.push(<Comment key={i} name={name} body={body} />)
            }
            setComments(createdComments);
        }
    }, [start, id]);

    function prev() {
        setStart(start - commentsShown)
    }

    function next() {
        setStart(start + commentsShown)
    }

    return (<>
        {comments}
        {length.current &&
            <div className="showMore">
                {start !== 0 && <button onClick={prev}>&#129032; prev</button>}
                {last.current !== length.current && <button onClick={next}>next &#129034;</button>}
            </div>}
    </>);
}