const userInfoContainer = document.querySelector('.user-info');


const searchBtn = document.querySelector('.search-button').addEventListener('click', e => {
    const user = document.getElementById('search').value;
    document.querySelector('.user-info').style.visibility = "visible";


    console.log(user);
    fetchUser(user);

    e.preventDefault();
});


function fetchUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // console.log(response.avatar_url);
            if (response.login === undefined) {
                userInfoContainer.innerHTML = `<div class="stats">${username} does not exist!</div>`;
                document.querySelector('.top-repos').style.visibility = "hidden";

            } else {
                document.querySelector('.top-repos').style.visibility = "visible";
                displayData(response.avatar_url, response.login, response.followers, response.public_repos, response.html_url);
                fetch(`https://api.github.com/users/${username}/repos`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => fetchRepos(response));
            }
        })
        .catch((err) => {
            console.log(err);
        });

}

function displayData(avatar, username, followers, repoCount, url) {
    userInfoContainer.innerHTML = `
    <div class="avatar-container">
    <img src=${avatar} class="avatar" width="128px" height="128px"></div>
    <div class="stats">
    <h2 class="username"><a href=${url}>${username}</a></h2>
    <h4 class="followers">${followers} Followers<h4> <h4 class="repo-count">${repoCount} Public repos</h4></div>`;

}


function fetchRepos(response) {
    let repos = response;
    let topRepos = [];
    // console.log(response);
    repos.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    });
    // repos.forEach(repo => {
    //     console.log(repo.stargazers_count);
    // });
    for (let i = 0; i < 4; i++) {
        topRepos.push(`<div class="repo"><h2 class="repo-name"><a href="${repos[i].html_url}">${repos[i].full_name}</a></h2>
        <h4 class="repo-stars">Stars: ${repos[i].stargazers_count}</h4></div>`);
    }

    let topRepoHTML = '';
    topRepos.forEach(repo => {
        topRepoHTML += repo;
    });
    document.querySelector('.top-repos').innerHTML = `<h2>Top Repos (by Star Count):</h2>${topRepoHTML}`;


}