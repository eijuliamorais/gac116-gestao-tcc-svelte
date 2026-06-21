<script>
  import { createEventDispatcher } from "svelte";

  export let alunos = [];

  const dispatch = createEventDispatcher();

  function editar(aluno) {
    dispatch("editar", aluno);
  }

  function excluir(id) {
    dispatch("excluir", id);
  }
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full">
    <thead class="bg-slate-100">
      <tr>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">
          ID
        </th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">
          Nome
        </th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">
          Matrícula
        </th>
        <th class="text-left px-6 py-4 border-b border-slate-200 text-slate-700">
          Curso
        </th>
        <th class="text-center px-6 py-4 border-b border-slate-200 text-slate-700">
          Ações
        </th>
      </tr>
    </thead>
    <tbody>
      {#each alunos as aluno}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{aluno.id}</td>
          <td class="px-6 py-4 font-medium">{aluno.nome}</td>
          <td class="px-6 py-4">{aluno.matricula}</td>
          <td class="px-6 py-4">
            {aluno.curso?.nome || aluno.curso || "-"}
          </td>
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button
                on:click={() => editar(aluno)}
                class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
              >
                Editar
              </button>
              <button
                on:click={() => excluir(aluno.id)}
                class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="5" class="px-6 py-4 text-center text-slate-500">
            Nenhum aluno cadastrado.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>