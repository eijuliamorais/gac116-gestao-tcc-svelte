<script>
  import { navigation } from "../../stores/navigation";

  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "alunos", label: "Alunos" },
    { id: "professores", label: "Professores" },
    { id: "cursos", label: "Cursos" },
    { id: "departamentos", label: "Departamentos" },
    { id: "unidades", label: "Unidades Acadêmicas" },
    { id: "tccs", label: "TCCs" }
  ];

  function navegar(page) {
    navigation.set(page);
  }
</script>

<aside class="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

  <div class="px-8 py-8 border-b border-slate-800">

    <h1 class="text-2xl font-bold">
      Gestão TCC
    </h1>

    <p class="text-slate-400 text-sm mt-2">
      Sistema Acadêmico
    </p>

  </div>

  <nav class="flex-1 p-4">

    <div class="space-y-2">

      {#each menu as item}

        <button
          on:click={() => navegar(item.id)}
          class:selected={$navigation === item.id}
          class="w-full text-left px-5 py-4 rounded-xl transition-all duration-200 hover:bg-slate-800"
        >

          <span class="font-medium">
            {item.label}
          </span>

        </button>

      {/each}

    </div>

  </nav>

  <div class="border-t border-slate-800 p-5">

    <div class="bg-slate-800 rounded-xl p-4">

      <p class="text-sm text-slate-400">
        Programação Web
      </p>

      <p class="font-semibold mt-1">
        Trabalho Prático 2
      </p>

    </div>

  </div>

</aside>

<style>
  .selected {
    background: rgb(30 41 59);
  }
</style>