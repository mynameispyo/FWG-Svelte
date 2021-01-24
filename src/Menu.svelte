<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<script>
let save_price;

let _GET = {};
let args= location.search.substr(1).split(/&/);
let range;


for (var i=0; i<args.length; ++i) {
    var tmp = args[i].split(/=/);
    if (tmp[0] != "") {
        _GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
    }
}



async function getName(){
      const res = await fetch('https://raw.githubusercontent.com/mynameispyo/free.webtoon.ga/master/datas.json');
      const data = await res.json();
      
      if (data.webtoon.titles.indexOf(_GET.title) === -1){
            window.location.href = "/404.html"
        }


        range = [];
        console.log(data.webtoon.epi[_GET["title"]].start);
        for (let i = data.webtoon.epi[_GET["title"]].start; i <= data.webtoon.epi[_GET["title"]].end; i++) {
            range.push(i);
        }
        
        save_price = data.webtoon.epi[_GET["title"]].save_price;
        while (/(\d+)(\d{3})/.test(save_price)){
            save_price = save_price.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }

      return data
}

let loadAPI = getName();
</script>

<header>
    <a href="/">Home <i class="fa fa-home" aria-hidden="true"></i></a>
</header>
{#await loadAPI}
<p>...waiting</p>
{:then loadData}
    <div class="wt-intro">
        <img id="title-img" src={'https://qpo9w6tvvhkbvesizqvshw-on.drv.tw/web/'+_GET.title+'/'+_GET.title+'.jpg'} alt={_GET.title+'.jpg'}>
        <div class="wt-intro-text">
            <h1 class="korean-font" id="title" >{loadData.webtoon.korean[_GET["title"]]}</h1>
            <br>
            <br>
            <p class="sub-title korean-font">{save_price}원을 무료로!!!</p>
        </div>
        </div>
        <div class="main">
        <div class="button-container">
            <button onclick="toTop()" id="scroll-up-btn" title="Go to top"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button onclick="toBottom()" id="scroll-down-btn" title="Go to down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
        <ul id="wt-tiltes">
            {#each range as i}
                <li id={i}> 
                    <a href={'/view.html?title='+_GET["title"]+'&epi='+i}>{i} 화</a>
                </li>
            {/each}
        </ul>
    </div>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');
h1, p, a{
  font-family: 'Montserrat', sans-serif;
}
.korean-font{
  font-family: 'Nanum Gothic';
}

li {
  padding: 10px;
  border-bottom-color: black;
}
ul{
  list-style-type: none;
}
header {
  padding: 10px;
  padding-left: 20px;
}

#title{
  font-size: 32px;
  color: #00cc99;
  margin: 0px 0px 0px 0px;
  float:left;
}
.wt-intro{
  margin-left: 60px;
  display: inline-block;
}
.wt-intro-text{
  float: right;
  margin-left: 10px;
}
#title-img {
  width: 100px;
  float:left;
  border-radius: 10%;
}

.main a{
  color: black;
  text-decoration: none; 
}

.main a:hover {
  text-decoration: underline;
}
.main a:visited{
  color: gray;
}

header a{
  text-decoration: none;
  font-size:20px;
  padding-right:15px;
  color: #00cc99;
}

header{
  margin-bottom: 10px;
}

#scroll-up-btn {
  position: fixed;
  bottom: 75px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #00cc99;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}

#scroll-down-btn {
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #00cc99;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}

#scroll-down-btn:hover, #scroll-up-btn:hover {
  background-color: #555;
}
</style>