let profile = null;
let LastRepos = null
const fetchGitHubRepos = async (username)=>{
    const repo_url = `https://api.github.com/users/${username}/repos`;
    
    try {
        const reposData = await fetch(repo_url);
        const data = await reposData.json();

        if(reposData.status != 200){
            console.error("Error fetching data : ", data.message);
            return null;
        }
        LastRepos = data;
        return data;
    } catch (error) {
        console.log("에러났슈", error);
        return null;
    }
}

const fetchGitHubUserInfo = async (username)=>{
    const base_url = `https://api.github.com/users/${username}`;
    

    try {
        const response = await fetch(base_url);
        const data = await response.json();

        if(response.status !==200){
            console.error("Error fetching data:", data.message);
            return null;
        }
        profile = {
            name : data.name,
            avatar_url: data.avatar_url,
            public_repos: data.public_repos,
            public_gists: data.public_gists,
            followers: data.followers,
            following: data.following,
            company: data.company,           
            location: data.location,         
            blog: data.blog,                 
            created_at: data.created_at
        }
    } catch (error){
        console.log("에러났슈", error);
        return null;
    }
}
$(".myForm").on("submit", function (e) {
    let inputName = $(".searchInput").val()
    e.preventDefault();

    fetchGitHubUserInfo(inputName)
    .then(()=>{
        if(profile){
            console.log('profile: ', profile);
            addProfile(profile);    
        }
    })
    fetchGitHubRepos(inputName)
    .then(data=>{
        if(LastRepos){
            console.log('LastRepos: ', LastRepos);
            addLastRepos(LastRepos);
        }
    })
    
})

fetchGitHubUserInfo('oyeong011')
    .then(()=>{
        if(profile){
            addProfile(profile)
            console.log('profile: ', profile);
        }
    })
fetchGitHubRepos('oyeong011')
    .then(data=>{
        if(LastRepos){
            addLastRepos(LastRepos);
        }
    })



function addProfile(profile){
    $(".profileImg").attr("src", profile.avatar_url);
    
    // public repos의 개수를 가져와서 버튼 텍스트로 설정
    $(".pbRepos").text(`public Repos : ${profile.public_repos}`);
    
    // 다른 정보도 비슷한 방식으로 화면에 표시
    $(".pbGist").text(`public Gists : ${profile.public_gists}`);
    $(".Follower").text(`Followers : ${profile.followers}`);
    $(".Following").text(`Following : ${profile.following}`);
    
    // 추가적인 프로필 정보들도 같은 방식으로 화면에 표시
    $(".company").text(`Company : ${profile.company}`);
    $(".websiteBlog").text(`Blog : ${profile.blog}`);
    $(".location").text(`Location : ${profile.location}`);
    $(".MemberSince").text(`Member Since : ${profile.created_at}`);
}
function sortRepos(LastRepos){
    LastRepos.sort((a,b)=> {
        return new Date(b.pushed_at) - new Date(a.pushed_at);
    })
    return LastRepos;
}

function addLastRepos(LastRepos) { 
    LastRepos = sortRepos(LastRepos);
    console.log('LastRepos: ', LastRepos);
    $(".ReposContainer").remove();
    LastRepos.forEach(element => {
        let reposDiv =
        `<div class="ReposContainer">
            <a href="#">${element.name}</a>
            <div class="button-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn1">Stars : ${element.stargazers_count}</button>
            <button type="button" class="btn btn2">Watchers : ${element.watchers}</button>
            <button type="button" class="btn btn3">Forks : ${element.forks}</button>
            </div>
        </div>`
        $(".FooterContainer").append(reposDiv);
    }); 
}

