<script lang="ts">
    export let colour: string = 'white';
    export let background: string;
</script>

<span style="--fgColour: {colour}; --bgColour: {background}"><slot /></span>

<style>
    span {
        font-size: 0.9rem;
        padding: 0px 0.4rem;
        color: var(--fgColour);
        background-color: var(--bgColour);
        border-radius: 1em;
        border: 1px solid var(--bgColour);
    }
</style>