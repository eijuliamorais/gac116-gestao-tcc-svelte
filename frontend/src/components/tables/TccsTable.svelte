<script>
  import { createEventDispatcher } from "svelte";

  export let tccs = [];
  export let alunos = [];
  export let professores = [];

  const dispatch = createEventDispatcher();

  function getStatusLabel(status) {
    const map = { "0": "Em Elaboração", "1": "Enviado", "2": "Aprovado", "3": "Reprovado" };
    return map[String(status)] || status;
  }

  function getStatusColor(status) {
    const map = {
      "0": "bg-yellow-100 text-yellow-800",
      "1": "bg-blue-100 text-blue-800",
      "2": "bg-green-100 text-green-800",
      "3": "bg-red-100 text-red-800",
    };
    return map[String(status)] || "bg-gray-100 text-gray-800";
  }

  function getFileName(url) {
    if (!url) return "-";
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  function getAlunoNome(id, listaAlunos) {
    if (!id) return "-";
    const aluno = listaAlunos.find(a => String(a.id) === String(id));
    return aluno ? aluno.nome : `ID: ${id}`;
  }

  function getOrientadorNome(id, listaProfessores) {
    if (!id) return "-";
    const prof = listaProfessores.find(p => String(p.id) === String(id));
    return prof ? prof.nome : `ID: ${id}`;
  }
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full text-left">
    <thead class="bg-slate-100 border-b border-slate-200 text-slate-700">
      <tr>
        <th class="px-6 py-4">ID</th>
        <th class="px-6 py-4">Título</th>
        <th class="px-6 py-4">Aluno</th>
        <th class="px-6 py-4">Orientador</th>
        <th class="px-6 py-4">Status</th>
        <th class="px-6 py-4">Arquivo</th>
        <th class="text-center px-6 py-4">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each tccs as tcc}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
          <td class="px-6 py-4">{tcc.id}</td>
          <td class="px-6 py-4 font-medium max-w-xs truncate" title={tcc.titulo}>{tcc.titulo}</td>
          
          <td class="px-6 py-4">
            {getAlunoNome(tcc.aluno, alunos)}
          </td>
          
          <td class="px-6 py-4">
            {getOrientadorNome(tcc.orientador, professores)}
          </td>
          
          <td class="px-6 py-4">
            <span class="px-2 py-1 rounded-full text-xs font-semibold {getStatusColor(tcc.status)}">
              {getStatusLabel(tcc.status)}
            </span>
          </td>
          
          <td class="px-6 py-4 text-sm">
            {#if tcc.arquivo}
              <a href={tcc.arquivo} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                {getFileName(tcc.arquivo)}
              </a>
            {:else}
              <span class="text-slate-400">-</span>
            {/if}
          </td>
          
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button on:click={() => dispatch("editar", tcc)} class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300">Editar</button>
              <button on:click={() => dispatch("excluir", tcc.id)} class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Excluir</button>
            </div>
          </td>
        </tr>
      {:else}
        <tr><td colspan="7" class="px-6 py-8 text-center text-slate-500">Nenhum TCC cadastrado.</td></tr>
      {/each}
    </tbody>
  </table>
</div>