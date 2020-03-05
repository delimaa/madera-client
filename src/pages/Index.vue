<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Accueil</span>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <span class="text-h6">Bienvenue !</span>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <p>Bienvenue sur l'application de conception des devis</p>
            <p>Cette application permet :</p>
            <ul>
              <li>d'initier de nouveaux projets, de les suivre et d'éditer les devis relatifs à ces projets.</li>
              <li>de gérer le portefeuille client en ajoutant de nouveaux clients ou en affichant les inforamations relatives à ceux ci</li>
            </ul>
            <p
              class="text-primary text-bold"
            >Pour commencer, veuillez naviguer via le menu latéral gauche</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>
