<script>
  import { onMount } from "svelte";
  import api from "../services/api";

  /** @type {any[]} */
  let professores = [];

  let busca = "";

  onMount(async () => {
    try {
      const response = await api.get("/professores/");
      professores = response.data;
    } catch (error) {
      console.error(error);
    }
  });

  $: professoresFiltrados = professores.filter((professor) =>
    professor.nome.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-8">

  <div class="flex justify-between items-center">

    <div>

      <h2 class="page-title">
        Professores
      </h2>

      <p class="page-subtitle">
        Gerenciamento de professores orientadores
      </p>

    </div>

    <button
      class="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
    >
      Novo Professor
    </button>

  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div class="card p-6">

      <p class="text-secondary">
        Total de Professores
      </p>

      <h3 class="text-4xl font-bold text-slate-900 mt-2">
        {professores.length}
      </h3>

    </div>

    <div class="card p-6">

      <p class="text-secondary">
        Orientadores Ativos
      </p>

      <h3 class="text-4xl font-bold text-slate-900 mt-2">
        {professores.length}
      </h3>

    </div>

    <div class="card p-6">

      <p class="text-secondary">
        Departamentos
      </p>

      <h3 class="text-4xl font-bold text-slate-900 mt-2">
        --
      </h3>

    </div>

  </div>

  <div class="card p-5">

    <input
      bind:value={busca}
      placeholder="Pesquisar professor..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
    />

  </div>

  <div class="card overflow-hidden">

    <table class="w-full">

      <thead class="bg-slate-100">

        <tr>

          <th class="text-left px-6 py-4 font-semibold text-slate-700">
            ID
          </th>

          <th class="text-left px-6 py-4 font-semibold text-slate-700">
            Nome
          </th>

          <th class="text-left px-6 py-4 font-semibold text-slate-700">
            Email
          </th>

          <th class="text-left px-6 py-4 font-semibold text-slate-700">
            Departamento
          </th>

        </tr>

      </thead>

      <tbody>

        {#each professoresFiltrados as professor}

          <tr class="border-t border-slate-200 hover:bg-slate-50 transition">

            <td class="px-6 py-4 text-slate-700">
              #{professor.id}
            </td>

            <td class="px-6 py-4 font-semibold text-slate-900">
              {professor.nome}
            </td>

            <td class="px-6 py-4 text-slate-700">
              {professor.email}
            </td>

            <td class="px-6 py-4 text-slate-700">
              {professor.departamento}
            </td>

          </tr>

        {/each}

      </tbody>

    </table>

  </div>

</div>