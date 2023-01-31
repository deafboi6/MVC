const createPage =  () => {
    document.location.replace("/blogCreate");
};

document
.querySelector("#add-post")
.addEventListener("click", createPage);
