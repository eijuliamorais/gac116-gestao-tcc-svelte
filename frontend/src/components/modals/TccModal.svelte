<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { listarAlunos } from "../../services/alunosService";
  import { listarProfessores } from "../../services/professoresService";

  export let open = false;
  export let tcc = null;

  const dispatch = createEventDispatcher();

  let titulo = "";
  let alunoId = "";
  let orientadorId = "";
  let status = 0;
  let arquivo = null;
  let alunos = [];
  let professores = [];

  // Carrega a lista de alunos e professores para os selects
  onMount(async () => {
    try {
      const [alunosData, professoresData] = await Promise.all([
        listarAlunos(),
        listarProfessores(),
      ]);
      alunos = alunosData;
      professores = professoresData;
    } catch (error) {
      console.error("Erro ao carregar dados para o modal:", error);
    }
  });

  // Preenche os campos quando o TCC é passado (edição)
  $: if (tcc) {
    titulo = tcc.titulo || "";
    alunoId = tcc.aluno?.id || tcc.aluno || "";
    orientadorId = tcc.orientador?.id || tcc.orientador || "";
    status = tcc.status ?? 0;
  } else {
    titulo = "";
    alunoId = "";
    orientadorId = "";
    status = 0;
    arquivo = null;
  }

  function handleFileChange(event) {
    arquivo = event.target.files[0];
  }

  function handleSave() {
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("aluno", alunoId);
    formData.append("orientador", orientadorId);
    formData.append("status", status);
    if (arquivo) {
      formData.append("arquivo", arquivo);
    }
    dispatch("save", formData);
  }

  function handleClose() {
    dispatch("close");
  }

  const statusOptions = [
    { value: 0, label: "Em Elaboração" },
    { value: 1, label: "Enviado" },
    { value: 2, label: "Aprovado" },
    { value: 3, label: "Reprovado" },
  ];
</script>

{#if open}
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
      <h3 class="text-2xl font-bold text-slate-900 mb-4">
        {tcc ? "Editar TCC" : "Novo TCC"}
      </h3>

      <div class="space-y-4">
        <!-- Título -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Título
          </label>
          <input
            bind:value={titulo}
            type="text"
            placeholder="Título do trabalho"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <!-- Aluno -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Aluno
          </label>
          <select
            bind:value={alunoId}
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">Selecione um aluno</option>
            {#each alunos as aluno}
              <option value={aluno.id}>{aluno.nome}</option>
            {/each}
          </select>
        </div>

        <!-- Orientador -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Orientador
          </label>
          <select
            bind:value={orientadorId}
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">Selecione um orientador</option>
            {#each professores as professor}
              <option value={professor.id}>{professor.nome}</option>
            {/each}
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            bind:value={status}
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Arquivo PDF -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Arquivo PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            on:change={handleFileChange}
            class="w-full border border-slate-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
          />
          {#if tcc && tcc.arquivo}
            <p class="text-xs text-slate-500 mt-1">
              Arquivo atual: {tcc.arquivo.split("/").pop()}
            </p>
          {/if}
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