# apiiptvparser

apiiptvparser est un outil puissant pour extraire des informations à partir de listes de lecture IPTV.

## Installation

Pour utiliser `apiiptvparser` dans votre projet, vous pouvez l'installer via npm :

npm install apiiptvparser

## Utilisation

const apiiptvparser = require('apiiptvparser');

// Exemple : Analyser une liste de lecture M3U
const m3uData = `#EXTM3U
#EXTINF:-1 tvg-id="..." tvg-name="..." tvg-logo="..." group-title="...",[...]

const result = apiiptvparser.parseM3U(m3uData);
console.log(result);


## Fonctionnalités

- Récupération de toutes les chaînes, films et séries.
- Calcul du nombre total de chaînes.
- Calcul du nombre total de films.
- Calcul du nombre total de séries.
- Calcul du nombre total de chaînes par catégorie.
- Calcul du nombre total de films par catégorie.
- Calcul du nombre total de séries par catégorie.
- Recherche et affichage d'informations sur une chaîne, un film ou une série en fonction du nom.

## Contribuer

Si vous souhaitez contribuer à `apiiptvparser`, veuillez créer une issue ou une pull request sur GitHub.

## Licence

Ce projet est sous licence MIT.


N'oubliez pas de personnaliser les sections en fonction de votre projet réel et d'ajouter des exemples ou des détails supplémentaires pour aider les utilisateurs à comprendre comment utiliser votre package.
