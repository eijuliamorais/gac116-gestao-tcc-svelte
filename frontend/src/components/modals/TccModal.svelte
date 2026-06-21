<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let tcc = null;

  const dispatch = createEventDispatcher();

  let form = {
    titulo: "",
    status: "",
    orientador: ""
  };

  $: if (tcc) {
    form = {
      titulo: tcc.titulo || "",
      status: tcc.status || "",
      orientador: tcc.orientador || ""
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

  <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

    <h2 class="text-2xl font-bold mb-6 text-slate-900">
      {tcc ? "Editar TCC" : "Novo TCC"}
    </h2>

    <div class="space-y-4">

      <input
        bind:value={form.titulo}
        placeholder="Título"
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      />

      <input
        bind:value={form.orientador}
        placeholder="Orientador"
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      />

      <select
        bind:value={form.status}
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      >
        <option value="">Selecione</option>
        <option value="Enviado">Enviado</option>
        <option value="Em Elaboração">Em Elaboração</option>
        <option value="Aprovado">Aprovado</option>
      </select>

    </div>

    <div class="flex justify-end gap-3 mt-8">

      <button
        on:click={fechar}
        class="border px-5 py-3 rounded-xl"
      >
        Cancelar
      </button>

      <button
        on:click={salvar}
        class="bg-slate-900 text-white px-5 py-3 rounded-xl"
      >
        Salvar
      </button>

    </div>

  </div>

</div>

{/if}