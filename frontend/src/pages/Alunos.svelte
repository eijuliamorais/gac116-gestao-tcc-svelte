<script>
  import { onMount } from "svelte";
  import api from "../services/api";

  /**
     * @type {any[]}
     */
  let alunos = [];
  let busca = "";

  onMount(async () => {
    const response = await api.get("/alunos/");
    alunos = response.data;
  });

  $: alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="max-w-7xl mx-auto p-8">

  <div class="flex justify-between items-center mb-8">

    <div>
      <h1 class="text-4xl font-bold text-slate-900">
        Alunos
      </h1>

      <p class="text-slate-500 mt-1">
        Gerenciamento de alunos
      </p>
    </div>

    <button
      class="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800"
    >
      Novo Aluno
    </button>

  </div>

  <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">

    <input
      bind:value={busca}
      placeholder="Pesquisar aluno..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3"
    />

  </div>

  <div class="bg-white rounded-2xl shadow-sm overflow-hidden">

    <table class="w-full">

      <thead class="bg-slate-50">

        <tr>
          <th class="text-left px-6 py-4">ID</th>
          <th class="text-left px-6 py-4">Nome</th>
          <th class="text-left px-6 py-4">Matrícula</th>
          <th class="text-left px-6 py-4">Curso</th>
        </tr>

      </thead>

      <tbody>

        {#each alunosFiltrados as aluno}

          <tr class="border-t hover:bg-slate-50">

            <td class="px-6 py-4">
              #{aluno.id}
            </td>

            <td class="px-6 py-4 font-medium">
              {aluno.nome}
            </td>

            <td class="px-6 py-4">
              {aluno.matricula}
            </td>

            <td class="px-6 py-4">
              {aluno.curso}
            </td>

          </tr>

        {/each}

      </tbody>

    </table>

  </div>

</div>