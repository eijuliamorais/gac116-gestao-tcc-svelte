<script>
  import { onMount } from "svelte";
  import { listarAlunos, criarAluno, atualizarAluno, excluirAluno } from "../services/alunosService";
  import { listarCursos } from "../services/cursosService";
  import AlunosTable from "../components/tables/AlunosTable.svelte";
  import AlunoModal from "../components/modals/AlunoModal.svelte";

  let alunos = [];
  let cursos = [];
  let busca = "";
  let modalAberto = false;
  let alunoSelecionado = null;

  async function carregarAlunos() {
    try {
      alunos = await listarAlunos();
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  }

  async function carregarCursos() {
    try {
      cursos = await listarCursos();
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // Carrega ambos ao montar
  onMount(async () => {
    await Promise.all([carregarAlunos(), carregarCursos()]);
  });

  function novoAluno() {
    alunoSelecionado = null;
    modalAberto = true;
  }

  function editarAluno(event) {
    alunoSelecionado = event.detail;
    modalAberto = true;
  }

  async function salvarAluno(event) {
    try {
      const dados = event.detail;
      if (alunoSelecionado) {
        await atualizarAluno(alunoSelecionado.id, dados);
      } else {
        await criarAluno(dados);
      }
      modalAberto = false;
      alunoSelecionado = null;
      await carregarAlunos(); // recarrega a lista
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      alert("Erro ao salvar aluno. Verifique os dados e tente novamente.");
    }
  }

  async function removerAluno(event) {
    const id = event.detail;
    const confirmar = confirm("Deseja realmente excluir este aluno?");
    if (!confirmar) return;

    try {
      await excluirAluno(id);
      await carregarAlunos();
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      alert("Erro ao excluir aluno.");
    }
  }

  function fecharModal() {
    modalAberto = false;
    alunoSelecionado = null;
  }

  // Filtro por nome ou matrícula
  $: alunosFiltrados = alunos.filter(
    aluno =>
      aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.matricula.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-3xl font-bold text-slate-900">Alunos</h2>
      <p class="text-slate-700">Gerenciamento de alunos</p>
    </div>
    <button
      on:click={novoAluno}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo Aluno
    </button>
  </div>

  <!-- Busca -->
  <div class="card p-5">
    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar aluno por nome ou matrícula..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
    />
  </div>

  <!-- Tabela -->
  <AlunosTable
    alunos={alunosFiltrados}
    cursos={cursos}
    on:editar={editarAluno}
    on:excluir={removerAluno}
  />
</div>

<!-- Modal -->
<AlunoModal
  open={modalAberto}
  aluno={alunoSelecionado}
  on:save={salvarAluno}
  on:close={fecharModal}
/>