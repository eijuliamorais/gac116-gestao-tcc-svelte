<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { listarAlunos } from "../../services/alunosService";
  import { listarProfessores } from "../../services/professoresService";

  export let open = false;
  export let tcc = null;

  const dispatch = createEventDispatcher();

  let titulo = "";
  let resumo = "";
  let palavrasChave = "";
  let tipo = "MONOGRAFIA";
  let idioma = "PT";
  let semestre = "2026/1";
  let alunoId = "";
  let orientadorId = "";
  let primeiroMembroId = "";
  let segundoMembroId = "";
  let status = "0";
  let arquivo = null;
  
  let alunos = [];
  let professores = [];

  onMount(async () => {
    try {
      const [alunosData, professoresData] = await Promise.all([
        listarAlunos(),
        listarProfessores(),
      ]);
      alunos = alunosData || [];
      professores = professoresData || [];
    } catch (error) {
      console.error("Erro ao carregar dados auxiliares do formulário:", error);
    }
  });

  $: if (tcc) {
    titulo = tcc.titulo || "";
    resumo = tcc.resumo || "";
    palavrasChave = tcc.palavras_chave || "";
    tipo = tcc.tipo || "MONOGRAFIA";
    idioma = tcc.idioma || "PT";
    semestre = tcc.semestre_letivo_defesa || "2026/1";
    alunoId = tcc.aluno?.id || tcc.aluno || "";
    orientadorId = tcc.orientador?.id || tcc.orientador || "";
    primeiroMembroId = tcc.primeiro_membro?.id || tcc.primeiro_membro || "";
    segundoMembroId = tcc.segundo_membro?.id || tcc.segundo_membro || "";
    status = String(tcc.status ?? "0");
  } else if (open) {
    titulo = "";
    resumo = "";
    palavrasChave = "";
    tipo = "MONOGRAFIA";
    idioma = "PT";
    semestre = "2026/1";
    alunoId = "";
    orientadorId = "";
    primeiroMembroId = "";
    segundoMembroId = "";
    status = "0";
    arquivo = null;
  }

  function handleFileChange(event) {
    arquivo = event.target.files[0];
  }

  function handleSave() {
    if (!titulo.trim() || !alunoId || !orientadorId || !primeiroMembroId || !segundoMembroId) {
      alert("Preencha todos os campos obrigatórios (Título, Aluno, Orientador, 1º Membro e 2º Membro).");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("resumo", resumo);
    formData.append("palavras_chave", palavrasChave);
    formData.append("tipo", tipo);
    formData.append("idioma", idioma);
    formData.append("semestre_letivo_defesa", semestre);
    formData.append("aluno", alunoId);
    formData.append("orientador", orientadorId);
    formData.append("presidente", orientadorId);
    formData.append("primeiro_membro", primeiroMembroId);
    formData.append("segundo_membro", segundoMembroId);
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
    { value: "0", label: "Em Elaboração" },
    { value: "1", label: "Enviado" },
    { value: "2", label: "Aprovado" },
    { value: "3", label: "Reprovado" },
  ];

  const tipoOptions = [
    { value: "MONOGRAFIA", label: "Monografia" },
    { value: "ARTIGO", label: "Artigo" },
    { value: "RELATORIO_ESTAGIO", label: "Relatório de Estágio" },
    { value: "RELATORIO_TECNICO", label: "Relatório Técnico" }
  ];

  const idiomaOptions = [
    { value: "PT", label: "Português" },
    { value: "EN", label: "Inglês" }
  ];
</script>

{#if open}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-slate-900">
          {tcc ? "Editar TCC" : "Novo TCC"}
        </h3>
        <button on:click={handleClose} class="text-slate-500 hover:text-slate-900 text-xl font-bold">&times;</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-1">Título *</label>
          <input bind:value={titulo} type="text" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-900" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Trabalho *</label>
          <select bind:value={tipo} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            {#each tipoOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Idioma *</label>
          <select bind:value={idioma} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            {#each idiomaOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-1">Semestre de Defesa (Ex: 2026/1) *</label>
          <input bind:value={semestre} type="text" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-900" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Aluno *</label>
          <select bind:value={alunoId} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            <option value="">Selecione um aluno</option>
            {#each alunos as aluno}
              <option value={aluno.id}>{aluno.nome}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Orientador *</label>
          <select bind:value={orientadorId} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            <option value="">Selecione um orientador</option>
            {#each professores as professor}
              <option value={professor.id}>{professor.nome}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">1º Membro da Banca *</label>
          <select bind:value={primeiroMembroId} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            <option value="">Selecione o 1º membro</option>
            {#each professores as professor}
              <option value={professor.id}>{professor.nome}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">2º Membro da Banca *</label>
          <select bind:value={segundoMembroId} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            <option value="">Selecione o 2º membro</option>
            {#each professores as professor}
              <option value={professor.id}>{professor.nome}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select bind:value={status} class="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-slate-900">
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Arquivo PDF</label>
          <input type="file" accept=".pdf" on:change={handleFileChange} class="w-full border border-slate-300 rounded-lg px-4 py-1.5 focus:outline-none" />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-1">Resumo</label>
          <textarea bind:value={resumo} rows="3" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-900"></textarea>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-1">Palavras-chave (Separadas por vírgula)</label>
          <input bind:value={palavrasChave} type="text" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-900" />
        </div>

      </div>

      <div class="flex justify-end gap-3 mt-8">
        <button on:click={handleClose} class="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Cancelar</button>
        <button on:click={handleSave} class="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium">Salvar TCC</button>
      </div>
    </div>
  </div>
{/if}