<script>
  export let title = "";
  export let value = 0;
  export let color = "slate";
</script>

<div class={`rounded-2xl p-6 shadow-md border bg-white`}>

  <p class="text-slate-600 text-sm font-medium">
    {title}
  </p>

  <h3 class="text-4xl font-bold text-slate-900 mt-3">
    {value}
  </h3>

</div>