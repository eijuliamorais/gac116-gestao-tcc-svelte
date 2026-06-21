<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let curso = null;

  const dispatch = createEventDispatcher();

  let form = {
    nome: "",
    sigla: "",
    codigo: ""
  };

  $: if (curso) {
    form = {
      nome: curso.nome || "",
      sigla: curso.sigla || "",
      codigo: curso.codigo || ""
    };
  }

  $: if (!curso && open) {
    form = {
      nome: "",
      sigla: "",
      codigo: ""
    };
  }

  function salvar() {
    if (!form.nome.trim()) {
      alert("Informe o nome do curso.");
      return;
    }
    if (!form.sigla.trim()) {
      alert("Informe a sigla do curso.");
      return;
    }
    if (!form.codigo.trim()) {
      alert("Informe o código do curso.");
      return;
    }

    dispatch("save", {
      nome: form.nome,
      sigla: form.sigla,
      codigo: form.codigo
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
        {curso ? "Editar Curso" : "Novo Curso"}
      </h2>
      <button on:click={fechar} class="text-slate-500 hover:text-slate-900">
        ✕
      </button>
    </div>

    <div class="space-y-5">
      <div>
        <label class="block mb-2 text-sm font-medium text-slate-700">
          Nome do Curso
        </label>
        <input
          bind:value={form.nome}
          class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-500"
          placeholder="Ex: Ciência da Computação"
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
            placeholder="Ex: BCC"
          />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-slate-700">
            Código
          </label>
          <input
            bind:value={form.codigo}
            class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-500"
            placeholder="Ex: G010"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-8">
      <button
        on:click={fechar}
        class="px-5 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50"
      >
        Cancelar
      </button>
      <button
        on:click={salvar}
        class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
      >
        Salvar
      </button>
    </div>
  </div>
</div>
{/if}