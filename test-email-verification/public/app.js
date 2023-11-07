document.addEventListener('DOMContentLoaded', ()=>{
    let searchButton = document.getElementById("search-icon");
    let friendList = document.querySelector(".friends-files");

    friendList.addEventListener("click", (e)=>{
        let selectedFile = e.target.closest(".file");
        selectedFile.classList.add("selected");
        if(selectedFile){
            let allFiles = document.querySelectorAll(".file");

            allFiles.forEach(file=>{
                if(file != selectedFile){
                    file.classList.remove("selected");
                }
            });
        }
    });


    searchButton.addEventListener("click", ()=>{
        
    });

});