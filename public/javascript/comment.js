const postId = document.querySelector('input[name="post-id"]').value;

console.log(postId);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;
  console.log(comment_text);

  if (comment_text) {
    const response = await fetch("/api/comment", {
      method: "POST",
      bosy: JSON.stringify({
        postId,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
