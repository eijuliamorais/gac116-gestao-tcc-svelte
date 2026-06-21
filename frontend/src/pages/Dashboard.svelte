<script>
  import { onMount } from "svelte";

  import StatCard from "../components/dashboard/StatCard.svelte";

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
</script>

{#if loading}

  <div class="text-center py-10">
    Carregando dashboard...
  </div>

{:else}

  <div class="space-y-8">

    <div>

      <h2 class="text-2xl font-bold text-slate-900">
        Visão Geral
      </h2>

      <p class="text-slate-500">
        Estatísticas dos TCCs cadastrados
      </p>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total de TCCs"
        value={stats.total_geral}
      />

      <StatCard
        title="Aprovados"
        value={getStatus("Aprovado")}
      />

      <StatCard
        title="Enviados"
        value={getStatus("Enviado")}
      />

      <StatCard
        title="Em Elaboração"
        value={getStatus("Em Elaboração")}
      />

    </div>

    <div class="bg-white rounded-2xl shadow-sm p-6">

      <h3 class="text-xl font-semibold mb-4">
        Orientadores
      </h3>

      <div class="space-y-3">

        {#each Object.entries(stats.por_orientador || {}) as [nome, quantidade]}

          <div class="flex justify-between border-b pb-2">

            <span>{nome}</span>

            <span class="font-semibold">
              {quantidade}
            </span>

          </div>

        {/each}

      </div>

    </div>

  </div>

{/if}