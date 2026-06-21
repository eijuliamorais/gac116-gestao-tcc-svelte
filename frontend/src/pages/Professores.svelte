<script>
  import { onMount } from "svelte";

  import {
    listarProfessores,
    criarProfessor,
    atualizarProfessor,
    excluirProfessor
  } from "../services/professoresService";

  import {
    listarDepartamentos
  } from "../services/departamentosService";

  import ProfessorModal from "../components/modals/ProfessorModal.svelte";

  let professores = [];
  let departamentos = [];

  let busca = "";

  let modalAberto = false;
  let professorSelecionado = null;

  async function carregarDados() {
    try {
      professores = await listarProfessores();
      departamentos = await listarDepartamentos();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(carregarDados);

  function getDepartamentoNome(id) {
    const departamento = departamentos.find(
      d => d.id === id
    );

    return departamento?.nome || "Não informado";
  }

  function novoProfessor() {
    professorSelecionado = null;
    modalAberto = true;
  }

  function editarProfessor(professor) {
    professorSelecionado = professor;
    modalAberto = true;
  }

  async function salvarProfessor(event) {
    try {

      const dados = event.detail;

      if (professorSelecionado) {

        await atualizarProfessor(
          professorSelecionado.id,
          dados
        );

      } else {

        await criarProfessor(dados);

      }

      modalAberto = false;
      professorSelecionado = null;

      await carregarDados();

    } catch (error) {

      console.error(error);
      alert("Erro ao salvar professor.");

    }
  }

  async function removerProfessor(id) {

    const confirmar = confirm(
      "Deseja realmente excluir este professor?"
    );

    if (!confirmar) return;

    try {

      await excluirProfessor(id);

      await carregarDados();

    } catch (error) {

      console.error(error);
      alert("Erro ao excluir professor.");

    }
  }

  function fecharModal() {
    modalAberto = false;
    professorSelecionado = null;
  }

  $: professoresFiltrados = professores.filter(
    professor =>
      professor.nome
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )
  );
</script>

<div class="space-y-6">

  <div class="flex justify-between items-center">

    <div>

      <h2 class="text-3xl font-bold text-slate-900">
        Professores
      </h2>

      <p class="text-slate-700">
        Gerenciamento de professores
      </p>

    </div>

    <button
      on:click={novoProfessor}
      class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
    >
      Novo Professor
    </button>

  </div>

  <div class="card p-5">

    <input
      bind:value={busca}
      type="text"
      placeholder="Pesquisar professor..."
      class="w-full border border-slate-300 rounded-xl px-4 py-3"
    />

  </div>

  <div class="card overflow-hidden">

    <table class="w-full">

      <thead class="bg-slate-100">

        <tr>

          <th class="text-left px-6 py-4">
            ID
          </th>

          <th class="text-left px-6 py-4">
            Nome
          </th>

          <th class="text-left px-6 py-4">
            Departamento
          </th>

          <th class="text-center px-6 py-4">
            Ações
          </th>

        </tr>

      </thead>

      <tbody>

        {#each professoresFiltrados as professor}

          <tr class="border-t border-slate-200 hover:bg-slate-50">

            <td class="px-6 py-4">
              {professor.id}
            </td>

            <td class="px-6 py-4 font-medium">
              {professor.nome}
            </td>

            <td class="px-6 py-4">
              {getDepartamentoNome(
                professor.departamento
              )}
            </td>

            <td class="px-6 py-4">

              <div class="flex justify-center gap-2">

                <button
                  on:click={() => editarProfessor(professor)}
                  class="px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Editar
                </button>

                <button
                  on:click={() => removerProfessor(professor.id)}
                  class="px-3 py-2 bg-red-600 text-white rounded-lg"
                >
                  Excluir
                </button>

              </div>

            </td>

          </tr>

        {/each}

      </tbody>

    </table>

  </div>

</div>

<ProfessorModal
  open={modalAberto}
  professor={professorSelecionado}
  on:save={salvarProfessor}
  on:close={fecharModal}
/>