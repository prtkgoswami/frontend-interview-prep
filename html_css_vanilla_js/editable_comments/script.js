const commentContainer = document.querySelector("#comments-container");
let commentList = []
let edittingComment = null;

async function fetchComments() {
    try {
        const response = await fetch("https://dummyjson.com/posts/1/comments?limit=3");

        if (!response.ok) {
            throw new Error("Failed Fetch");
        }

        const data = await response.json();
        return data.comments;
    } catch (err) {
        console.error("Failed to fetch Comments", err)
    }
}

async function populateComments() {
    const comments = await fetchComments();
    if (comments && comments.length > 0) {
        comments.forEach(comment => {
            const commentItem = createCommentHTML(comment);
            commentContainer.appendChild(commentItem);
        });
        commentContainer.addEventListener("click", function (event) {
            const target = event.target.closest('.comment');
            handleEditComment(target);
        })
        document.addEventListener('keydown', handleKeyDown);
    }
}

function createCommentHTML(comment) {
    /*
        COMMENT HTML STRUCTURE:
        <div class="comment">
          <p class="comment-text">Lorem ipsum dolor sit amet consectetur</p>
          <div class="comment-edit-body">
            <input type="text" name="" id="" class="comment-edit-input" />
            <div class="comment-edit-actions">
              <button type="button" class="comment-edit-save-btn">Save</button>
              <button type="button" class="comment-edit-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
    */

    const commentWrapper = document.createElement("div");
    commentWrapper.classList.add("comment");

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.body;

    const editWrapper = document.createElement("div");
    editWrapper.classList.add("comment-edit-body");

    const editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.classList.add("comment-edit-input");
    editInput.value = comment.body;

    const editActions = document.createElement("div");
    editActions.classList.add("comment-edit-actions");

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("comment-edit-save-btn");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", handleEditSave);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("comment-edit-cancel-btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", handleEditCancel);

    editActions.appendChild(saveBtn);
    editActions.appendChild(cancelBtn);

    editWrapper.appendChild(editInput);
    editWrapper.appendChild(editActions);

    commentWrapper.appendChild(commentText);
    commentWrapper.appendChild(editWrapper);

    return commentWrapper;
}

function handleKeyDown(event) {
    if (!edittingComment)
        return;

    if (event.key === "Enter") {
        handleEditSave();
    } else if (event.key === "Escape") {
        handleEditCancel();
    }
}

function handleEditComment(comment) {
    if (!comment || comment === edittingComment)
        return;

    if (edittingComment) {
        handleEditCancel()
    }

    edittingComment = comment;
    comment.setAttribute('data-edit', '');
    const editInput = comment.querySelector(".comment-edit-input");
    editInput.focus();
}

function handleEditSave(event) {
    if (event)
        event.stopPropagation();

    const editInput = edittingComment.querySelector('.comment-edit-input');
    const commentText = edittingComment.querySelector('.comment-text');
    const originalValue = commentText.textContent;
    const newValue = editInput.value;

    if (originalValue !== newValue)
        commentText.textContent = newValue;

    edittingComment.removeAttribute("data-edit");
    edittingComment = null;
}

function handleEditCancel(event) {
    if (event)
        event.stopPropagation();

    const editInput = edittingComment.querySelector('.comment-edit-input');
    const commentText = edittingComment.querySelector('.comment-text');
    const originalValue = commentText.textContent;
    const newValue = editInput.value;

    if (originalValue !== newValue)
        editInput.value = originalValue;

    edittingComment.removeAttribute("data-edit")
    edittingComment = null;
}

populateComments();