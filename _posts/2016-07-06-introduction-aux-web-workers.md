---
title: "Introduction aux Web Workers"
date:   2016-07-06 14:00:00 +0100
categories: javascript
remote_url: "https://www.synbioz.com/blog/introduction_aux_web_workers"
---

# Web Workers

JavaScript est un langage qui est basé sur un seul thread.
Même un appel AJAX, bien qu'asynchrone, tourne dans le même thread que le reste
de l'application. Pendant longtemps, on a reproché à JavaScript cette lacune
(au milieu de beaucoup d'autres). Ce n'est plus le cas depuis 2015. Ce slide
d'une conférence de Brendan Eich, le créateur du JavaScript, date de 2012 et
permet d'illustrer le propos.

![State of JavaScript 2012](http://www.synbioz.com/images/articles/20160704/Brendan%20Eich%20-%20always%20bet%20on%20JS.png)

## Introduction

Avant toutes choses, démystifions un peu ce que les Web Workers ne sont pas.

- Les _Web Workers_ ne sont pas des _Service Workers_ : c'est l'inverse. Le but
d'un _Service Worker_ est d'agir comme un proxy entre le navigateur et
l'extérieur, permettant ainsi, entre autres choses, de manipuler un cache et
d'avoir une expérience hors ligne agréable. Un _Service Worker_ ne fonctionne
cependant qu'en HTTPS pour des raisons de sécurité, ce n'est pas le cas des
_Web Workers_.

- Les _Web Workers_ ne sont pas fait pour manipuler le DOM. Ce n'est donc pas
l'endroit pour modifier votre page ou importer jQuery.

- Les _Web Workers_ ne sont pas une autre façon de réaliser un appel AJAX.

- Un _Web Worker_ n'aura pas accès aux fonctions alert ou prompt mais vous
pouvez tout à fait utiliser console.log.

En dehors de ça, vous avez accès à la très grande majorité de l'API existante
dans le navigateur. Vous pouvez avoir la liste des compatibilités dans cet
article sur [les fonctions et les classes accessibles aux Web Workers sur MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers).

Un _Web Worker_ est donc une façon d'appeler un script JavaScript qui va
s'exécuter dans un Thread différent de celui du script qui le crée. Il est
possible pour les deux scripts de communiquer ensemble via l'envoi et la
réception de messages. Un _Web Worker_ n'est cependant pas léger et n'est pas
à utiliser à tort ou à travers. La création est un processus coûteux, notamment
en mémoire. Il peut cependant grandement soulager l'affichage et la mise à jour
d'une page web si vous avez à réaliser des calculs complexes ou des opérations
régulières qui peuvent ne rien changer à votre page. Typiquement, si vous
voulez faire des vérifications régulières sur une API et comparer vos données
en cache à vos données affichées pour savoir ce que vous allez modifier, ce
peut être une bonne idée d'utiliser un _Web Worker_.

## Cas pratique

Voici le cas d'utilisation le plus simple : un fichier HTML qui crée un worker
en appelant le fichier `worker.js`. Ce worker ne fait que répondre "pong" quand
il reçoit un message du script principal ; message émis dès lors qu'on clique
sur le bouton "Ping".

~~~html
<!DOCTYPE HTML>
<html>
  <head>
    <title>Worker example</title>
  </head>
  <body>
    <button onClick="ping()">Ping</button>
    <script>
      var worker = new Worker('worker.js');
      worker.onmessage = function (event) {
        console.log(event.data);
      }
      var ping = function() {
        worker.postMessage("ping");
      }
    </script>
  </body>
</html>
~~~

~~~javascript
// worker.js
onmessage = function(event) {
  console.log("message received in the worker");
  postMessage("pong");
}
~~~

On est très loin d'utiliser les _Web Workers_ au maximum mais il y a déjà
quelques détails importants. Tout d'abord, dans le script principal, on envoie
et on s'abonne aux messages en passant par le worker mais ce n'est pas le cas
dans le worker qui a directement accès à `onmessage` et `postMessage`. Ensuite,
on peut constater que le message envoyé à `postMessage` est transmis au worker
ou à son parent au travers d'un objet `event` dans la propriété `data`.

Ce message est sérialisé puis décodé et c'est donc une copie qui est
transmise. Cela signifie qu'on ne peut envoyer que des messages sérialisables
(on ne peut pas envoyer de callback donc) et qu'on ne risque pas de modifier
le comportement d'un coté ou de l'autre en agissant sur l'objet que l'on reçoit.

Pour bien comprendre le cycle de vie de ces événements, voici un schéma qui
reprend notre exemple :

![Schéma du cycle de vie des Web Workers](http://www.synbioz.com/images/articles/20160704/Web Workers.png)

Un _Web Worker_ doit être détruit explicitement par la commande
`worker.terminate()` depuis le script créateur mais il peut également se
terminer lui même s'il a fini sa tâche grâce à la fonction `close()`. Bien
évidemment, il est aussi détruit avec le reste de la page si on ferme l'onglet.

Une autre fonction intéressante est `importScripts` qui prend en paramètre des
fichiers JavaScript à importer au sein du worker. Vous pourriez par exemple
utiliser `importScripts("data.js", "/vendor/lodash.js")`. Le chemin est relatif
au domaine de la page en cours et fonctionne de la même façon que pour une image.
Si un import venait à ne pas réussir, le reste du code ne serait par contre pas
exécuté.

Enfin, il n'y a pas de limite théorique au nombre de workers que vous pouvez
créer, un worker peut même en créer de nouveau lui même, mais c'est à vous
d'être raisonnable à l'instar des threads dans d'autres langages.

## Shared Web Workers

Par défaut, un _Web Worker_ n'est accessible que depuis le script qui l'a créé.
Si vous voulez partager un _Web Worker_ entre plusieurs onglets, plusieurs
iframes ou plusieurs workers, vous pouvez utiliser
`new SharedWorker("shared_worker.js")`. Chaque "création" de worker dans ce
cas sera en réalité un accès à un worker préexistant s'il a déjà été lancé.

Le code d'un _Shared Web Worker_ est un peu différent. Si je reprend l'exemple
utilisé plus haut, en voici l'implémentation :

~~~html
<!DOCTYPE HTML>
<html>
  <head>
    <title>Worker example</title>
  </head>
  <body>
    <button onClick="ping()">Ping</button>
    <script>
      var worker = new SharedWorker('shared_worker.js');
      worker.port.start();
      worker.port.onmessage = function (event) {
        console.log(event.data);
      }
      var ping = function() {
        worker.port.postMessage("ping");
      }
    </script>
  </body>
</html>
~~~

~~~javascript
// shared_worker.js
onconnect = function(event) {
  var port = event.ports[0];

  port.onmessage = function(event) {
    port.postMessage("pong");
  }
}
~~~

Comme un _Shared Web Worker_ est partagé et peut être accessible depuis
plusieurs onglets ou workers, il faut y accéder avec `port` du côté du créateur
du worker et récupérer le port depuis l'évènement du coté du worker. En effet,
`new SharedWorker` ne va pas créer directement un worker mais lui assigner un
port. C'est l'instruction `worker.port.start()` qui va explicitement le créer
s'il n'existe pas encore (assigner une fonction à `worker.port.onmessage` va
ouvrir le port implicitement mais il n'est pas dommageable de faire les deux).
La communication se fait ensuite via le port ouvert et non via le worker
directement.

Attention cependant à bien gérer la fermeture d'un _Shared Worker_. Il existe
de la même façon que `worker.port.start()` une fonction `worker.port.close()`
(la fonction est cette fois la même de chaque coté, pas de `terminate`) mais il
est complexe de [savoir si le port d'un _Shared Worker_ est fermé ou non](http://stackoverflow.com/questions/13662089/javascript-how-to-know-if-a-connection-with-a-shared-worker-is-still-alive).

## Objets transférables

Comme dit plus haut, les données que vous envoyez par le biais de `postMessage`
sont sérialisées pour en envoyer une copie entre les workers. C'est quelque chose
qu'on ne peut pas toujours se permettre si on veut réaliser un calcul complexe
sur de nombreuses données.

Il y a une possibilité de transférer un objet directement entre un script et un
worker. Cet objet sera cependant complètement transféré et le script originel
n'y aura plus accès. Cette possibilité n'existe cependant que pour Firefox et
Chrome. Vous ne pouvez réaliser cet échange qu'avec des objets qui implémentent
l'interface `Transferable` (à savoir [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
et [MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort)).

~~~javascript
// Create a 32MB "file" and fill it.
var uInt8Array = new Uint8Array(1024*1024*32); // 32MB
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i;
}

console.log(uInt8Array);
// [1, 2, 3, 4, ...]

worker.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);

console.log(uInt8Array);
// []
~~~

Comme on peut le voir, `uInt8Array` après le postMessage est devenu un array
vide.

Cependant, si vous en avez la possibilité, vous pourriez directement utiliser
un appel AJAX, accéder à des données de localStorage ou tout autre méthode pour
obtenir d'importantes données à traiter directement depuis le worker plutôt que
de réaliser un tel transfert. N'utilisez cette fonctionnalité que si vous en
avez réellement besoin.

## Conclusion : en avez-vous besoin ?

Comme toute optimisation, il s'agit d'un compromis. Un _Web Worker_ peut vous
aider à atteindre la barre des 60 FPS sur votre site si vous avez certaines
opérations qui prennent plus de temps que la dizaine de millisecondes dont vous
disposez pour ce palier. Ce n'est pas pour autant une option à utiliser en
permanence puisque la communication entre les parties de votre application va
se complexifier. L'empreinte mémoire va augmenter du simple fait d'avoir un
nouveau Worker ainsi que par la duplication des données transférées entre les
workers. Vous pouvez utiliser un objet transférable mais il faudrait pour cela
potentiellement plus de mise en place et votre script principal perdra la
possibilité d'accéder à ces données.

C'est donc un outil puissant qui peut vous apporter beaucoup mais qui vous
demandera de faire attention.

L’équipe Synbioz.

Libres d’être ensemble.
