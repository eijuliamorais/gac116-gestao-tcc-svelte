<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { listarUnidades } from "../../services/unidadesService";

  export let open = false;
  export let departamento = null;

  const dispatch = createEventDispatcher();
  let unidades = [];

  let form = {
    nome: "",
    sigla: "",
    unidade_academica: ""
  };

  onMount(async () => {
    try {
      unidades = await listarUnidades();
    } catch (error) {
      console.error(error);
    }
  });

  $: if (departamento) {
    form = {
      nome: departamento.nome || "",
      sigla: departamento.sigla || "",
      unidade_academica: departamento.unidade_academica || ""
    };
  }

  $: if (!departamento && open) {
    form = {
      nome: "",
      sigla: "",
      unidade_academica: ""
    };
  }

  function salvar() {
    if (!form.nome.trim()) {
      alert("Informe o nome do departamento.");
      return;
    }
    if (!form.sigla.trim()) {
      alert("Informe a sigla do departamento.");
      return;
    }
    if (!form.unidade_academica) {
      alert("Selecione uma unidade acadêmica.");
      return;
    }

    dispatch("save", {
      nome: form.nome,
      sigla: form.sigla,
      unidade_academica: Number(form.unidade_academica)
    });
  }

  function fechar() {
    dispatch("close");
  }
</script>

{#if open}
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-slate-900">
        {departamento ? "Editar Departamento" : "Novo Departamento"}
      </h2>
      <button on:click={fechar} class="text-slate-500 hover:text-slate-900">
        ✕
      </button>
    </div>

    <div class="space-y-5">
      <div>
        <label class="block mb-2 text-sm font-medium text-slate-700">
          Nome do Departamento
        </label>
        <input
          bind:value={form.nome}
          class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-500"
          placeholder="Ex: Departamento de Ciências Exatas"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-slate-700">
            Sigla
          </label>
          <input
            bind:value={form.sigla}
            class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-500"
            placeholder="Ex: DEX"
          />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-slate-700">
            Unidade Acadêmica
          </label>
          <select
            bind:value={form.unidade_academica}
            class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-500 bg-white"
          >
            <option value="">Selecione a unidade</option>
            {#each unidades as unidade}
              <option value={unidade.id}>{unidade.nome}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-8">
      <button on:click={fechar} class="px-5 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50">Cancelar</button>
      <button on:click={salvar} class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800">Salvar</button>
    </div>
  </div>
</div>
{/if}