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
            displayData(response.avatar_url, response.login, response.followers, response.public_repos, response.hmtl_url)
        })
        .catch((err) => {
            console.log(err);
        });
}

function displayData(avatar, username, followers, repoCount, url) {
    userInfoContainer.innerHTML = `
    <h2><a href=${url}>${username}</a></h2>
    <img src="${avatar} class="avatar" width="128px" height="128px">
    <h4>${followers} followers<h4> <h4>${repoCount} public repos</h4>`;

}


