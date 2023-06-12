<script lang="ts">
  import { onMount } from "svelte";

  export let items: [string, any][] = [];
  export let activeItem;

  let activeIdx: number = 0;
  let oldActiveItem;
  let oldActiveIdx;

  $: {
    if (oldActiveItem !== activeItem) {
      oldActiveItem = activeItem
      activeIdx = items.findIndex(([_, component]) => component === activeItem);
    }

    if (oldActiveIdx !== activeIdx) {
      oldActiveIdx = activeIdx
      activeItem = items[activeIdx][1];
    }
  }

  let elem;
  let isHrWide;

  onMount(() => {
    new IntersectionObserver(([e]) => (isHrWide = e.intersectionRatio < 1), {
      threshold: [1],
    }).observe(elem);
  });
</script>

<div class="container" bind:this={elem}>
  <div class="navigation">
    <div>
      {#if activeIdx > 0}
        <button
          on:click={() => {
            activeIdx--;
          }}>&laquo; {items[activeIdx - 1][0]} &laquo;</button
        >
      {/if}
    </div>
    <div><h4>{items[activeIdx][0]}</h4></div>
    <div>
      {#if activeIdx < items.length - 1}
        <button
          on:click={() => {
            activeIdx++;
          }}>&raquo; {items[activeIdx + 1][0]} &raquo;</button
        >
      {/if}
    </div>
  </div>
  <hr class:wide={isHrWide} />
</div>

<style>
  .container {
    position: sticky;
    top: -1px;
    background-color: var(--background);
    z-index: 1;
  }

  .container > hr {
    transition: margin 0.2s;
    margin: 0 0;
  }
  .container > hr.wide {
    margin: 0 -4em;
  }

  .navigation {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    justify-content: space-between;
    place-items: center;

    user-select: none;
  }

  .navigation > div:nth-child(1) {
    text-align: left;
  }
  .navigation > div:nth-child(3) {
    text-align: right;
  }
</style>
