# Caren-Nutrio


## tirant du sujet 'Conception et implementation d'un systeme intelligent pour detecter les carences nutritionnelles chez les etudiants a rythme d'etudes intensif.


## Systeme intelligent qui fait la detection des carences nutritionnelles chez les etudiants a rythme d'etudes intensif

**Caren-Nutrio** est une application web intelligent qui detecte procement les risques de carences nutritionnelles chez les etudiants universitaires a rythme intensif(>=35 heures d'etudes par semaine) et estime leur impact sur les performances cognitives

### Les systeme repose sur un algorithme de scoring multi-domaine combinant:
- Habitudes nutritionnelles:fer, vitamine B12, vutamine D,magnesium, proteines
- Qualite du sommeil
- Niveau de stress academique
- Charge horaire d'etudes
- Fatigue cognitive auto-rapporte

## Resultat: Classfication en 4 niveaux de risque + recommandations personnalises + tableau de bord interactif.

## Demarrage rapide(une seule commande)
Le projet est un fichier HTML autonome

**Compatible**:Chrome, Firefox, Safari, Edge Desktop & Mobile

## Structure du depot
caren-nutrio/
|__ index.html
|

## Configuration Firebase 
Sans Firebase, l'application fontionne entierement en local(localStorage).

1.Creer un projet sur [Firebase console]()


## Algorithme de scoring 
L'algorithme calcule un **score global de risque(0-100)** a partir de 4 domaines domaines ponderes:

_________________________________________________________________
|   Domaine     |   Poids   |       Variables                   |
|---------------|-----------|-----------------------------------|
|   Nutrition   |   40%     |Fer,Vitamine B12,vitamine D,       |
|               |           |Magnesium,Frequence repas          |
|---------------------------------------------------------------|
|   Sommeil     |  25%      | Heures/nuit,qualite percue        |
|---------------------------------------------------------------|
|Stress academi-|   20%     |Niveau stress(1-5),charge horaire  |
|   que         |           |                                   |
|---------------------------------------------------------------|
|Fatigue cogni- |   15%     |Score fatigue auto-rapporte(1-10)  |
|   tive        |           |                                   |
|_______________|___________|___________________________________|


**Classification des risques:**

|   score   |       Classe      |   couleur     |
|-----------------------------------------------|
| 0-25      |   Aucun risque    |   vert        |
|   26-50   |   risque faible   |   jaune       |
|   51-75   |   risque modere   |   orange      |
|   76-100  |   risque eleve    |   rouge       |
_________________________________________________



## Donnees

Le dataset anonymise de la phase pilote est disponible 

**Description des colonnes**

**License donnees**

## Metriques de validation

|   Metrique   |   Cible   |   baseline b1(naif)|Caren-Nutrio|
|Precision     | >=80%     |a completer         |            |
|(Accuracy)    |           |                    |            |
|--------------|-----------|--------------------|------------|
|F1-Score macro|    >=0.75 |                    |            |
|--------------|-----------|--------------------|------------|
|Recall classe |    >=85%  |                    |            |
|--------------|-----------|--------------------|------------|
|Score SUS     |  >=70/100 |                    |            |
|(usabilite)   |           |                    |            |
______________________________________________________________

## Avertissement medical important
**Caren-Nutrio est un outil de prevention et de sensibilisation ,Non un dispositif de diagnostic medical**
-Ses resultats ne substituent pas a une consultation medicale professionnelle.
- En cas de score de risque eleve,consultez un medecin ou un nutritionniste

***Gaina Marcha JN PAUL *** 
Univerite Adventiste d'Haiti
Faculte de Genie et des Nouvelles Technologies