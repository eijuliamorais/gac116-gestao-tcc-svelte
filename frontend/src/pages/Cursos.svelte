<script>
  import { onMount } from "svelte";
  import { listarCursos, criarCurso, atualizarCurso, excluirCurso } from "../services/cursosService";
  import CursoModal from "../components/modals/CursoModal.svelte";
  import CursosTable from "../components/tables/CursosTable.svelte";

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

  function editarCurso(event) {
    cursoSelecionado = event.detail;
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

  async function removerCurso(event) {
    const id = event.detail;
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
    <button on:click={novoCurso} class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition">
      Novo Curso
    </button>
  </div>

  <div class="card p-5">
    <input bind:value={busca} type="text" placeholder="Pesquisar curso por nome, sigla ou código..." class="w-full border border-slate-300 rounded-xl px-4 py-3" />
  </div>

  <CursosTable 
    cursos={cursosFiltrados} 
    on:editar={editarCurso} 
    on:excluir={removerCurso} 
  />
</div>

<CursoModal open={modalAberto} curso={cursoSelecionado} on:save={salvarCurso} on:close={fecharModal} />