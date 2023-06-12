<script lang="ts">
  import GettingStarted from "./sections/01-getting-started.svx";
  import LicenseNote from "./sections/02-license-note.svx";
  import LogContexts from "./sections/03-log-contexts.svx";
  import LogSplitting from "./sections/04-log-splitting.svx";
  import LogIngestion from "./sections/05-log-ingestion.svx";
  import FieldExtraction from "./sections/06-field-extraction.svx";
  import IntroSearching from "./sections/07-intro-searching.svx";
  import Hunting from "./sections/08-hunting.svx";
  import BossOfTheSOC from "./sections/09-boss-of-the-soc.svx";
  import AWSFlowLogs from "./sections/10-aws-vpc-flow-logs.svx";
  import Timelining from "./sections/11-timelining.svx";
  
  import Exercise from "./sections/exercise.svx";
  import Troubleshooting from "./sections/troubleshooting.svx";

  import Header from "./sections/header.svx";

  import Navbar from "./lib/Navbar.svelte";

  let showAll = false;

  let items = [
    ["Getting Started", GettingStarted],
    ["License Note", LicenseNote],
    ["Log Contexts", LogContexts],
    ["Log Splitting", LogSplitting],
    ["Log Ingestion", LogIngestion],
    ["Field Extraction", FieldExtraction],
    ["Introduction to Searching", IntroSearching],
    ["Hunting", Hunting],
    ["BotS (1)", BossOfTheSOC],
    ["BotS (2)", AWSFlowLogs],
    ["Timelining", Timelining],
    ["Exercise", Exercise],
    ["Troubleshooting", Troubleshooting],
  ] satisfies [string, any][];

  let activeItem = GettingStarted;
  function onHashChange() {
    showAll = location.hash == "#all";
    activeItem = items[Number(location.hash.slice(1))]?.[1] || GettingStarted;
  }

  onHashChange();
  $: !showAll &&
    (location.hash = String(
      items.findIndex(([_, elem]) => elem === activeItem)
    ));

  let containerElem: HTMLElement;
  let componentRef;
  let firstRun = true;
  $: if (componentRef && containerElem) {
    containerElem.querySelectorAll("blockquote").forEach((elem) => {
      if (elem.textContent.startsWith("$> ")) {
        elem.style.userSelect = "none";
        elem.style.setProperty("--leftLineColour", "#21b0d7");
      }
      if (elem.textContent.startsWith("splunk> ")) {
        elem.style.userSelect = "none";
        elem.style.setProperty("--leftLineColour", "#5cbf5c");
      }
    });

    if (!showAll) {
      if (firstRun) {
        firstRun = false;
      } else {
        setTimeout(() => window.scrollTo(0, containerElem.offsetTop - 50), 0);
      }
    }
  }
</script>

<svelte:window on:hashchange={onHashChange} />
<Header />
<hr />

{#if showAll}
  {#each items as [_, component]}
    <svelte:component this={component} />
  {/each}
{:else}
  <Navbar {items} bind:activeItem />

  <main bind:this={containerElem}>
    <svelte:component this={activeItem} bind:this={componentRef} />
  </main>
{/if}

<style>
  main {
    min-height: 100vh;
  }
</style>
