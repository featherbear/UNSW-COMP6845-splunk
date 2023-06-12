<script lang="ts">
  export let id: string;
  export let title: string = "YouTube Video";
  export let aspectRatio: string = "16/9"
</script>

<iframe
  src="https://www.youtube.com/embed/{id}"
  style="aspect-ratio: {aspectRatio};"
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
/>

<style>
    iframe {
        width: 100%;
    }
</style>