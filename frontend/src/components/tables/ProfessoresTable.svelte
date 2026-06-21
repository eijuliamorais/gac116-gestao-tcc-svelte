<script>
  import { createEventDispatcher } from "svelte";

  export let professores = [];
  export let departamentos = [];

  const dispatch = createEventDispatcher();

  function getDepartamentoNome(id) {
    const departamento = departamentos.find(d => d.id === id);
    return departamento?.nome || "Não informado";
  }
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full">
    <thead class="bg-slate-100">
      <tr>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">ID</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Nome</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Departamento</th>
        <th class="text-center px-6 py-4 border-b border-slate-200 text-slate-700">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each professores as professor}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{professor.id}</td>
          <td class="px-6 py-4 font-medium">{professor.nome}</td>
          <td class="px-6 py-4">{getDepartamentoNome(professor.departamento)}</td>
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button
                on:click={() => dispatch("editar", professor)}
                class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
              >
                Editar
              </button>
              <button
                on:click={() => dispatch("excluir", professor.id)}
                class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>