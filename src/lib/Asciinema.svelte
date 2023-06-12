<script context="module">
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top * 1.05 <= viewHeight &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let path: string;
  export let options = {};
  export let fixed: boolean = false;
  export let loopDelay: number = 2000;

  let defaults = {
    preload: true,
    poster: "npt:10:10",
    autoPlay: true,
  };
  let elem;

  onMount(() => {
    let combinedOpts = { ...defaults, ...options };
    let shouldPlayOnViewport = false;
    if (combinedOpts.autoPlay) {
      combinedOpts.autoPlay = false;
      shouldPlayOnViewport = true;
    }

    let player = window["AsciinemaPlayer"].create(
      "asciinema/recordings/" + path,
      elem,
      combinedOpts
    );

    const onceFn = function () {
      if (!elem) return
      if (isInViewport(elem) && shouldPlayOnViewport) {
        console.debug("Scroll event triggered for " + path);
        document.removeEventListener("scroll", onceFn);
        shouldPlayOnViewport = false;
        player.play();
      }
    };

    setTimeout(() => {
      if (loopDelay) {
        console.debug("Attaching end-listener for " + path);
        player.addEventListener("ended", () => {
          setTimeout(
            () =>
              player.getCurrentTime() == player.getDuration() && player.play(),
            loopDelay
          );
        });
      }

      if (shouldPlayOnViewport) {
        console.debug("Attaching scroll-listener for " + path);
        document.addEventListener("scroll", onceFn, {
          passive: true,
        });
        onceFn();
      }

      return () => {
        document.removeEventListener("scroll", onceFn);
        player.dispose();
      };
    }, 0);
  });
</script>

<div bind:this={elem} class:hover={!fixed} />

<style>
  div.hover {
    transition: transform 0.4s;
    transform: scale(0.97);
    margin: 0 auto;
  }
  div.hover:hover {
    transform: scale(1);
  }
</style>
