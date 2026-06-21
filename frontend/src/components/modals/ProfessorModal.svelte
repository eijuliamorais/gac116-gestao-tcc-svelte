<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let professor = null;

  const dispatch = createEventDispatcher();

  let form = {
    nome: "",
    email: "",
    departamento: ""
  };

  $: if (professor) {
    form = {
      nome: professor.nome || "",
      email: professor.email || "",
      departamento: professor.departamento || ""
    };
  }

  function fechar() {
    dispatch("close");
  }

  function salvar() {
    dispatch("save", form);
  }
</script>

{#if open}

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div class="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">

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

    <div class="space-y-4">

      <div>

        <label class="block text-sm font-medium text-slate-700 mb-2">
          Nome
        </label>

        <input
          bind:value={form.nome}
          class="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

      </div>

      <div>

        <label class="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>

        <input
          bind:value={form.email}
          class="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

      </div>

      <div>

        <label class="block text-sm font-medium text-slate-700 mb-2">
          Departamento
        </label>

        <input
          bind:value={form.departamento}
          class="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

      </div>

    </div>

    <div class="flex justify-end gap-3 mt-8">

      <button
        on:click={fechar}
        class="px-5 py-3 rounded-xl border border-slate-300"
      >
        Cancelar
      </button>

      <button
        on:click={salvar}
        class="px-5 py-3 rounded-xl bg-slate-900 text-white"
      >
        Salvar
      </button>

    </div>

  </div>

</div>

{/if}