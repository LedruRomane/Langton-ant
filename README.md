# Web Assembly par l'exemple

Ce dépôt contient quelques exemples d'initiation à Web Assembly,
ainsi qu'un `Makefile` permettant de compiler et tester le résultat:

* `make` va compiler les fichiers C en Web Assembly dans les différents exemples
* `make serve` va lancer un serveur Web local permettant de les tester
  (en ouvrant le fichier HTML dans chacun des répertoires d'exemple)

## Pré-requis

Le `Makefile` suppose que les outils `clang`, `lld` et `python3` sont disponibles:

* sous Ubuntu: `apt install clang lld python3`

