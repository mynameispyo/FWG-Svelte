<script>
	import Main from "./Main.svelte";
	import Error from "./Error.svelte";
	import Menu from "./Menu.svelte";
	import View from "./View.svelte";
	import Comment from "./Comment.svelte";
	import Faq from "./Faq.svelte";
	const path = window.location.pathname;
</script>

{#if path == "/" }
<Main />
{:else if path =="/menu.html"}
<Menu />
{:else if path == "/view.html"}
<View />
{:else if path == "/comment.html"}
<Comment />
{:else if path == "/faq.html"}
<Faq />
{:else}
<Error />
{/if}

