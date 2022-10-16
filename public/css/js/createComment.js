const commentFormHandler = async (event) => {
    event.preventDefault();
  
   // const post_id = 
    const content = document.querySelector('textarea[name="comment"]').value.trim();
    
    if (content) {
     // const response = 
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
   console.log(content, "--------------------------------")
    //  if (response.ok) {

        document.location.reload('/readpost');
      } else {
        alert('Failed to save comment.');
      }
    }
  //};

  // const commentEditHandler = async (event) => {
  //   event.preventDefault();
  
  //   const editComment = document.querySelector('#comment-textarea').value.trim();
    
  //   if (editComment) {
  //     const response = await fetch('/api/comments', {
  //       method: 'PUT',
  //       body: JSON.stringify({ editComment }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  
  //     if (response.ok) {
  //       document.location.reload('/readpost');
  //     } else {
  //       alert('Failed to save comment.');
  //     }
  //   }
  // };

  document
    .querySelector('.createcomment-form')
    .addEventListener('submit', commentFormHandler);
  
  