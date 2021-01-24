
<script>
    
let _GET = {};
let args = location.search.substr(1).split(/&/);
for (var i=0; i<args.length; ++i) {
    var tmp = args[i].split(/=/);
    if (tmp[0] != "") {
        _GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
    }
}

let title = _GET.title;
let epi = _GET.epi;
async function getName(){
    if(title === undefined || epi === undefined){
        window.location.href = "/";
    }else{
        const res = await fetch('https://raw.githubusercontent.com/mynameispyo/free.webtoon.ga/master/datas.json');
        const data = await res.json();
        return data;
    }
    return null;
}

let loadAPI = getName();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
      body, html{
        overflow-y: hidden;
        overflow-x: hidden;
        height: 100%;
      }
    </style>
</svelte:head>


{#await loadAPI}
<p>...waiting</p>
{:then loadData}
<div class="wt-content" >
    <iframe id="iframes" src={`https://qpo9w6tvvhkbvesizqvshw-on.drv.tw/web/${title}/${epi}/${epi}.html`} title="Load viewer" >Browser not compatible.</iframe>
</div>
<div class="menu-container">
    <a id="middleBtnLink" href={`/menu.html?title=${title}&top=${epi}`}><i class="fa fa-bars btnleft " aria-hidden="true"></i></a>
    <a id="commentBtnLink" href={`/comment.html?title=${title}&epi=${parseInt(epi)}`}><i class="fa fa-commenting-o btnright" aria-hidden="true"></i></a>
    <div class="right-container">
        <a id="leftBtnLink" href={`/view.html?title=${title}&epi=${parseInt(epi) - 1}`}><i class="fa fa-chevron-left btnleft" aria-hidden="true"></i></a>
        <a id="rightBtnLink" href={`/view.html?title=${title}&epi=${parseInt(epi) + 1}`}><i class="fa fa-chevron-right btnright" aria-hidden="true"></i></a>
    </div>
</div>

{:catch error}
<p style="color: red">{error.message}</p>
{/await}


<style>
  
    iframe{
  border: none;
  width: 100%;
  position: absolute;
  margin: none;
  height: calc(100% - 40px);
}


.wt-content{
  width: 100%;
  height: calc(100% - 40px);
}

.menu-container{
  width:600px;
  margin: auto;
  height: 100%;
  margin-top: 5px;
}

.menu-container #middleBtnLink{
  font-size:30px;
  color: black;
  float: left;
  flex: 1;
  margin-left: 10px;
}
.right-container {
  float: right;
}
#leftBtnLink {
  font-size:30px;
  color: black;
  flex: 1;
}
#commentBtnLink {
    font-size:30px;
  color: black;
  margin-left: 10px;
  float: left;
  flex: 1;
  margin-bottom: 3px;
}

#rightBtnLink {
  font-size:30px;
  margin-left: 50px;
  color: black;
  flex: 1;
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .menu-container{
    width:100%;
  }
}

</style>