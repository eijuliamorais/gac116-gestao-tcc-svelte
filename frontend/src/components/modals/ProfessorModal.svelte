<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { listarDepartamentos } from "../../services/departamentosService";

  export let open = false;
  export let professor = null;

  const dispatch = createEventDispatcher();

  let departamentos = [];

  let form = {
    nome: "",
    departamento: ""
  };

  onMount(async () => {
    try {
      departamentos = await listarDepartamentos();
    } catch (error) {
      console.error(error);
    }
  });

  $: if (professor) {
    form = {
      nome: professor.nome || "",
      departamento: professor.departamento || ""
    };
  }

  $: if (!professor && open) {
    form = {
      nome: "",
      departamento: ""
    };
  }

  function salvar() {
    if (!form.nome.trim()) {
      alert("Informe o nome do professor.");
      return;
    }

    if (!form.departamento) {
      alert("Selecione um departamento.");
      return;
    }

    dispatch("save", {
      nome: form.nome,
      departamento: Number(form.departamento)
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
        {professor ? "Editar Professor" : "Novo Professor"}
      </h2>

      <button
        on:click={fechar}
        class="text-slate-500 hover:text-slate-900"
      >
        ✕
      </button>

    </div>

    <div class="space-y-5">

      <div>

        <label class="block mb-2 text-sm font-medium text-slate-700">
          Nome
        </label>

        <input
          bind:value={form.nome}
          class="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

      </div>

      <div>

        <label class="block mb-2 text-sm font-medium text-slate-700">
          Departamento
        </label>

        <select
          bind:value={form.departamento}
          class="w-full border border-slate-300 rounded-xl px-4 py-3"
        >

          <option value="">
            Selecione um departamento
          </option>

          {#each departamentos as departamento}

            <option value={departamento.id}>
              {departamento.nome}
            </option>

          {/each}

        </select>

      </div>

    </div>

    <div class="flex justify-end gap-3 mt-8">

      <button
        on:click={fechar}
        class="px-5 py-3 border border-slate-300 rounded-xl"
      >
        Cancelar
      </button>

      <button
        on:click={salvar}
        class="px-5 py-3 bg-slate-900 text-white rounded-xl"
      >
        Salvar
      </button>

    </div>

  </div>

</div>

{/if}