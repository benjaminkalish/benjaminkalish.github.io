import React from "react";

export default function Comment(props) {
    const { name, body } = props;
    return (
        <section className="commentBox">
            <h4>{name}</h4>
            <div>{body}</div>
        </section>
    );
}