const newFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#blogTitle").value;
    const description = document.querySelector("#blogDescription").value;
    
    if (title && description) {
        const response = await fetch("api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers:  { "Content-Type": "application/json" }
        });
    
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("blog failed to create");
        }
    }
    };


document
.querySelector(".blog-form")
.addEventListener("submit", newFormHandler);
