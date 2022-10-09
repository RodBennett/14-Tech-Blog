// add event listener to update posts / createpost

const createPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector(".readpost-title").value.trim();
    const text = document.querySelector(".readpost-text").value.trim();
  
    if (title && text) {
      const response = await fetch("/create-post", {
        method: "POST",
        body: JSON.stringify({ title, text }),
        headers: { "Text-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/user-posts");
      } else {
        alert("Failed to log in.");
      }
    }
  };
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", createPostFormHandler);