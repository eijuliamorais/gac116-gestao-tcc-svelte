<script>
  import { onMount } from "svelte";
  import { listarUnidades } from "../services/unidadesService";
  import UnidadesTable from "../components/tables/UnidadesTable.svelte";

  let unidades = [];
  let busca = "";

  async function carregarDados() {
    try {
      unidades = await listarUnidades();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(carregarDados);

  $: unidadesFiltradas = unidades.filter(uni =>
    uni.nome.toLowerCase().includes(busca.toLowerCase())
  );
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-3xl font-bold text-slate-900">Unidades Acadêmicas</h2>
      <p class="text-slate-700">Visualização de unidades acadêmicas</p>
    </div>
  </div>

  <div class="card p-5">
    <input bind:value={busca} type="text" placeholder="Pesquisar unidade por nome..." class="w-full border border-slate-300 rounded-xl px-4 py-3" />
  </div>

  <UnidadesTable unidades={unidadesFiltradas} />
</div>