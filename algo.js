function choixAleatoire() {
    
    const random = Math.random();
    
    
    if (random < 0.5) {
      return "ando";
    } 
   
    else {
      return "keziah";
    }
  }
  
 
  const resultat = choixAleatoire();
  console.log(resultat);
  