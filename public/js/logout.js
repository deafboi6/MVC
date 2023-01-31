const logout = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/");
        console.log("logout success");
    } else {
        console.log("you got stuck here --logout.js");
        alert(response.statusText);
    };
};

document.querySelector("#logout").addEventListener("click", logout);