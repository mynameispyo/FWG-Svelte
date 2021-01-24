<svelte:head>
    <title>완결된 유로 웹툰 무료보기 | free.webtoon.ga</title>
</svelte:head>

<script>
let WebtoonData = "";

async function getName(){
      const res = await fetch('https://raw.githubusercontent.com/mynameispyo/free.webtoon.ga/master/datas.json');
      const data = await res.json();
      WebtoonData = data;
      return WebtoonData
}

let loadAPI = getName();
function loadTo(url){
  window.location.href = url;
}

function searchWt() { 
    let input = document.getElementById('searchBar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('wt'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="block";                  
        } 
    } 
} 

</script>

<header>
    <h1 class="korean-font" id="title">완결된 유로 웹툰 무료보기</h1>
    <h3 class="korean-font" id="subtitle">추적X, 광고X, 유료X <a href="faq.html">자세하게 보기</a></h3>
    <input on:keyup={searchWt} id="searchBar" placeholder="검색...">
</header>
    <div class="wt-container" id="wt-container"  >
    {#await loadAPI}
        <p>...waiting</p>
    {:then loadData}
        {#each loadData.webtoon.titles as name}
        <div class="wt">
            <a href={'/menu.html?title='+name}>
            <img src={`https://qpo9w6tvvhkbvesizqvshw-on.drv.tw/web/${name}/${name}.jpg`} alt={name}>
            <p class="korean-font text">{loadData.webtoon.korean[name]}</p>
            </a>
        </div>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
    </div>


    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');

.wt-container a{
  color: black;
  text-decoration: none; 
}


h1, h3, p{
  font-family: 'Montserrat', sans-serif;
}
.korean-font{
  font-family: 'Nanum Gothic';
}
h1, h3{
  color: #00cc99;
}

#title{
  margin-left: 10px;
}

#subtitle{
margin-left: 10px;
}

#searchBar{
  margin: 10px;
}

.wt-container {
  display: flex;
  flex-wrap: wrap;
}

.wt-container  div {
  font-size: 20px;
  text-align: center;
}

.wt-container  img{
  border-radius: 10%;
}
.wt-container  p{
  margin: 0px;
}
@media only screen and (min-width: 600px) {
  .wt-container > div {
    width: 200px;
    height: 300px;
  }
  .wt-container  img{
    width: 200px;
  }
}

@media only screen and (max-width: 600px) {
  .wt-container > div {
    width: calc(100% * 0.33333);
    padding-bottom: 40px;
  }
  .wt-container  img{
    width: 100%;
  }
}

    </style>