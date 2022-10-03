const searchBtn = document.querySelector('.search-button').addEventListener('click', e => {
    const user = document.getElementById('search').value;
    console.log(user);
    fetchUser(user);

    e.preventDefault();
});
const userInfoContainer = document.querySelector('.user-info');


function fetchUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // console.log(response.avatar_url);
            if (response.login === undefined) {
                userInfoContainer.innerHTML = `<div class="stats">${username} does not exist!</div>`;
            } else {
                displayData(response.avatar_url, response.login, response.followers, response.public_repos, response.html_url);
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


