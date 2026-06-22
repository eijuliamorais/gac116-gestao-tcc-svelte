<script>
  import { onMount } from "svelte";
  import { listarDepartamentos, criarDepartamento, atualizarDepartamento, excluirDepartamento } from "../services/departamentosService";
  import { listarUnidades } from "../services/unidadesService";
  import DepartamentoModal from "../components/modals/DepartamentoModal.svelte";
  import DepartamentosTable from "../components/tables/DepartamentosTable.svelte";

  let departamentos = [];
  let unidades = [];
  let busca = "";
  let modalAberto = false;
  let departamentoSelecionado = null;

  async function carregarDados() {
    try {
      departamentos = await listarDepartamentos();
      unidades = await listarUnidades();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(carregarDados);

  function novoDepartamento() {
    departamentoSelecionado = null;
    modalAberto = true;
  }

  function editarDepartamento(event) {
    departamentoSelecionado = event.detail;
    modalAberto = true;
  }

  async function salvarDepartamento(event) {
    try {
      const dados = event.detail;
      if (departamentoSelecionado) {
        await atualizarDepartamento(departamentoSelecionado.id, dados);
      } else {
        await criarDepartamento(dados);
      }
      modalAberto = false;
      departamentoSelecionado = null;
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar departamento.");
    }
  }

  async function removerDepartamento(event) {
    const id = event.detail;
    const confirmar = confirm("Deseja realmente excluir este departamento?");
    if (!confirmar) return;
    try {
      await excluirDepartamento(id);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir departamento.");
    }
  }

  function fecharModal() {
    modalAberto = false;
    departamentoSelecionado = null;
  }

  $: departamentosFiltrados = departamentos.filter(
    dep => 
      dep.nome.toLowerCase().includes(busca.toLowerCase()) ||
      dep.sigla.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <!-- Botão "Novo Departamento" (sem título/descrição duplicados) -->
  <div class="flex justify-end">
    <button
      on:click={novoDepartamento}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo Departamento
    </button>
  </div>

  <div class="card p-5">
    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar departamento por nome ou sigla..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3"
    />
  </div>

  <DepartamentosTable
    departamentos={departamentosFiltrados}
    {unidades}
    on:editar={editarDepartamento}
    on:excluir={removerDepartamento}
  />
</div>

<DepartamentoModal
  open={modalAberto}
  departamento={departamentoSelecionado}
  on:save={salvarDepartamento}
  on:close={fecharModal}
/>