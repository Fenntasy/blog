---
title: "Ember2, Docker et variables d'environnement"
date:   2016-11-17 14:00:00 +0100
categories: javascript
remote_url: "https://www.synbioz.com/blog/variables_environnement_ember_2_docker"
---

Chez Synbioz, on parie sur docker, ce qui nous pousse parfois à travailler
différemment.

Travaillant actuellement sur une application Ember 2, j'ai été confronté à un
problème un peu particulier avec ces variables d'environnement.

Voici le contexte : j'ai une application Ember 2 qui a besoin d'utiliser un
script généré par une application Rails. Ce script est généré en fonction de
données de l'utilisateur et son dynamisme m'empêche de l'ajouter comme fichier
statique. Le problème : cette URL est différente en développement et en
production mais elle doit être chargée le plus tôt possible dans l'application.
Le plus pratique est donc de charger ce script directement dans le HTML de
l'application Ember.

Cependant, on ne dispose pas d'un accès complet au template de ce fichier HTML.
Voici le fichier HTML par défaut quand on crée une application nommée `test`
avec Ember 2.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {% raw %}{{content-for "head"}}{% endraw %}

    <link rel="stylesheet" href="{{rootURL}}assets/vendor.css">
    <link rel="stylesheet" href="{{rootURL}}assets/test.css">

    {% raw %}{{content-for "head-footer"}}{% endraw %}
  </head>
  <body>
    {% raw %}{{content-for "body"}}{% endraw %}

    {% raw %}<script src="{{rootURL}}assets/vendor.js"></script>{% endraw %}
    {% raw %}<script src="{{rootURL}}assets/test.js"></script>{% endraw %}

    {% raw %}{{content-for "body-footer"}}{% endraw %}
  </body>
</html>
```

Comme vous pouvez le voir, il y a des morceaux de templates qui pourraient nous
servir du type `{{content-for "body-footer"}}`. Ces morceaux ne sont là que pour
les addons d'ember-cli en théorie mais on peut réaliser un addon local avec la
commande `ember generate in-repo-addon env-var` (vous pouvez modifier `env-var`
si vous le souhaitez).

Cette commande va vous générer un dossier `env-var` dans un dossier `lib` qui
contient deux fichiers :

- package.json
- index.js

Le `package.json` ne fait qu'informer Ember de l'existence de l'addon et de son
nom. Le fichier intéressant est `index.js` qui doit contenir quelque chose comme :

```javascript
module.exports = {
  name: 'synbioz',
  isDevelopingAddon: function() {
    return true;
  }
};
```

C'est un fichier qui sera interprété par Node, d'où la présence de
`module.exports` et vous avez donc accès aux variables d'environnement :

```javascript
const environment = process.env.EMBER_ENV || 'development';
```

Ici, je n'accède qu'à `EMBER_ENV` mais vous pourriez accéder à n'importe quelle
variable d'environnement au travers de `process.env`.

Ensuite, vous pouvez utiliser le [hook
`contentFor`](https://ember-cli.com/extending/#content) des addons Ember pour
accéder aux différents `{{content-for}}` du fichier HTML de votre application.

```javascript
const environment = process.env.EMBER_ENV || 'development';

module.exports = {
  name: 'synbioz',
  contentFor: function(type, config) {
    if (type === "body-footer") {
      return `
    <script src="${config.myServer[environment]}assets/my-script.js"></script>
      `
    }
  },
  // …
}
```

`type` correspond aux arguments de `{{content-for}}` et vous pouvez très bien en
ajouter dans votre fichier HTML pour placer des choses à plus d'endroits.
`config` quant à lui est le contenu de votre fichier `config/environment.js` et
contient donc toutes les variables que vous y avez mis.

De mon coté, j'ai simplement ajouté un objet dans ma configuration qui contient
une entrée par environnement :

```javascript

module.exports = function(environment) {
  var ENV = {
    // …
    myServer: {
      development: "http://my.local.server",
      production: "https://production.server"
    }
  }
}
```

Voilà, avec ceci, vous serez en mesure d'ajouter des entrées dans votre HTML
d'application Ember en fonction de vos variables d'environnement (ou d'autres
paramètres tant qu'ils sont accessibles depuis Node).

---
L’équipe Synbioz.

Libres d’être ensemble.
