"use strict"

const sendMessage = document.getElementById("send-message");
const messageText = document.getElementById("message-text");
const posts = document.getElementById("posts")
const loginData = getLoginData();

window.onload = () =>{
    sendMessage.onclick = sendPost;
    displayPosts();
}   

// send a post fetch to create a post
const sendPost = () =>{
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                text: messageText.value
            }),
        }
    )
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })
        .catch(err => console.log(err));
}


// display all the post user liked or created 
const displayPosts = () =>{
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loginData.token}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            addPostsToDiv(data)
        });
    
}


const addPostsToDiv = (Posts) =>{
    for(let singlePost of Posts){
        // display post if user created it
        if(singlePost.username == loginData.username){
            formatSinglePost(singlePost);
        } else{
            // loop through likes of every post and find which one user liked
            for(like of singlePost.likes){
                if(like.username == loginData.username){
                    formatSinglePost(singlePost);
                }
            }
        }
    }
}


// format the layout of a single post
const formatSinglePost = (post) => {
    // use same layout as Posts Page 
};
