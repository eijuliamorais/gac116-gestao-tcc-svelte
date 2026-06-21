<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let aluno = null;

  const dispatch = createEventDispatcher();

  let form = {
    nome: "",
    matricula: "",
    curso: ""
  };

  $: if (aluno) {
    form = {
      nome: aluno.nome || "",
      matricula: aluno.matricula || "",
      curso: aluno.curso || ""
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

    <h2 class="text-2xl font-bold mb-6 text-slate-900">
      {aluno ? "Editar Aluno" : "Novo Aluno"}
    </h2>

    <div class="space-y-4">

      <input
        bind:value={form.nome}
        placeholder="Nome"
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      />

      <input
        bind:value={form.matricula}
        placeholder="Matrícula"
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      />

      <input
        bind:value={form.curso}
        placeholder="Curso"
        class="w-full border border-slate-300 rounded-xl px-4 py-3"
      />

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