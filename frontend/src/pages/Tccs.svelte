<script>
  import { onMount } from "svelte";
  import {
    listarTccs,
    criarTcc,
    atualizarTcc,
    excluirTcc,
  } from "../services/tccsService";
  import TccsTable from "../components/tables/TccsTable.svelte";
  import TccModal from "../components/modals/TccModal.svelte";

  let tccs = [];
  let busca = "";
  let modalAberto = false;
  let tccSelecionado = null;

  async function carregarDados() {
    try {
      tccs = await listarTccs();
    } catch (error) {
      console.error("Erro ao carregar TCCs:", error);
    }
  }

  onMount(carregarDados);

  function novoTcc() {
    tccSelecionado = null;
    modalAberto = true;
  }

  function editarTcc(event) {
    tccSelecionado = event.detail;
    modalAberto = true;
  }

  async function salvarTcc(event) {
    try {
      const formData = event.detail; // O modal emite o FormData
      if (tccSelecionado) {
        await atualizarTcc(tccSelecionado.id, formData);
      } else {
        await criarTcc(formData);
      }
      modalAberto = false;
      tccSelecionado = null;
      await carregarDados();
    } catch (error) {
      console.error("Erro ao salvar TCC:", error);
      alert("Erro ao salvar TCC. Verifique os dados e tente novamente.");
    }
  }

  async function removerTcc(event) {
    const id = event.detail;
    const confirmar = confirm("Deseja realmente excluir este TCC?");
    if (!confirmar) return;

    try {
      await excluirTcc(id);
      await carregarDados();
    } catch (error) {
      console.error("Erro ao excluir TCC:", error);
      alert("Erro ao excluir TCC.");
    }
  }

  function fecharModal() {
    modalAberto = false;
    tccSelecionado = null;
  }

  // Filtra por título ou nome do aluno
  $: tccsFiltrados = tccs.filter(
    (tcc) =>
      tcc.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      (tcc.aluno?.nome || "").toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-3xl font-bold text-slate-900">TCCs</h2>
      <p class="text-slate-700">
        Gerenciamento de Trabalhos de Conclusão de Curso
      </p>
    </div>
    <button
      on:click={novoTcc}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo TCC
    </button>
  </div>

  <!-- Busca -->
  <div class="card p-5">
    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar TCC por título ou nome do aluno..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
    />
  </div>

  <!-- Tabela -->
  <TccsTable
    tccs={tccsFiltrados}
    on:editar={editarTcc}
    on:excluir={removerTcc}
  />
</div>

<!-- Modal -->
<TccModal
  open={modalAberto}
  tcc={tccSelecionado}
  on:save={salvarTcc}
  on:close={fecharModal}
/>