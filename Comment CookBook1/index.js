window.onload = function setTemplate() {
 document.getElementById('allComments').innerHTML = localStorage.getItem('template');
};

const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function (ev) {
addComment(ev);
});

function addComment(ev) {
 let commentText, wrapDiv;
 const author = document.createElement('div');
 author.className = 'author';
 const authorImage = document.createElement('div');
 authorImage.className = 'profile-img';
 authorImage.id = 'profile-img';
 const image = document.createElement('img');
 image.src = 'https://randomuser.me/api/portraits/men/45.jpg';
 image.alt = 'alt';
 const authorInfo = document.createElement('div');
 authorInfo.className = 'author-info';
 const authorId = document.createElement('strong');
 authorId.id = 'name';
 authorId.innerText = 'Akash Acharya';
 const authorDate = document.createElement('small');
 authorDate.id = 'date';
 authorDate.innerText = 'Oct 08, 2020'
 authorImage.appendChild(image);
 authorInfo.appendChild(authorId); 
 authorInfo.appendChild(authorDate);
 author.appendChild(authorImage);
 author.appendChild(authorInfo);
 const textBox = document.createElement('div');
 const replyButton = document.createElement('button');
 replyButton.className = 'reply';
 replyButton.innerHTML = 'Reply';
 const likeButton = document.createElement('button');
 likeButton.innerHTML = 'Like';
 likeButton.className = 'likeComment';
 const deleteButton = document.createElement('button');
 deleteButton.innerHTML = 'Delete';
 deleteButton.className = 'deleteComment';
 const editButton = document.createElement('button');
 editButton.innerHTML = 'Edit';
 editButton.className = 'editComment';
 if(hasClass(ev.target.parentElement.parentElement, 'container')) {
     const wrapDiv = document.createElement('div');
     wrapDiv.style.boxShadow = "5px 5px 10px black";
     wrapDiv.className = 'wrapper';
     wrapDiv.style.marginLeft = 0;
     commentText = document.getElementById('comment').value;
     document.getElementById('comment').value = '';
     textBox.innerHTML = commentText;
     textBox.style.backgroundColor = "aliceblue";
     wrapDiv.append(author, textBox, replyButton, likeButton, deleteButton, editButton);
     commentContainer.appendChild(wrapDiv);
 } else {
     wrapDiv = ev.target.parentElement;
     // wrapDiv.style.boxShadow = "10px 20px 30px blue";
     commentText = ev.target.parentElement.firstElementChild.value;
     textBox.innerHTML = commentText;
     textBox.style.backgroundColor = "cornsilk";
     wrapDiv.innerHTML = '';
     wrapDiv.append(author, textBox, replyButton, likeButton, deleteButton, editButton);
 }
 setOnLocalStorage();
}

function setOnLocalStorage () {
 localStorage.setItem('template', document.getElementById('allComments').innerHTML);
}
function hasClass(elem, className) {
 console.log(elem.className.split(' ').indexOf(className));
 return elem.className.split(' ').indexOf(className) > -1;
}
document.getElementById('allComments').addEventListener('click', function (e) {
 if (hasClass(e.target, 'reply')) {
     if(e.target.parentElement.querySelector(".textarea")!=null) {
      e.target.parentElement.querySelector(".textarea").parentElement.remove();
     }
     else {
      const parentDiv = e.target.parentElement;
      const wrapDiv = document.createElement('div');
      wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
      wrapDiv.className = 'wrapper';
      const textArea = document.createElement('textarea');
      textArea.className = 'textarea';
      textArea.style.marginRight = '20px';
      const addButton = document.createElement('button');
      addButton.className = 'addReply';
      addButton.innerHTML = 'Add';
      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = 'Cancel';
      cancelButton.className='cancelReply';
      wrapDiv.append(textArea, addButton, cancelButton);
      parentDiv.appendChild(wrapDiv);
     }

 } else if(hasClass(e.target, 'addReply')) {
     addComment(e);
 } else if(hasClass(e.target, 'likeComment')) {
      const likeBtnValue = e.target.innerHTML;
      e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;
     setOnLocalStorage();
 } else if(hasClass(e.target, 'cancelReply')) {
     e.target.parentElement.innerHTML = '';
     setOnLocalStorage();
 } else if(hasClass(e.target, 'deleteComment')) {
     e.target.parentElement.remove();
 }
});
