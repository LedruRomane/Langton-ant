# Web Assembly : coder la fourmi de Langton.

### Start

Prérequis : python3 clang lld
Si vous êtes dans l'incapacité d'installer ces dépendances, vous pouvez utiliser le dockerfile fourni.

```bash
docker build -t tp/webassembly . 
docker run -v $HOME/Desktop/webassemblyTest:/data --interactive --tty -d -p 8080:8080 --name tp_webassembly tp/webassembly
docker exec -it tp_webassembly bash
```

### Build

Utiliser le Makefile pour compiler et lancer le projet.

```bash
make restart # pour compiler et lancer le projet (clean + build + run)
```

### Description

Le projet est composé de 3 fichiers principaux :
- ant.c : contient le code de la fourmi de Langton
- ant.js : contient le code javascript qui permet de faire le lien entre le code C et le code HTML
- ant.html : contient le code HTML qui permet d'afficher la fourmi de Langton dans un canvas.

### Utilisation

Une fois le projet lancé, vous pouvez accéder à l'interface web à l'adresse suivante : http://0.0.0.0:8080/ant.html

Un bouton stop et start sont à votre disposition pour lancer ou arrêter la simulation, ou même la relancer (réappuyer sur start).

### Crédits

Lien vers la page de TP : https://perso.liris.cnrs.fr/pierre-antoine.champin/2023/wasm/
