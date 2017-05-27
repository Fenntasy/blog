---
title: Retour sur la Take Off 2016
date:   2016-11-02 14:00:00 +0100
categories: conferences
remote_url: "https://www.synbioz.com/blog/retour_sur_la_takeoff_2016"
---
La Take Off renait avec une nouvelle équipe (mais soutenue par la précédente)
pour une nouvelle édition très intéressante. Synbioz était à l'[édition
2013](https://www.synbioz.com/blog/retour_sur_la_takeoff_2013) et voici un
retour sur celle de 2016.

Les principaux thèmes qui se sont dégagés de cette édition sont les Bots et les
changements qu'ils devraient provoquer, Docker et JavaScript qui n'est toujours
pas boudé.

## The Web and the Buttefly Effect

[Angela Ricci](https://twitter.com/gericci)
et [Emmanuel Demey](https://twitter.com/EmmanuelDemey)
| [slides](https://gillespie59.github.io/assets/facebook/slides/)

Le HTML est la fondation de votre app et comme pour un bâtiment, de mauvaises
fondations se manifesteront sous la forme de problèmes difficiles à résoudre
plus tard.

Il est important de conserver la sémantique de votre HTML pour vos applications.
Par exemple, si vous utilisez un lien `<a>` sans lui donner de `href` alors il
est inaccessible par le clavier. Cependant, si vous créez un lien sans `href`,
vous aviez probablement besoin d'un `<button>`.

La conférence s'est basée sur la version mobile du site de Facebook qui (par
exemple) n'utilise que des `<div>` sur 6 niveaux de profondeur pour créer ses
boutons de navigations avec un `<a>` au lieu d'utiliser une liste dans un
élément `<nav>` et des `<button>` comme il est maintenant conseillé de faire et
ce qui réduirait la navigation à 2 niveaux de profondeur.

> "Design like we give a damn!"
>
> Léonie Watson


## Discover how machine can predict the future

[Fabien Vauchelles](https://twitter.com/fabienv)
| [slides](https://docs.google.com/presentation/d/1-puh-499mx0q_AydUQL_qJ7Y2gzWVzvMaTnSf49dp6c/edit)

Le machine learning expliqué à partir du Titanic. Quelles sont vos chances de
survivre en fonction du prix de votre billet, de votre âge et de votre sexe ? En
analysant les données existantes, on peut faire une prédiction avec seulement
ces informations.

Cependant, ces prédictions doivent être éduquées pour être fiable. Le modèle le
plus simple de la data science est donc d'analyser les données, d'entrainer le
modèle de code et de valider les prédictions en utilisant un jeu de données de
tests dont on connait déjà le résultat. C'est le modèle scientifique classique :
on vérifie les prédictions par des connaissances empiriques et quand ça
fonctionne suffisamment longtemps, on considère le modèle comme correct.

Si vous souhaitez vous mettre au machine learning,
[Kaggle](https://www.kaggle.com/) propose des exercices directement dans le
navigateur pour expérimenter ce genre de chose. L'histoire du Titanic est
d'ailleurs l'un des premiers exercices.

## Docker, from Utopia to Reality

[Léo Unbekandt](https://twitter.com/Soulou)

Docker est une technologie très pratique mais manager des milliers de conteneurs
en production peut être complexe. Retour d'expérience de Scalingo après 3 ans de
gestion d'infrastructure en tout genre : des bugs en tout genre, Docker a eu du
mal à mûrir mais heureusement, ça va dans le bon sens et les outils qui sont
apparus au fur et à mesure sont de plus en plus efficaces.


## Why and how bookkeepers fucked up IT

[Quentin Adam](https://twitter.com/waxzce)

Il existe un biais mental fort présents dans les entreprises : le biais des
coûts irrécupérables. Appliqué comptablement, cela sous entend qu'acheter un
logiciel pour répondre à un besoin technique impose de l'utiliser pendant au
moins 3 ans, la période d'amortissement. Sinon ce logiciel a coûté plus cher
qu'il n'a rapporté.

Cette vision est, pour Quentin Adam, à l'origine de beaucoup de problèmes dans
le milieu de l'informatique. Il faut cesser d'avoir une vision budgétaire qui
provoque des situations absurdes comme l'équipe en charge de l'infrastructure
qui refuse d'héberger un nouveau service nécessaire à l'entreprise parce que ça
ferait exploser le budget annuel.

Pour cela, il ne faut pas considérer le devops comme un métier mais comme un
processus où les devs et les ops travaillent ensemble pour l'entreprise et non
l'un contre l'autre. Pour pousser le concept au maximum, voici ce qu'il faut
retenir :

> Tout dans l'entreprise doit avoir une API et un mail au CEO n'en est pas une.

## Beyond Multi-Tenancy: Introducing a New Container-Based Application Factory

[Damien Metzler](https://twitter.com/damienmetzler)
|
[slides](http://slides.com/thierrydelprat/beyond-multitenancy)

Le Multi-Tenancy consiste à avoir une seule application qui gère plusieurs
clients de manières totalement séparées. Chaque client a une plateforme complète
avec potentiellement plusieurs utilisateurs chacun, en toute autonomie. Le
problème de cette approche est de réussir à la rendre scalable.

Voici une approche de Nuxeo à base de conteneurs où chaque client dispose d'une
application complète et séparée. Cette approche a malgré tout des défauts,
notamment le prix des clients qui ne sont pas encore des clients payants. La
solution que Nuxeo a choisi est d'éteindre et de rallumer les conteneurs à la
demande et donc de développer des outils pour que ça se passe suffisamment
rapidement pour être utilisable. Leur choix final a été d'utiliser
[Rancher](http://rancher.com/) et l'idée derrière tout ça est assez intéressante à
mon avis.

## Algolia's Fury Road to a Worldwide API

[Olivier Lance](https://twitter.com/olance)
| [La version blog de la conf](https://stories.algolia.com/algolia-s-fury-road-to-a-worldwide-api-c1536c46f3a5#.wa1ilxirf)

Comment Algolia a réussi à fournir une API capable de répondre en millisecondes
n'importe où dans le monde. Cette conférence nous montre comment on peut partir
d'une volonté de l'entreprise à une réalité sur le terrain.

On y apprend que pour augmenter les performances, les recherches d'algolia
étaient faites en tant que module à nginx pour ne pas perdre de temps entre le
traitement d'une requête et sa résolution.

A partir de là, il a fallu améliorer la redondance des machines, leurs
disponibilités dans toutes les zones du globe et créer un système pour avoir une
possibilité de rollback en cas d'erreur. Ceci après qu'un bug lors d'une mise à
jour ait créé une panne de 8 minutes avant qu'un rollback n'ait pu être fait.

Un point intéressant quand on cherche la performance à ce point est qu'on peut
tomber sur des failles du protocole DNS : le domaine algolia.io était à la mode
mais les serveurs qui le gèrent n'étaient pas capables de tenir la charge. Il y
a maintenant plusieurs domaines en .net et .com pour gérer tout ça.

## I just hacked your app!

[Marcos Placona](https://twitter.com/marcos_placona)
|
[slides](https://speakerdeck.com/mplacona/i-just-hacked-your-app-takeoff-2016)

Il est étrange que dès qu'on passe dans le monde du mobile, on en oublie qu'il
faut respecter des règles simples de sécurité. Tour d'horizon des méthodes pour
obfusquer son code pour éviter d'obtenir n'importe quoi simplement en décompilant
une application web. Sans donner de nom, Marcos Placona nous a affirmé que des
app mobiles très connues permettent trop facilement d'obtenir des informations
sensibles (mais il craint le procès s'il donne des noms).

Des règles simples : utilisez du HTTPS ou des connexion sécurisées pour
communiquer avec vos serveurs, chiffrez les valeurs sensibles, utilisez les
options de sécurité quand elles existent (Certificate Pinning) et n'accordez
aucune confiance à un appareil utilisateur, ça pourrait être un faux.

## All those bots are gonna steal your job

[Yannick Schutz](https://twitter.com/yann_ck)
|
[slides](https://speakerdeck.com/ys/all-those-bots-are-gonna-steal-your-job)

Un aperçu du concept de chatops vu par Heroku. Gérer vos opérations de
déploiement, de mise à jour ou autre donne de la visibilité à toute l'équipe.
Utilisez du two factor authentification pour les changements importants
(déploiement en production par exemple) pour éviter des problèmes. Cependant,
n'oubliez pas de construire vos bots pour qu'ils puissent s'adapter à d'autres
plateformes que celle que vous utilisez actuellement (sans doute slack) au cas
où vous seriez amené à changer.

## APIs and the Bot Revolution

[Nicolas Grenié](https://twitter.com/picsoung)

Les bots sont en train de devenir les plus gros consommateurs d'API dans le monde
et cette tendance va sans doute aller en s'intensifiant. L'arrivée d'outils
comme l'Amazon Echo ou la Google Home est un bon indicateur.

Le problème qui va se poser dans les années à venir, c'est de fournir à ces
bots, des APIs qu'ils peuvent facilement exploiter. Par exemple, si l'on demande à
un Echo de nous expliquer ce que fait la startup Slack, on veut obtenir la
description de Slack, et non pas une liste de toutes les startups qui ont
"slack" dans leur nom. C'est pourquoi une API de ce type doit permettre
d'obtenir des résultats immédiats en plus de la liste des correspondances. Ceci
afin d'éviter de faire un appel qui renverra une liste de correspondances et
devoir faire un second appel pour obtenir les informations sur le premier
résultat.

Une API devra donc être pensée avec ce genre de contraintes et fournir les
résultats dans un ordre pertinent pour être vraiment utile. Il peut être
intéressant de se pencher du coté des API auto documentées. Les flux RSS vont
probablement finir dans cet état eux aussi à n'être plus consommés que par des
robots.

## Craftmanship, CSS and Vexillology

[Tim Carry](https://twitter.com/pixelastic)
|
[slides](http://talks.pixelastic.com/slides/css-flags-takeoffconf)

(Notez que ces slides sont censées fonctionner avec chrome mais n'ont pas de
garantie avec les autres navigateurs)

Le compagnonnage est une vieille pratique de l'artisanat qui se termine après une
longue période d'apprentissage par la réalisation d'un chef d'œuvre pour
prouver qu'on n'est plus un compagnon mais un expert. Tim nous a montré ce qu'il
s'est mis en tête de réaliser pour son chef d'œuvre : reproduire tous les
drapeaux du monde en CSS avec un seul `<div>` par drapeau.

> "Ce qui est important n'est pas le résultat mais le chemin".

## How to rescue tech migrants from Brexit

[Dan Garland](https://twitter.com/dmgarland/)
|
[slides](https://wegotcoders.github.io/takeoffconf2016)

Le brexit pourrait bien provoquer la fuite de développeurs anglais vers le reste
de l'Europe et donc la France. Dan nous a parlé des bonnes pratiques à avoir
pour accueillir des développeurs étrangers dans son entreprise :

- Le pair programming pour permettre l'apprentissage des termes spécifiques au
pays.
- Offrir une prime de relocalisation. Lui donner les bonnes adresses de la
ville, où trouver des gens avec qui discuter, faire la fête, en fonction de
ses goûts. Aider aux démarches administratives, notamment où trouver un
logement, comment faire des déclarations...

Et il faut être conscient qu'il peut y avoir des incompréhensions dues aux
différences culturelles. Aussi bien au niveau de mauvaises traduction. Dan nous
a donné un exemple, sa nourriture préférée : les pickles qu'il a essayé de
traduire par "la nourriture dans des préservatifs" ("food in preservatives").
C'est quelque chose qui va arriver mais qu'il faut prévoir et expliquer quand ça
arrive.

## Create modern APIs in minutes

[Kévin Dunglas](https://twitter.com/dunglas)
|
[slides](https://dunglas.fr/2016/10/slides-take-off-conf-2016-api-platform-the-php-framework-to-build-modern-web-apis/)

Présentation d'API Platform, un framework basé sur Symfony pour créer des API
hypermedia auto documentées rapidement. Le principe de l'hypermedia est
d'utiliser les URLs de l'API en tant qu'identifier de ressources qui gèrent de
manière automatique la pagination et le filtrage des données.

Ce framework est compatible avec [Swagger](http://swagger.io/), [Open
API](https://openapis.org/), [Hydra](http://www.markus-lanthaler.com/hydra/),
[json-ld](http://json-ld.org/), …  et promet de pouvoir créer une API qui
fonctionne en quelques minutes que l'on pourra ensuite pousser grâce à docker.

## Sharing Code Between Web and Native Apps

[Sebastian Witalec](https://twitter.com/sebawita)

NativeScript s'est allié à Google pour proposer un concurrent à React Native
avec une très bonne intégration de Native Script et d'Angular2. Avec cette
intégration, il suffit d'apprendre un nouveau langage de template pour
transformer son application écrite en Angular2 en application mobile native.

La promesse est intéressante pour qui utilise déjà Angular et qui veut
capitaliser sur ça pour développer une application mobile. Je ne suis pas
certain que se mettre à Angular pour cette raison soit une bonne idée cependant.
Mais NativeScript reste utilisable seul et avec n'importe quel autre système
puisque ça reste du JavaScript.

## Let your devices talk to each other

[Laurent Doguin](https://twitter.com/ldoguin)
|
[slides et demo](https://github.com/ldoguin/couchbase-messages-p2p-sample)

L'Internet des objets est actuellement ultra centralisé et les objets connectés ont pour énorme faille de devoir passer par un serveur pour communiquer entre eux. Deux ampoules connectées dans la même pièce vont devoir faire un aller retour sur internet pour avoir conscience l'une de l'autre. Ce n'est pas une fatalité et ce talk présente des pistes d'actions pour avoir un vrai réseau d'objet connectés qui soient réellement connectés entre eux.

Il était prévu une démonstration de cette technique avec une application codée
pour le besoin du talk mais il y a une autre limitation à ce genre de chose : un
routeur wifi doit être configuré pour autoriser la communication entre les
différents appareils. Ce qui montre bien qu'il reste pas mal de travail pour
atteindre un juste milieu entre sécurité et vie privée.

## Building a Web API with Hanami

[Christophe Philemotte](https://twitter.com/_toch)
|
[slides](https://speakerdeck.com/toch/build-a-web-api-with-hanami)

Ce talk nous a présenté Hanami au travers de l'exemple d'une API simple. Hanami
est fait pour être léger, thread safe, modulaire et non intrusif.

Quand on parle d'un framework Ruby, on ne peut pas s'empêcher de le comparer à
Rails et il n'a pas été tendre : Rails est un bon framework pour une application
qui fait du CRUD simple mais Hanami est plus facile à maintenir sur le long
terme, au niveau de la partie métier qui est mieux à sa place complètement
séparée de la logique applicative. Il existe aussi Sinatra mais qui lui est trop
léger pour une application complète.

Au final, il est admis qu'il faudra plus de code pour obtenir un résultat
similaire à Rails mais plus de code permet un meilleur découplage et de mieux
percevoir l'intention de chaque partie de code.

## Elixir a language for the Future

[João Moura](https://twitter.com/joaomdmoura)

Présentation d'Elixir et de ses apports à venir sur la façon de coder une
application web dans les années à venir. Le futur est dynamique et concurrent.
D'après, lui il faut limiter les contraintes au niveau du backend qui doit
accepter des données provenant de sources diverses et donc être dynamique mais
également pouvoir tenir la charge en toutes circonstances et donc être
concurrent.

Elixir se base sur Erlang et plus précisément sur sa machine virtuelle BEAM. Ce
qui permet à un programme en Elixir d'utiliser toutes les bibliothèques Erlang
existantes, d'avoir une gestion des processus extrêmement performante (João nous
a montré que son laptop pouvait faire tourner 1500 processus sur 8 cœurs sans
problème). Sa syntaxe est inspirée de celle de Ruby, sa philosophie autour de
l'expérience développeur également. Le langage est fonctionnel et permet tout
de même de faire de la méta-programmation.

Synbioz est d'accord avec la promesse de base en tout cas : [Elixir est le
futur](https://www.synbioz.com/offres-emploi). En résumé, et comme le dit le
co-créateur d'Erlang sur Elixir :

> "This is good shit."
>
> Joe Armstrong

## Tensorflow and deep learning, without a PhD

[Martin Görner](https://twitter.com/martin_gorner)
|
[slides](https://docs.google.com/presentation/d/1TVixw6ItiZ8igjp6U17tcgoFrLSaHWQmMOwjlgQY9co/pub?slide=id.p)

Présentation de [Tensorflow](https://www.tensorflow.org/), une bibliothèque python open source de machine learning. Au travers d'un exemple de reconnaissance de chiffres manuscrit, Martin Görner nous a montré comment améliorer les prédictions d'un algorithme étape par étape.

"Without a PhD" mais accrochez vous malgré tout. Le machine learning semble un
peu plus accessible après ce talk mais n'en reste pas moins compliqué. En
définitive, ce que j'en ai retenu, c'est qu'il fallait connaitre une série
d'algorithme prédictif, leur donner des paramètres de base, choisir un nombre
d'itérations et ensuite faire des essais pour obtenir de meilleurs résultats au
fur et à mesure de nos essais. Ça et le fait qu'une découverte en biologie a
permit de choisir un algorithme plus simple et plus efficace mais sans qu'on
sache réellement pourquoi : vive la science !

## Life Beyond Relational Database

[Arnaud Bailly](https://twitter.com/abailly)

Présentation de l'event sourcing, une autre façon d'envisager les bases de données qui consiste à enregistrer les évènements qui se produisent (nouvelle valeur du champ address) plutôt que d'écraser la donnée dans une table et de perdre l'ancienne irrémédiablement.

Une mise à jour de la base de donnée peut donc se contenter de contenir une date
et la nouvelle valeur d'un champ. Pas besoin de réécrire toute les données d'une
"table". Bien entendu, il existe des optimisations (à base de snapshot) pour
obtenir uniquement les dernières valeurs de chaque champ. Mais cette méthode
permet de toujours conserver l'historique des modifications et de réaliser des
undo/redo si l'on souhaite.

Pour ceux qui utilisent Redux ou Elm, l'event sourcing ressemble à la logique
des reducers/update qui existent dans ces deux technologies. À la nuance près
qu'on ne conserve pas forcément les anciennes données mais la logique est la
même.

## Functional Webapps: What's next?

[Mathias Dugué](https://twitter.com/m4d_z)
|
[slides](http://talks.m4dz.net/functional-webapps/#1)

Quoi choisir à l'heure actuelle pour réaliser le frontend d'un produit comme
Cozycloud ? Mathias Dugué a choisi une approche fonctionnelle du JavaScript et
expliqué pourquoi des solutions comme Ember, Angular ou React ne lui convenait
pas. React est une façon hype et moderne de construire des applications web mais
selon lui, cette solution n'est pas vraiment de la programmation réactive,
désespérément bloated et monoculturelle.

Sa recommandation actuelle est d'utiliser
[most.js](https://github.com/cujojs/most) pour la gestion de données ainsi que
que [Vue.js](https://vuejs.org/) pour l'affichage et de ne pas se soucier de la
mutabilité ou l'immutabilité des données mais plutôt de choisir un data store et
de le garder propre.

Je ne suis personnellement pas d'accord avec tout son point de vue ("Elm est
intéressant mais comme le dit Brendan Eich 'Always bet on JS'", "Stockez vos
données dans le DOM") mais chacun son avis. Mention spéciale au générique de fin
de slides cependant.

## ECMAScript 6 is so 2015! Meet ES2016

[Paul Verbeek](https://twitter.com/_paulverbeek)

Présentation des nouveautés de ES2016 et ES2017 (car ES2016 est très pauvre en fonctionnalité). Les nouvelles fonctionnalités de ES2016 sont donc :

- L'opérateur de factorisation : `**` qui fait la même chose que `Math.pow` et qui peut aussi s'utiliser en tant qu'assignation avec `**=`

~~~javascript
2 ** 3 === Math.pow(2, 3); // 8
let number = 2;
number **= 3 // number = number ** 3
~~~

- Array.protype.includes qui renvoie `true` si l'élément passé en paramètre fait partie du tableau. Pourquoi `includes` et pas `contains` ? À cause de mootools
qui étend le prototype d'Array avec contains et qui ne se comporte pas tout à
fait de la même façon.

ES2017 est lui plus complet et je ne vais pas entrer dans les détails mais voici la liste :

- [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) et [Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) et [padEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
- [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- Il sera permis d'ajouter une virgule à la fin des arguments d'une fonction comme c'est le cas dans les `Array` et les `Object` (Très peu de monde apprécie cette fonctionnalité :/).
- Et le très attendu `async/await` : vous pouvez vous renseigner sur  [cet article de ponyfoo](https://ponyfoo.com/articles/understanding-javascript-async-await) ou [cette vidéo de dotJS](http://www.thedotpost.com/2015/12/christophe-porteneuve-modern-asynchronous-javascript)

## Persistent storage tailored for containers

Quentin Hocquet
|
[slides](http://www.slideshare.net/infinit-one/persistent-storage-tailored-for-containers-dockersummit)

Présentation d'[Infinit](https://infinit.sh/) : une solution de stockage open
source décentralisée qui se marie bien avec la logique de conteneur Docker.
Cette solution est purement logicielle et cette conférence montrait le
cheminement pour arriver à obtenir un stockage fiable malgré l'éclatement des
données et ce sans avoir un node principal.

Le principe est d'ajouter des nœuds de stockage aussi facilement que de lancer
un conteneur Docker classique et de pouvoir scaler avec votre application.
L'architecture est très intéressante, notamment au niveau de l'immutabilité des
données (en dehors d'un block mutable qui contient la liste des autres blocs et
des métadonnées) et des astuces pour améliorer les performances au delà des
limites des systèmes de fichiers.

## React: From the Web to Native and back

[Hugo Agbonon](https://twitter.com/codeheroics)
|
[slides](http://codeheroics.github.io/talks/react-web-native-back/)

"Learn one, write everywhere" est la promesse de React. Le but est de pouvoir se
servir des fondamentaux de React dans d'autre environnements (mobile,
desktop,...). Par exemple, ce JSX pour le navigateur :

~~~javascript
const Pokemon = ({image, name}) => (
  <div>
    <img src={image}/>
    <span>{name}</span>
  </div>
)
~~~

donnera pour React Native :


~~~javascript
const Pokemon = ({image, name}) => (
  <View>
    <Image source={image}/>
    <Text>{name}</Text>
  </View>
)
~~~

Si cette syntaxe vous parait bizarre, n'hésitez pas à lire mon [introduction à
React](https://www.synbioz.com/blog/introduction_a_react).

Mais pourquoi ne pas envisager d'aller un peu plus loin et d'utiliser la
deuxième version directement pour le navigateur. Après tout, on peut facilement
recréer des composants qui auraient les mêmes noms et réimplémenter les
composants natifs. C'est le principe de
[react-native-web](https://www.npmjs.com/package/react-native-web) qui permet
donc malgré la jeunesse de ce projet (Hugo a du demander une mise à jour du
projet pour son talk) d'envisager de n'écrire qu'une fois son code pour
l'utiliser partout.

## Conclusion

Cette reprise de la Take Off augure de bonnes nouvelles pour la suite. Les
nouveaux organisateurs ont d'ores et déjà annoncé une nouvelle édition l'an
prochain et ils devraient capitaliser sur leurs réussites de cette année pour
s'améliorer par la suite.

L'avantage de la Take Off, c'est plein de petites choses : les soirées à Lille
après la conférence, des séances d'étirements entre deux talks, des périodes de
discussion régulières. Vivement l'année prochaine :)
