const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('textarea[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
  
    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('.createpost-form')
    .addEventListener('submit', newFormHandler);
  