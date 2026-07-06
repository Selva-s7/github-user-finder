const forms=document.querySelector(".userInputForm")
const submitbtn=document.querySelector(".search");
const ressection=document.querySelector(".result");
const errsection=document.querySelector(".errorarea");

const res_content=document.createElement("div");

let attribs_name=document.createElement("p");
let attribs_bio=document.createElement("p");
let attribs_followers=document.createElement("p");
let attribs_following=document.createElement("p");
let attribs_location=document.createElement("p");
let attribs_public_repos=document.createElement("p");
let attribs_avatar=document.createElement("img");
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
        {   errsection.classList.add("ERROR");
            throw new Error("INVALID OR USERNAME NOT AVAILABLE");
        }
        else{
                errsection.classList.remove("ERROR");
            const data =await res.json();
        console.log(data)
       const {name,bio,followers,following,location,public_repos,avatar_url}=data;
        attribs_name.textContent=`NAME:${name}`;
        attribs_bio.textContent=`BIO:${bio}`;
        attribs_followers.textContent=`FOLLOWERS:${followers}`;
        attribs_following.textContent=`FOLLOWING:${following}`;
        attribs_location.textContent=`LOCATION:${location ??"LOCATION NOT AVAILABLE"}`;
        attribs_public_repos.textContent=`PUBLIC REPOS:${public_repos}`;
        attribs_avatar.src=avatar_url;
        attribs_avatar.style.width="100px";
        attribs_avatar.style.borderRadius="50%";
        res_content.appendChild(attribs_avatar);
        res_content.appendChild(attribs_name);
        res_content.appendChild(attribs_bio);
        res_content.appendChild(attribs_followers);
        res_content.appendChild(attribs_following);
        res_content.appendChild(attribs_location);
        res_content.appendChild(attribs_public_repos);
        ressection.appendChild(res_content);
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
            replink.textContent='Visit Repository';
            replink.href=repo.html_url;
            const descript=document.createElement("p");
            descript.textContent=repo.description??"NO DESCRIPTION";
            ddiv.appendChild(descript);
            replink.target="_blank";
            ddiv.appendChild(replink);
            ddiv.classList.add("cardformat");
            pardiv.appendChild(ddiv);
            
        })
        res_content.classList.add("ResContent");
        pardiv.classList.add("format")
        ressection.appendChild(pardiv);
        }
        

    }
    catch(err)
    {
        const errtag=document.createElement("p");
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
