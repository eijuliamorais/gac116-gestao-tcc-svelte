<script>
  import Sidebar from "./components/layout/Sidebar.svelte";
  import Header from "./components/layout/Header.svelte";

  import Dashboard from "./pages/Dashboard.svelte";
  import Alunos from "./pages/Alunos.svelte";
  import Professores from "./pages/Professores.svelte";
  import Cursos from "./pages/Cursos.svelte";
  import Departamentos from "./pages/Departamentos.svelte";
  import Unidades from "./pages/Unidades.svelte";
  import Tccs from "./pages/Tccs.svelte";

  import { navigation } from "./stores/navigation";
</script>

<div class="flex min-h-screen bg-slate-100">

  <Sidebar />

  <main class="flex-1">

    <Header />

    <div class="p-8">

      {#if $navigation === "dashboard"}
        <Dashboard />
      {:else if $navigation === "alunos"}
        <Alunos />
      {:else if $navigation === "professores"}
        <Professores />
      {:else if $navigation === "cursos"}
        <Cursos />
      {:else if $navigation === "departamentos"}
        <Departamentos />
      {:else if $navigation === "unidades"}
        <Unidades />
      {:else if $navigation === "tccs"}
        <Tccs />
      {/if}

    </div>

  </main>

</div>