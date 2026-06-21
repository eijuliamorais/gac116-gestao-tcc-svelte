<script>
  import { navigation } from "../../stores/navigation";

  const menu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊"
    },
    {
      id: "alunos",
      label: "Alunos",
      icon: "🎓"
    },
    {
      id: "professores",
      label: "Professores",
      icon: "👨‍🏫"
    },
    {
      id: "cursos",
      label: "Cursos",
      icon: "📚"
    },
    {
      id: "departamentos",
      label: "Departamentos",
      icon: "🏢"
    },
    {
      id: "unidades",
      label: "Unidades",
      icon: "🏛️"
    },
    {
      id: "tccs",
      label: "TCCs",
      icon: "📄"
    }
  ];

  function navegar(page) {
    navigation.set(page);
  }
</script>

<aside class="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

  <div class="px-6 py-8 border-b border-slate-800">

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
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-slate-800 transition-all duration-200"
        >
          <span class="text-lg">
            {item.icon}
          </span>

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