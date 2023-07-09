export default function blogUrl(category) {
    const urls = {
        users: `https://jsonplaceholder.typicode.com/users`,
        posts: `https://jsonplaceholder.typicode.com/posts`,
        comments: 'https://jsonplaceholder.typicode.com/comments'
    }
    return urls[category];
}

