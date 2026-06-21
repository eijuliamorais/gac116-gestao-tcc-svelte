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

<div class="overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-slate-100 text-slate-800">
        <th class="p-3 text-left text-sm font-semibold">ID</th>
        <th class="p-3 text-left text-sm font-semibold">Nome</th>
        <th class="p-3 text-left text-sm font-semibold">Matrícula</th>
        <th class="p-3 text-left text-sm font-semibold">Curso</th>
        <th class="p-3 text-center text-sm font-semibold">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each alunos as aluno}
        <tr class="border-t border-slate-200 hover:bg-slate-50 transition">
          <td class="p-3 text-sm text-slate-800">{aluno.id}</td>
          <td class="p-3 text-sm text-slate-800">{aluno.nome}</td>
          <td class="p-3 text-sm text-slate-800">{aluno.matricula}</td>
          <td class="p-3 text-sm text-slate-800">
            {aluno.curso?.nome || aluno.curso || "-"}
          </td>
          <td class="p-3 text-center">
            <button
              on:click={() => editar(aluno)}
              class="text-blue-600 hover:text-blue-800 hover:underline mr-3 text-sm"
            >
              Editar
            </button>
            <button
              on:click={() => excluir(aluno.id)}
              class="text-red-600 hover:text-red-800 hover:underline text-sm"
            >
              Excluir
            </button>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="5" class="p-6 text-center text-slate-500">
            Nenhum aluno cadastrado.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>