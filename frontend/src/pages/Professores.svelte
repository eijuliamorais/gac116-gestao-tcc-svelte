<script>
  import { onMount } from "svelte";
  import { listarProfessores, criarProfessor, atualizarProfessor, excluirProfessor } from "../services/professoresService";
  import { listarDepartamentos } from "../services/departamentosService";
  
  import ProfessorModal from "../components/modals/ProfessorModal.svelte";
  import ProfessoresTable from "../components/tables/ProfessoresTable.svelte";

  let professores = [];
  let departamentos = [];
  let busca = "";

  let modalAberto = false;
  let professorSelecionado = null;

  async function carregarDados() {
    try {
      professores = await listarProfessores();
      departamentos = await listarDepartamentos();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(carregarDados);

  function novoProfessor() {
    professorSelecionado = null;
    modalAberto = true;
  }

  function editarProfessor(event) {
    professorSelecionado = event.detail;
    modalAberto = true;
  }

  async function salvarProfessor(event) {
    try {
      const dados = event.detail;

      if (professorSelecionado) {
        await atualizarProfessor(professorSelecionado.id, dados);
      } else {
        await criarProfessor(dados);
      }

      modalAberto = false;
      professorSelecionado = null;
      await carregarDados();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar professor.");
    }
  }

  async function removerProfessor(event) {
    const id = event.detail;
    const confirmar = confirm("Deseja realmente excluir este professor?");
    
    if (!confirmar) return;

    try {
      await excluirProfessor(id);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir professor.");
    }
  }

  function fecharModal() {
    modalAberto = false;
    professorSelecionado = null;
  }

  $: professoresFiltrados = professores.filter(professor =>
    professor.nome.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <!-- Botão "Novo Professor" (sem título/descrição duplicados) -->
  <div class="flex justify-end">
    <button
      on:click={novoProfessor}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo Professor
    </button>
  </div>

  <!-- Busca -->
  <div class="card p-5">
    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar professor..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3"
    />
  </div>

  <!-- Tabela -->
  <ProfessoresTable 
    professores={professoresFiltrados} 
    {departamentos} 
    on:editar={editarProfessor} 
    on:excluir={removerProfessor} 
  />
</div>

<!-- Modal -->
<ProfessorModal
  open={modalAberto}
  professor={professorSelecionado}
  on:save={salvarProfessor}
  on:close={fecharModal}
/>