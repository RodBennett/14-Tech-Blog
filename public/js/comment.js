const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = parseInt(document.querySelector('.readpost-title').id);
    const comment = document.querySelector('textarea[name="comment"]').value;
    
    if (comment) {
      await fetch('/api/comments', {
        method: 'POST',
        comment: JSON.stringify({
          postId,
          comment
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      document.location.reload();
    }
  };
  
  document
    .querySelector('.createcomment-form')
    .addEventListener('submit', commentFormHandler);
    

// write PUT method here


  