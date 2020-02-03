<template>
  <div id="legal">
    <h1 class="title color:dark">{{ $t("legal.title") }}</h1>
    <div class="legal-contact">
      <p>holz & raum berlin gmbh
      <br>Roelckestr. 152 -153
      <br>13086 Berlin
      <br>Tel:  030 927943 - 0
      <br>Fax: 030 927943 - 233
      <br>E-Mail: kontakt@holz-raum.de</p>
      <p>Geschäftsführung: Dieter Baumhoff
      <br>Registergericht: Amtsgericht Berlin Charlottenburg
      <br>Registernummer: hrb 64315
      <br>Umsatzsteuer-Identifikationsnummer: DE189141861</p>
    </div>
    <p>Freistellungsbescheinigung zum Steuerabzug bei Bauleistungen liegt vor.</p>
    <h2 class="title">Links</h2>
    <p>Die Web-Seiten von www.holz-raum.de können Links zu den Web-Seiten anderer Anbieter enthalten, für deren Inhalte wir keine Haftung übernehmen.</p>
    <h2 class="title">Haftungsausschluss</h2>
    <p>Die Inhalte unserer Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
      Wegen der Eigenheiten des Mediums Internet und der damit verbundenen Möglichkeit einer Unterbrechung oder eines Abbruchs der Informationsübertragung ist jegliche Haftung im Zusammenhang mit der Nutzung der Informationen, der Links oder dem Vertrauen auf die Richtigkeit dieser ausgeschlossen.</p>
    <p>Der Inhalt dieser Webseite ist urheberrechtlich geschützt.</p>
    <h2 class="title">Fotonachweis</h2>
    <p> © 2D+ Architekten (www.2dplus.com) – Team: Markus Bonauer, Michael Bölling, Tiffany Taraska – zu folgenden Fotos:</p>
    <p>Fotos Haus Wandlitz: Homepage 'Sliderbild Innenausbau',  'Artikelbild' unter Produkte / Wohnungsausbau, Foto '020-Wohnbereich-Holzfassade-Aussenansicht.jpg' unter Produkte / Wohnungsausbau / Fotogalerie sowie alle Fotos unter Referenzprojekte / Haus in Wandlitz</p>
    <p>Bei allen anderen Fotos unter www.der-raum.de liegt das Copyright bei holz & raum berlin GmbH.</p>
  </div>
</template>
<script>
  import json from "~/content/data/legal"
  import Cluster from "~/components/Cluster"
  export default {
    name: "Legal",
    json: json
  }
</script>
<style lang="scss">
  #legal {
    padding: 0 2em;
    max-width: 110ch;
    h1 {
      margin-top: 0;
      font-size: 1rem;
    }
    .legal-contact {
      display: flex;
      flex-wrap: column;
      justify-content: space-between;
      width: 80ch;
    }
    @include respond-to('large') {
      padding: 0;
    }
  }
</style>
