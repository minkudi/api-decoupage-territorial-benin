# API de découpage territorial du Bénin 🇧🇯

Description de l'API de découpage territorial du Bénin 📚

## Fonctionnalités 💻

* Récupération des départements 🔍
* Récupération des communes 📊
* Récupération des arrondissements 📈
* Récupération des quartiers 🗺️

## Utilisation 📊

* Récupérer un département par son ID : `GET /departements/:id_dep` 📝
	+ Exemple : `GET /departements/1` pour récupérer le département avec l'ID 1
* Récupérer les communes d'un département : `GET /departements/:id_dep/communes` 📊
	+ Exemple : `GET /departements/1/communes` pour récupérer les communes du département avec l'ID 1
* Récupérer les arrondissements d'une commune : `GET /departements/:id_dep/communes/:id_com/arrondissements` 📈
	+ Exemple : `GET /departements/1/communes/1/arrondissements` pour récupérer les arrondissements de la commune avec l'ID 1 dans le département avec l'ID 1
* Récupérer les quartiers d'un arrondissement : `GET /departements/:id_dep/communes/:id_com/arrondissements/:id_arrond/quartiers` 🗺️
	+ Exemple : `GET /departements/1/communes/1/arrondissements/1/quartiers` pour récupérer les quartiers de l'arrondissement avec l'ID 1 dans la commune avec l'ID 1 dans le département avec l'ID 1

## Notes 📝

* ⚠️ Nous n'avons pas utilisé la recherche par nom en raison des problèmes de sensibilité à la casse et autres.
* 🔄 Les données sont stockées dans un fichier JSON qui est mis à jour régulièrement.

## Contribuer 🤝

Nous sommes ouverts à toutes les approches et solutions pour améliorer l'API. N'hésitez pas à nous contacter pour discuter de vos idées et de vos propositions.

## Remerciements 🎉

Nous remercions [@leplutonien](https://github.com/leplutonien) pour avoir fourni les données  👏.

## Licence 📜

L'API est gratuite et ouverte à tous. Vous pouvez l'utiliser librement pour vos projets personnels ou professionnels.
