let profile = null; 

const fetchGitHubUserInfo = async (username, token = null)=>{
    const base_url = `https://api.github.com/users/${username}`;
    const headers = {
        'Authorization' : `token ${token}`
    };

    try {
        const response = await fetch(base_url, {headers : headers});
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
        return profile;
    } catch (error){
        console.log("에러났슈", error);
        return null;
    }
}
$(".myForm").on("submit", function (e) {
    e.preventDefault();  
    fetchGitHubUserInfo($(".searchInput").val(), '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')
    .then(data=>{
    if(data){
        addProfile(profile)    }
    }
    )
})

fetchGitHubUserInfo('LeeMinJii', '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')
    .then(data=>{
    if(data){
        console.log(profile)
        addProfile(profile)
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
    $(".MemberSince").text(`Member Since : ${profile.created_at.slice(0,10)}`);
}