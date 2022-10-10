// add event listener to update posts / createpost

const createPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector(".readpost-title").value.trim();
    const text = document.querySelector(".readpost-text").value.trim();
  
    if (title && text) {
      // may need api/
    
      const response = await fetch("/post-routes", {
        method: "POST",
        body: JSON.stringify({ title, text }),
        headers: { "Text-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/readpost");
      } else {
        alert("Failed to log in.");
      }
    }
  };
  
  document
    .querySelector(".createpost-btn")
    .addEventListener("submit", createPostFormHandler);