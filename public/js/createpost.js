const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('.createpost-title').value;
    const content = document.querySelector('.createpost-text').value;
  
    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/');
  };
  
  document
    .querySelector('.createpost-form')
    .addEventListener('submit', newFormHandler);
  