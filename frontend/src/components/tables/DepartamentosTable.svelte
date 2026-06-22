<script>
  import { createEventDispatcher } from "svelte";

  export let departamentos = [];
  export let unidades = [];

  const dispatch = createEventDispatcher();

  function getUnidadeNome(departamento, listaUnidades) {
    // 1. Procura o ID em todas as variações de nomes possíveis que o seu Django pode ter gerado
    const id = departamento.unidade || 
               departamento.unidade_academica || 
               departamento.unidade_id || 
               departamento.unidadeAcademica;

    // 2. Se o Django enviou um objeto aninhado em vez de apenas o número
    if (id && typeof id === "object") {
      return id.nome || id.sigla || "Objeto sem nome";
    }

    // 3. Se ainda assim não achar o ID, imprime os campos reais do Django na tela para descobrirmos o nome exato
    if (!id) {
      const chavesReais = Object.keys(departamento).join(", ");
      return `Erro de chave. O Django enviou: [ ${chavesReais} ]`;
    }

    // 4. Mapeamento normal
    const unidadeEncontrada = listaUnidades.find(u => String(u.id) === String(id));
    return unidadeEncontrada ? unidadeEncontrada.nome : `ID não encontrado na lista: ${id}`;
  }
</script>

<div class="card overflow-hidden bg-white rounded-lg shadow border border-slate-200">
  <table class="w-full text-left">
    <thead class="bg-slate-100 border-b border-slate-200 text-slate-700">
      <tr>
        <th class="px-6 py-4 font-semibold text-sm">ID</th>
        <th class="px-6 py-4 font-semibold text-sm">Nome</th>
        <th class="px-6 py-4 font-semibold text-sm">Sigla</th>
        <th class="px-6 py-4 font-semibold text-sm">Unidade</th>
        <th class="text-center px-6 py-4 font-semibold text-sm">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each departamentos as departamento}
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-slate-800 transition">
          <td class="px-6 py-4 text-sm">{departamento.id}</td>
          <td class="px-6 py-4 text-sm font-medium">{departamento.nome}</td>
          <td class="px-6 py-4 text-sm">{departamento.sigla}</td>
          
          <td class="px-6 py-4 text-sm font-medium text-slate-600">
            {getUnidadeNome(departamento, unidades)}
          </td>
          
          <td class="px-6 py-4">
            <div class="flex justify-center gap-2">
              <button
                on:click={() => dispatch("editar", departamento)}
                class="px-3 py-1.5 bg-slate-200 text-slate-800 rounded text-sm hover:bg-slate-300 transition"
              >
                Editar
              </button>
              <button
                on:click={() => dispatch("excluir", departamento.id)}
                class="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="5" class="px-6 py-8 text-center text-slate-500 text-sm">
            Nenhum departamento cadastrado.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>