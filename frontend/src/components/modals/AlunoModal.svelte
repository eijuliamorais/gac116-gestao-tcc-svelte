<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { listarCursos } from "../../services/cursosService";

  export let open = false;
  export let aluno = null;

  const dispatch = createEventDispatcher();

  let nome = "";
  let matricula = "";
  let cursoId = "";
  let cursos = [];

  // Carrega a lista de cursos para o select
  onMount(async () => {
    try {
      cursos = await listarCursos();
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  });

  // Preenche os campos quando o aluno é passado (edição)
  $: if (aluno) {
    nome = aluno.nome || "";
    matricula = aluno.matricula || "";
    cursoId = aluno.curso?.id || aluno.curso || "";
  } else {
    nome = "";
    matricula = "";
    cursoId = "";
  }

  function handleSave() {
    const dados = {
      nome,
      matricula,
      curso: cursoId || null,
    };
    dispatch("save", dados);
  }

  function handleClose() {
    dispatch("close");
  }
</script>

{#if open}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
      <h3 class="text-2xl font-bold text-slate-900 mb-4">
        {aluno ? "Editar Aluno" : "Novo Aluno"}
      </h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Nome
          </label>
          <input
            bind:value={nome}
            type="text"
            placeholder="Nome completo"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Matrícula
          </label>
          <input
            bind:value={matricula}
            type="text"
            placeholder="Número de matrícula"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Curso
          </label>
          <select
            bind:value={cursoId}
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">Selecione um curso</option>
            {#each cursos as curso}
              <option value={curso.id}>{curso.nome}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          on:click={handleClose}
          class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
        >
          Cancelar
        </button>
        <button
          on:click={handleSave}
          class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
{/if}