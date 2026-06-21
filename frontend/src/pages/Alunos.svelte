<script>
  import { onMount } from "svelte";
  import api from "../services/api";

  let alunos = [];
  let cursos = {};
  let busca = "";

  onMount(async () => {
    try {
      const [alunosResponse, cursosResponse] = await Promise.all([
        api.get("/alunos/"),
        api.get("/cursos/")
      ]);

      alunos = alunosResponse.data;

      cursosResponse.data.forEach((curso) => {
        cursos[curso.id] = curso.nome;
      });

    } catch (error) {
      console.error(error);
    }
  });

  $: alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">

  <div class="flex justify-between items-center">

    <div>

      <h2 class="text-4xl font-bold text-slate-900">
        Alunos
      </h2>

      <p class="text-slate-700 mt-2">
        Gerenciamento de alunos cadastrados
      </p>

    </div>

    <button
      class="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
    >
      Novo Aluno
    </button>

  </div>

  <div class="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

    <input
      bind:value={busca}
      placeholder="Pesquisar aluno..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
    />

  </div>

  <div class="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

    <div class="px-6 py-4 border-b border-slate-200">

      <h3 class="text-lg font-semibold text-slate-900">
        Lista de Alunos
      </h3>

      <p class="text-slate-600 text-sm mt-1">
        Total: {alunosFiltrados.length}
      </p>

    </div>

    <table class="w-full">

      <thead class="bg-slate-50">

        <tr>

          <th class="text-left px-6 py-4 text-slate-700 font-semibold">
            ID
          </th>

          <th class="text-left px-6 py-4 text-slate-700 font-semibold">
            Nome
          </th>

          <th class="text-left px-6 py-4 text-slate-700 font-semibold">
            Matrícula
          </th>

          <th class="text-left px-6 py-4 text-slate-700 font-semibold">
            Curso
          </th>

        </tr>

      </thead>

      <tbody>

        {#each alunosFiltrados as aluno}

          <tr class="border-t border-slate-200 hover:bg-slate-50 transition">

            <td class="px-6 py-4 text-slate-800">
              #{aluno.id}
            </td>

            <td class="px-6 py-4 font-semibold text-slate-900">
              {aluno.nome}
            </td>

            <td class="px-6 py-4 text-slate-800">
              {aluno.matricula}
            </td>

            <td class="px-6 py-4 text-slate-800">
              {cursos[aluno.curso] || `Curso ${aluno.curso}`}
            </td>

          </tr>

        {/each}

      </tbody>

    </table>

  </div>

</div>