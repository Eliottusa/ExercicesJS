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
    constructor (id, jeu,competition, equipeA, equipeB, probabiliteA, statut ){
      this.id =id;
      this.jeu =jeu;
      this.competition=competition;
      this.equipeA=equipeA;
      this.equipeB=equipeB;
      this.probabiliteA=probabiliteA;
      this.statut=statut    
    
    }
    getFavori(){
      if (probabiliteA > 0.5){
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
chargerMatchs(matchsACharger){
  matchsACharger.forEach(obj => {
    let match = new Match(obj);
    this.matchs.push(match)
  });

}

afficherCalendrier(){
  calendrierMatchs.forEach(obj => {
    console.log("["+obj.id+"] : "+obj.equipeA +" vs "+obj.equipeB +" - Jeu: "+ obj.jeu)
    
  });
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
}


const esportVision = new Plateforme("Esport Vision");
esportVision.chargerMatchs(calendrierMatchs);
console.log("Affichage du calendrier :");
esportVision.afficherCalendrier();

//tests
const matchsValorant = esportVision.getMatchsParJeu("Valorant");
console.log("Matchs pour Valorant :", matchsValorant);
const matchsSerres = esportVision.getMatchsRisques();
console.log("Matchs serrés (0.45-0.55 de proba) :", matchsSerres);
const matchId = "LFL_KC_SLY";
const matchTrouve = esportVision.getMatchById(matchId);
console.log(`Match avec l'ID ${matchId} :`, matchTrouve);
const matchIdInexistant = "ABC_123";
const matchNonTrouve = esportVision.getMatchById(matchIdInexistant);
console.log(`Match avec l'ID ${matchIdInexistant} :`, matchNonTrouve);