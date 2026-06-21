<script>
  import { createEventDispatcher } from "svelte";
  
  export let cursos = [];
  
  const dispatch = createEventDispatcher();
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full">
    <thead class="bg-slate-100">
      <tr>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">ID</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Nome</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Sigla</th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">Código</th>
        <th class="text-center px-6 py-4 border-b border-slate-200 text-slate-700">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each cursos as curso}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{curso.id}</td>
          <td class="px-6 py-4 font-medium">{curso.nome}</td>
          <td class="px-6 py-4">{curso.sigla}</td>
          <td class="px-6 py-4">{curso.codigo}</td>
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button
                on:click={() => dispatch("editar", curso)}
                class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
              >
                Editar
              </button>
              <button
                on:click={() => dispatch("excluir", curso.id)}
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