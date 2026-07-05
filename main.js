const forms=document.querySelector(".userInputForm")
const submitbtn=document.querySelector(".search");
const ressection=document.querySelector(".result");
const errsection=document.querySelector(".errorarea");
const errtag=document.createElement("p");

let attribs_name=document.createElement("p");
let attribs_bio=document.createElement("p");
let attribs_followers=document.createElement("p");
let attribs_following=document.createElement("p");
let attribs_location=document.createElement("p");
let attribs_public_repos=document.createElement("p");

forms.addEventListener("submit", async e=>{
    e.preventDefault();
    const username=document.querySelector("#username").value;
    localStorage.setItem("username",username);
    const url = `https://api.github.com/users/${username}`;
    ressection.innerHTML="";
    errsection.innerHTML="";
    const status=document.createElement("p");
    status.textContent="SEARCHING...";
    
    forms.appendChild(status);
    try
    {   
        const res=await fetch(url);
        if(!res.ok)
        {
            throw new Error("INVALID OR USERNAME NOT AVAILABLE");
        }
        else{
            const data =await res.json();
        console.log(data)
       const {name,bio,followers,following,location,public_repos}=data;
        attribs_name.textContent=name;
        attribs_bio.textContent=bio;
        attribs_followers.textContent=followers;
        attribs_following.textContent=following;
        attribs_location.textContent=location ??"LOCATION NOT AVAILABLE";
        attribs_public_repos.textContent=public_repos;
        ressection.appendChild(attribs_name);
        ressection.appendChild(attribs_bio);
        ressection.appendChild(attribs_followers);
        ressection.appendChild(attribs_following);
        ressection.appendChild(attribs_location);
        ressection.appendChild(attribs_public_repos);
        const repourl=await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos=await repourl.json();
        console.log(repos);
        const pardiv=document.createElement("div");
        repos.forEach(repo=>{
            const ddiv=document.createElement("div");
            const repname=document.createElement("p");
            repname.textContent=repo.name;
            ddiv.appendChild(repname);
            const replink=document.createElement("a");
            replink.textContent='GO TO REPO'
            replink.href=repo.html_url;
            replink.target="_blank";
            ddiv.appendChild(replink);
            const descript=document.createElement("p");
            descript.textContent=repo.description??"NO DESCRIPTION";
            ddiv.appendChild(descript);
            ddiv.classList.add("cardformat");
            pardiv.appendChild(ddiv);
            
        })
        pardiv.classList.add("format")
        ressection.appendChild(pardiv);
        }
        

    }
    catch(err)
    {
        
        errtag.textContent=err.message;
        errsection.appendChild(errtag);
    }
    finally
    {
        status.remove();
    }

});
const savedName=localStorage.getItem("username");
if(savedName)
{
    document.querySelector("#username").value=savedName;
    forms.dispatchEvent(new Event("submit"));
}
