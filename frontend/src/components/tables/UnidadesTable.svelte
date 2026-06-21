<script>
  export let unidades = [];
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full">
    <thead class="bg-slate-100">
      <tr>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">ID</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Nome</th>
      </tr>
    </thead>
    <tbody>
      {#each unidades as unidade}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{unidade.id}</td>
          <td class="px-6 py-4 font-medium">{unidade.nome}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>