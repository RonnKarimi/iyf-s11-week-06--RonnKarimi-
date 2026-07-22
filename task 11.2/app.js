const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    console.clear();

    console.log("===== Exercise 1: Callback Hell =====");

    function getUserData(userId, callback) {
        setTimeout(() => {
            callback({
                id: userId,
                name: "John"
            });
        }, 1000);
    }

    function getUserPosts(userId, callback) {
        setTimeout(() => {
            callback([
                { id: 1, title: "Learning JavaScript" },
                { id: 2, title: "Promises Explained" }
            ]);
        }, 1000);
    }

    function getPostComments(postId, callback) {
        setTimeout(() => {
            callback([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Very helpful!" }
            ]);
        }, 1000);
    }

    getUserData(1, function(user){

        console.log("User:", user);

        getUserPosts(user.id, function(posts){

            console.log("Posts:", posts);

            getPostComments(posts[0].id, function(comments){

                console.log("Comments:", comments);

            });

        });

    });


    console.log("===== Exercise 2: Promises =====");

    const myPromise = new Promise((resolve, reject)=>{

        const success = true;

        setTimeout(()=>{

            if(success){
                resolve("It worked!");
            }else{
                reject("Something went wrong.");
            }

        },1000);

    });

    myPromise
        .then(result=>{
            console.log("Success:", result);
        })
        .catch(error=>{
            console.log("Error:", error);
        });

    function getUserDataPromise(userId){

        return new Promise((resolve,reject)=>{

            setTimeout(()=>{

                if(userId > 0){
                    resolve({
                        id:userId,
                        name:"John"
                    });
                }else{
                    reject("Invalid user ID");
                }

            },1000);

        });

    }

    function getUserPostsPromise(userId){

        return new Promise((resolve)=>{

            setTimeout(()=>{

                resolve([
                    {id:1,title:"Learning JavaScript"},
                    {id:2,title:"Promises Explained"}
                ]);

            },1000);

        });

    }

    function getPostCommentsPromise(postId){

        return new Promise((resolve)=>{

            setTimeout(()=>{

                resolve([
                    {id:1,text:"Great post!"},
                    {id:2,text:"Very helpful!"}
                ]);

            },1000);

        });

    }

    getUserDataPromise(1)
        .then(user=>{
            console.log("Promise User:", user);
            return getUserPostsPromise(user.id);
        })
        .then(posts=>{
            console.log("Promise Posts:", posts);
            return getPostCommentsPromise(posts[0].id);
        })
        .then(comments=>{
            console.log("Promise Comments:", comments);
        })
        .catch(error=>{
            console.log(error);
        });

});
