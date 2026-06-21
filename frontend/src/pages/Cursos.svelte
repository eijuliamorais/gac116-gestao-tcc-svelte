<script>
  import { onMount } from "svelte";

  import {
    listarCursos,
    criarCurso,
    atualizarCurso,
    excluirCurso
  } from "../services/cursosService";

  import CursoModal from "../components/modals/CursoModal.svelte";

  let cursos = [];
  let busca = "";

  let modalAberto = false;
  let cursoSelecionado = null;

  async function carregarDados() {
    try {
      cursos = await listarCursos();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(carregarDados);

  function novoCurso() {
    cursoSelecionado = null;
    modalAberto = true;
  }

  function editarCurso(curso) {
    cursoSelecionado = curso;
    modalAberto = true;
  }

  async function salvarCurso(event) {
    try {
      const dados = event.detail;

      if (cursoSelecionado) {
        await atualizarCurso(cursoSelecionado.id, dados);
      } else {
        await criarCurso(dados);
      }

      modalAberto = false;
      cursoSelecionado = null;
      await carregarDados();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar curso.");
    }
  }

  async function removerCurso(id) {
    const confirmar = confirm("Deseja realmente excluir este curso?");
    if (!confirmar) return;

    try {
      await excluirCurso(id);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir curso.");
    }
  }

  function fecharModal() {
    modalAberto = false;
    cursoSelecionado = null;
  }

  $: cursosFiltrados = cursos.filter(
    curso =>
      curso.nome.toLowerCase().includes(busca.toLowerCase()) ||
      curso.sigla.toLowerCase().includes(busca.toLowerCase()) ||
      curso.codigo.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-3xl font-bold text-slate-900">Cursos</h2>
      <p class="text-slate-700">Gerenciamento de cursos</p>
    </div>
    <button
      on:click={novoCurso}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo Curso
    </button>
  </div>

  <div class="card p-5">
    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar curso por nome, sigla ou código..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3"
    />
  </div>

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
        {#each cursosFiltrados as curso}
          <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800">
            <td class="px-6 py-4">{curso.id}</td>
            <td class="px-6 py-4 font-medium">{curso.nome}</td>
            <td class="px-6 py-4">{curso.sigla}</td>
            <td class="px-6 py-4">{curso.codigo}</td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-2">
                <button
                  on:click={() => editarCurso(curso)}
                  class="px-3 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
                >
                  Editar
                </button>
                <button
                  on:click={() => removerCurso(curso.id)}
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
</div>

<CursoModal
  open={modalAberto}
  curso={cursoSelecionado}
  on:save={salvarCurso}
  on:close={fecharModal}
/>