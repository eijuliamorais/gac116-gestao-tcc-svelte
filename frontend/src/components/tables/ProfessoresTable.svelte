<script>
  import { createEventDispatcher } from "svelte";

  export let professores = [];
  export let departamentos = [];

  const dispatch = createEventDispatcher();

  // A lista passa a ser exigida como parâmetro
  function getDepartamentoNome(id, listaDepartamentos) {
    if (!id) return "-";
    const dep = listaDepartamentos.find(d => String(d.id) === String(id));
    return dep ? dep.nome : "Não informado";
  }
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full text-left">
    <thead class="bg-slate-100 border-b border-slate-200 text-slate-700">
      <tr>
        <th class="px-6 py-4">ID</th>
        <th class="px-6 py-4">Nome</th>
        <th class="px-6 py-4">Departamento</th>
        <th class="text-center px-6 py-4">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each professores as professor}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{professor.id}</td>
          <td class="px-6 py-4 font-medium">{professor.nome}</td>
          
          <td class="px-6 py-4">
            {getDepartamentoNome(professor.departamento, departamentos)}
          </td>
          
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button on:click={() => dispatch("editar", professor)} class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300">Editar</button>
              <button on:click={() => dispatch("excluir", professor.id)} class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Excluir</button>
            </div>
          </td>
        </tr>
      {:else}
        <tr><td colspan="4" class="px-6 py-8 text-center text-slate-500">Nenhum professor cadastrado.</td></tr>
      {/each}
    </tbody>
  </table>
</div>