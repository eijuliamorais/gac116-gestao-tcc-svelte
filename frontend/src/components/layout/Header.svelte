<script>
  import { navigation } from "../../stores/navigation";

  const titles = {
    dashboard: "Dashboard",
    alunos: "Alunos",
    professores: "Professores",
    cursos: "Cursos",
    departamentos: "Departamentos",
    unidades: "Unidades Acadêmicas",
    tccs: "TCCs"
  };

  const descriptions = {
    dashboard: "Visão geral do sistema",
    alunos: "Gerenciamento de alunos",
    professores: "Gerenciamento de professores",
    cursos: "Gerenciamento de cursos",
    departamentos: "Gerenciamento de departamentos",
    unidades: "Gerenciamento de unidades acadêmicas",
    tccs: "Gerenciamento de trabalhos de conclusão de curso"
  };
</script>

<header class="bg-white border-b border-slate-200 px-8 py-6">

  <div class="flex items-center justify-between">

    <div>

      <h1 class="text-3xl font-bold text-slate-900">
        {titles[$navigation]}
      </h1>

      <p class="text-slate-500 mt-1">
        {descriptions[$navigation]}
      </p>

    </div>

    <div
      class="bg-slate-100 px-4 py-2 rounded-xl text-sm text-slate-600"
    >
      Gestão de TCCs
    </div>

  </div>

</header>