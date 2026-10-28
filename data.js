export const elements = [
  ['Hydrogen','H',1,0],['Helium','He',2,2],['Lithium','Li',3,4],['Beryllium','Be',4,5],['Boron','B',5,6],['Carbon','C',6,6],['Nitrogen','N',7,7],['Oxygen','O',8,8],['Fluorine','F',9,10],['Neon','Ne',10,10],['Sodium','Na',11,12],['Magnesium','Mg',12,12],['Aluminium','Al',13,14],['Silicon','Si',14,14],['Phosphorus','P',15,16],['Sulfur','S',16,16],['Chlorine','Cl',17,18],['Argon','Ar',18,22],['Potassium','K',19,20],['Calcium','Ca',20,20]
].map(([name,symbol,z,n])=>({name,symbol,z,n}));

export const molecules = {
  CO2:{formula:'CO₂',center:'C',outer:['O','O'],positions:[[-1.3,0,0],[1.3,0,0]],bondOrders:[2,2],lone:0,domains:'Linear',shape:'Linear',axe:'AX₂',angle:'180°',description:'Two double-bond domains spread to opposite sides of carbon. Each double bond counts as one VSEPR domain.'},
  BF3:{formula:'BF₃',center:'B',outer:['F','F','F'],positions:[[0,1.25,0],[-1.08,-.62,0],[1.08,-.62,0]],lone:0,domains:'Trigonal planar',shape:'Trigonal planar',axe:'AX₃',angle:'120°',description:'Three bonding domains share one plane around boron.'},
  CH4:{formula:'CH₄',center:'C',outer:['H','H','H','H'],positions:[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(v=>v.map(n=>n*.72)),lone:0,domains:'Tetrahedral',shape:'Tetrahedral',axe:'AX₄',angle:'109.5°',description:'Four bonds point toward the corners of a tetrahedron.'},
  NH3:{formula:'NH₃',center:'N',outer:['H','H','H'],positions:[[0,.95,.381],[-.823,-.475,.381],[.823,-.475,.381]],lone:1,lonePositions:[[0,0,-.8]],domains:'Tetrahedral',shape:'Trigonal pyramidal',axe:'AX₃E',angle:'≈107°',description:'Three N–H bonds make a pyramid; one lone pair occupies the fourth tetrahedral domain.'},
  H2O:{formula:'H₂O',center:'O',outer:['H','H'],positions:[[-.791,-.612,0],[.791,-.612,0]],lone:2,lonePositions:[[0,.35,.606],[0,.35,-.606]],domains:'Tetrahedral',shape:'Bent',axe:'AX₂E₂',angle:'≈104.5°',description:'Two O–H bonds and two lone pairs form four tetrahedral domains; only atoms define the bent shape.'},
  PCl5:{formula:'PCl₅',center:'P',outer:['Cl','Cl','Cl','Cl','Cl'],positions:[[0,1.25,0],[0,-1.25,0],[1.18,0,0],[-.59,0,1.02],[-.59,0,-1.02]],lone:0,domains:'Trigonal bipyramidal',shape:'Trigonal bipyramidal',axe:'AX₅',angle:'90°, 120°',description:'Three equatorial bonds form a triangle; two axial bonds sit above and below it.'},
  SF6:{formula:'SF₆',center:'S',outer:['F','F','F','F','F','F'],positions:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(v=>v.map(n=>n*1.15)),lone:0,domains:'Octahedral',shape:'Octahedral',axe:'AX₆',angle:'90°',description:'Six bonding domains point along the corners of an octahedron.'}
};

export const bonds = {
  H2:{title:'Hydrogen · H₂',atoms:['H','H'],order:1,kind:'Covalent',lewis:'H—H',note:'Each hydrogen contributes one electron to a shared pair, forming a single covalent bond. This bond-only Lewis sketch is complete for H₂.'},
  O2:{title:'Oxygen · O₂',atoms:['O','O'],order:2,kind:'Covalent',lewis:'O=O',note:'The bond-only sketch shows two shared pairs in a double bond. A complete Lewis structure also has two lone pairs on each oxygen.'},
  N2:{title:'Nitrogen · N₂',atoms:['N','N'],order:3,kind:'Covalent',lewis:'N≡N',note:'The bond-only sketch shows three shared pairs in a triple bond. A complete Lewis structure also has one lone pair on each nitrogen.'},
  H2O:{title:'Water · H₂O',atoms:['O','H','H'],order:1,kind:'Covalent',lewis:'H—O—H',note:'Oxygen shares one pair with each hydrogen. The bond-only sketch omits oxygen’s two lone pairs; the molecular model shows them.'},
  NaCl:{title:'Sodium chloride · NaCl',atoms:['Na⁺','Cl⁻'],order:0,kind:'Ionic',lewis:'Na⁺  Cl⁻',note:'Electron transfer forms oppositely charged ions, which attract. The 3D model is a small schematic lattice fragment; solid table salt is an extended rock-salt lattice, not isolated NaCl molecules.'}
};
