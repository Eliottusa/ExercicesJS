const calendrierMatchs = [
  {
    id: 'LFL_KC_SLY',
    jeu: 'League of Legends',
    competition: 'LFL',
    equipeA: 'Karmine Corp',
    equipeB: 'Solary',
    probabiliteA: 0.65, // 65% de chance pour KC
    statut: 'À venir'
  },
  {
    id: 'VCT_VIT_M8',
    jeu: 'Valorant',
    competition: 'VCT EMEA',
    equipeA: 'Team Vitality',
    equipeB: 'Mandatory',
    probabiliteA: 0.55, // 55% de chance pour Vitality
    statut: 'À venir'
  },
  {
    id: 'LFL_GO_BDS',
    jeu: 'League of Legends',
    competition: 'LFL',
    equipeA: 'Gentle Mates',
    equipeB: 'BDS Academy',
    probabiliteA: 0.48, // 48% de chance pour M8, donc BDS est favori
    statut: 'À venir'
  },
  {
    id: 'LFL_KC_M8',
    jeu: 'Valorant',
    competition: 'VCT EMEA',
    equipeA: 'Karmine Corp',
    equipeB: 'Mandatory',
    probabiliteA: 0.52,
    statut: 'À venir'
  }
];
class Match{
    constructor ({id, jeu,competition, equipeA, equipeB, probabiliteA, statut }){ //on mets les crochets pour avoir qu'un seul objet, et aps 7 paramètres pour chargermatchs() 
      this.id =id;
      this.jeu =jeu;
      this.competition=competition;
      this.equipeA=equipeA;
      this.equipeB=equipeB;
      this.probabiliteA=probabiliteA;
      this.statut=statut ;
      this.resultat = null; 
    
    }
    getFavori(){
      if (this.probabiliteA > 0.5){
        return "l'équipe qui va gagner est : " + this.equipeA
      }else {
        return "l'équipe qui va gagner est : " + this.equipeB
      }
    }
   
}

class Plateforme {
    constructor(nom, matchs){
      this.nom=nom;
      this.matchs = []
    }
chargerMatchs(matchsACharger) {
    matchsACharger.forEach(obj => {
        const match = new Match(obj); // obj est un objet avec toutes les propriétés
        this.matchs.push(match);
    });
}


afficherCalendrier(){ 
  calendrierMatchs.forEach(obj => 
    { console.log("["+obj.id+"] : "+obj.equipeA +" vs "+obj.equipeB +" - Jeu: "+ obj.jeu) }); 
}

 getMatchsParJeu(jeu){
      const jeux = this.matchs.filter(match => match.jeu === jeu);
      return jeux
    }

    getMatchsRisques(){
      const risk = this.matchs.filter(match => match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55);
      return risk
    }

    getMatchById(id){
      const ids = this.matchs.find(match => match.id === id);
      return ids
    }
    //méthode du bonus
    simulerResultat(idMatch) {
    const match = this.getMatchById(idMatch);
    if (!match) return null;
    const random = Math.random();
    const gagnant = random < match.probabiliteA ? match.equipeA : match.equipeB;
    match.statut = 'Terminé';
    match.resultat = gagnant;
    return match;
}

}

const esportVision = new Plateforme("Esport Vision");
esportVision.chargerMatchs(calendrierMatchs);
console.log("Affichage du calendrier :");
esportVision.afficherCalendrier();

//tests pour matchs par jeu
const matchsValo = esportVision.getMatchsParJeu("Valorant");
console.log("Matchs pour Valorant :");
matchsValo.forEach(m => {
    console.log(`ID: ${m.id}, ${m.equipeA} vs ${m.equipeB}, Proba: ${m.probabiliteA}, Statut: ${m.statut}`);
});
//tests pour matchs serrés
const matchsSerre = esportVision.getMatchsRisques();
console.log("Matchs serrés (0.45-0.55 de proba) :");
matchsSerre.forEach(m => {
    console.log(`ID: ${m.id}, ${m.jeu}, ${m.equipeA} vs ${m.equipeB}, Proba: ${m.probabiliteA}, Statut: ${m.statut}`);
});
//tests pour match par ID
const matchId = "LFL_KC_SLY";
const matchTrouve = esportVision.getMatchById(matchId);
if (matchTrouve) {
    console.log(`Match avec l'ID ${matchId} :`);
    console.log(`ID: ${matchTrouve.id}, ${matchTrouve.jeu}, ${matchTrouve.equipeA} vs ${matchTrouve.equipeB}, Proba: ${matchTrouve.probabiliteA}, Statut: ${matchTrouve.statut}`);
} else {
    console.log(`Aucun match trouvé avec l'ID ${matchId}`);
}
//test pour un ID non existant
const matchIdNonExistant = "ABC_123";
const matchNonTrouve = esportVision.getMatchById(matchIdNonExistant);
if (matchNonTrouve) {
    console.log(`Match avec l'ID ${matchIdNonExistant} :`, matchNonTrouve);
} else {
    console.log(`Aucun match trouvé avec l'ID ${matchIdNonExistant}`);
}

//Test de la méthode bonus
const matchSimule = esportVision.simulerResultat("LFL_KC_SLY");
console.log("Match simulé :");
console.log(`ID: ${matchSimule.id}, ${matchSimule.jeu}, ${matchSimule.equipeA} vs ${matchSimule.equipeB}, Proba: ${matchSimule.probabiliteA}, Statut: ${matchSimule.statut}, Vainqueur: ${matchSimule.resultat}`);


