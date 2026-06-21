<script>
  import { onMount } from "svelte";

  import StatCard from "../components/dashboard/StatCard.svelte";
  import StatusChart from "../components/dashboard/StatusChart.svelte";
  import OrientadorChart from "../components/dashboard/OrientadorChart.svelte";

  import { getEstatisticas } from "../services/dashboardService";

  let loading = true;
  let stats = null;

  onMount(async () => {
    try {
      stats = await getEstatisticas();
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  });

  function getStatus(nome) {
    return stats?.por_status?.[nome] || 0;
  }

  // Declaração reativa calcula o máximo automaticamente quando 'stats' muda
  $: maxTccs = stats?.por_orientador 
    ? Math.max(...Object.values(stats.por_orientador), 1) 
    : 1;
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <p class="text-slate-500 font-medium">Carregando dashboard...</p>
  </div>
{:else if stats}
  <div class="space-y-8">
    
    <div>
      <h2 class="text-3xl font-bold text-slate-900">Visão Geral</h2>
      <p class="text-slate-700 mt-1">Estatísticas dos TCCs cadastrados</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard title="Total de TCCs" value={stats.total_geral} />
      <StatCard title="Aprovados" value={getStatus("Aprovado")} />
      <StatCard title="Enviados" value={getStatus("Enviado")} />
      <StatCard title="Em Elaboração" value={getStatus("Em Elaboração")} />
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 class="text-xl font-bold text-slate-900 mb-6">Resumo Geral</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p class="text-slate-500 text-sm">Total de Trabalhos</p>
          <h4 class="text-3xl font-bold text-slate-900 mt-1">{stats.total_geral}</h4>
        </div>
        <div>
          <p class="text-slate-500 text-sm">Orientadores Ativos</p>
          <h4 class="text-3xl font-bold text-slate-900 mt-1">{Object.keys(stats.por_orientador || {}).length}</h4>
        </div>
        <div>
          <p class="text-slate-500 text-sm">Status Diferentes</p>
          <h4 class="text-3xl font-bold text-slate-900 mt-1">{Object.keys(stats.por_status || {}).length}</h4>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <StatusChart dados={stats.por_status || {}} />
      <OrientadorChart dados={stats.por_orientador || {}} />
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 class="text-xl font-bold text-slate-900 mb-6">Detalhamento de Orientadores</h3>
      <div class="space-y-5">
        
        {#each Object.entries(stats.por_orientador || {}) as [nome, quantidade]}
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-slate-800 font-medium">{nome}</span>
              <span class="font-bold text-slate-900">{quantidade}</span>
            </div>
            
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                class="bg-slate-800 h-2.5 rounded-full transition-all duration-500"
                style={`width:${(quantidade / maxTccs) * 100}%`}
              ></div>
            </div>
          </div>
        {/each}
        
      </div>
    </div>

  </div>
{/if}