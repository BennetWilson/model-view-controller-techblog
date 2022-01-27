const postId = document.querySelector('input[name="post_id"]').value;

console.log(postId);

commentFormHandler = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('textarea[name="comment-body"]').value;
    console.log(commentContent);

    if(commentContent) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentContent
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    };
}

document 
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);