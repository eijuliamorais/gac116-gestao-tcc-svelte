<script>
  import { createEventDispatcher } from "svelte";

  export let tccs = [];

  const dispatch = createEventDispatcher();

  function editar(tcc) {
    dispatch("editar", tcc);
  }

  function excluir(id) {
    dispatch("excluir", id);
  }

  function getStatusLabel(status) {
    const map = {
      0: "Em Elaboração",
      1: "Enviado",
      2: "Aprovado",
      3: "Reprovado",
    };
    return map[status] || status;
  }

  function getStatusColor(status) {
    const map = {
      0: "bg-yellow-100 text-yellow-800",
      1: "bg-blue-100 text-blue-800",
      2: "bg-green-100 text-green-800",
      3: "bg-red-100 text-red-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  }

  function getFileName(url) {
    if (!url) return "-";
    const parts = url.split("/");
    return parts[parts.length - 1];
  }
</script>

<div class="overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-slate-100 text-slate-800">
        <th class="p-3 text-left text-sm font-semibold">ID</th>
        <th class="p-3 text-left text-sm font-semibold">Título</th>
        <th class="p-3 text-left text-sm font-semibold">Aluno</th>
        <th class="p-3 text-left text-sm font-semibold">Orientador</th>
        <th class="p-3 text-left text-sm font-semibold">Status</th>
        <th class="p-3 text-left text-sm font-semibold">Arquivo</th>
        <th class="p-3 text-center text-sm font-semibold">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each tccs as tcc}
        <tr class="border-t border-slate-200 hover:bg-slate-50 transition">
          <td class="p-3 text-sm text-slate-800">{tcc.id}</td>
          <td class="p-3 text-sm text-slate-800 font-medium">{tcc.titulo}</td>
          <td class="p-3 text-sm text-slate-800">
            {tcc.aluno?.nome || tcc.aluno || "-"}
          </td>
          <td class="p-3 text-sm text-slate-800">
            {tcc.orientador?.nome || tcc.orientador || "-"}
          </td>
          <td class="p-3">
            <span
              class="px-2 py-1 rounded-full text-xs font-semibold {getStatusColor(tcc.status)}"
            >
              {getStatusLabel(tcc.status)}
            </span>
          </td>
          <td class="p-3 text-sm text-slate-800">
            {#if tcc.arquivo}
              <a
                href={tcc.arquivo}
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                {getFileName(tcc.arquivo)}
              </a>
            {:else}
              -
            {/if}
          </td>
          <td class="p-3 text-center">
            <button
              on:click={() => editar(tcc)}
              class="text-blue-600 hover:text-blue-800 hover:underline mr-3 text-sm"
            >
              Editar
            </button>
            <button
              on:click={() => excluir(tcc.id)}
              class="text-red-600 hover:text-red-800 hover:underline text-sm"
            >
              Excluir
            </button>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="7" class="p-6 text-center text-slate-500">
            Nenhum TCC cadastrado.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>