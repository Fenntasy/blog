---
layout: post
title:  "Introduction à React"
date:   2016-04-21 14:00:00 +0100
categories: javascript
remote_url: "https://www.synbioz.com/blog/introduction_a_react"
---

React n'est pas à proprement parler un framework mais se présente comme une bibliothèque JavaScript pour créer des interfaces utilisateurs. React est la réponse de Facebook à un problème récurrent : créer des interfaces réutilisables et _stateful_ (je reviendrai sur ce terme au cours de l'article).

!["logo React"](http://www.synbioz.com/images/articles/20160412/discover-react_thumb_450.png)

Tout d'abord, React est basé sur virtual-dom : un composant React ne crée pas de HTML mais une représentation sous forme d'objets et de nœuds de ce à quoi le HTML final doit ressembler. Virtual-dom va prendre en compte cette représentation, la comparer au DOM réel et en déduire les opérations minimales à exécuter pour que le DOM réel soit conforme au virtuel. C'est grâce à cet outil que React peut partir du principe qu'il est plus simple de "remplacer" toute l'interface quand elle doit être modifiée plutôt que de modifier au fur et à mesure le DOM comme jQuery ou AngularJS pouvaient le faire.

L'intérêt de cette approche est assez simple. On reproche souvent à JavaScript d'être lent alors que c'est DOM qui l'est. Avoir une représentation sous forme d'arbre en JavaScript permet de réaliser beaucoup plus d'opérations, d'utiliser les meilleurs algorithmes de comparaison d'arbres et, cerise sur le gâteau, de faire toutes les modifications du DOM en une opération plutôt qu'au fur et à mesure. Virtual-dom est également bien plus facile à mettre à jour et à améliorer que les différentes implémentations de DOM dans les navigateurs.

Prenons un exemple pour expliquer tout ça. Voici le « hello world » de React (en ES2015)

~~~javascript
import React from "react";
import ReactDOM from "react-dom";

const Hello = React.createClass({
  render() {
    return React.createElement('div', null, "hello world")
  }
});

ReactDOM.render(React.createElement(Hello), document.getElementById("app"));
~~~

[voir sur CodePen](http://codepen.io/Fenntasy/pen/WwMYpO?editors=1010)

L'appel `ReactDOM.render` va exécuter la fonction `render` et récupérer un arbre DOM virtuel, le comparer à l'arbre DOM contenu dans l'élément qui a pour identifiant `app` et y ajouter le texte "hello world". `React.createElement` prend en paramètre l'élément HTML, un objet d'attributs et des enfants (tous les paramètres après le 2ème seront des enfants). Rien d'extraordinaire pour le moment mais ajoutons un peu d'interactivité (et oublions les `import` par simplicité).

~~~javascript
const Hello = React.createClass({
  getInitialState() {
    return {
      hello: "world"
    };
  },
  handleInputChange(e) {
    this.setState({
      hello: e.target.value
    });
  },
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'input',
        {
          value: this.state.hello,
          onChange: this.handleInputChange
        },
        null
      ),
      React.createElement(
        'div',
        null,
        "hello " + this.state.hello
      )
    );
  }
});

ReactDOM.render(React.createElement(Hello), document.getElementById("app"));
~~~

[voir sur CodePen](http://codepen.io/Fenntasy/pen/zqRMwM?editors=1010)

Revenons au concept de _stateful_ : ici, notre composant a un état (_state_) dont la valeur par défaut est définie dans `getInitialState`. On peut y accéder dans `render` avec `this.state` et on l'assigne à la fois en valeur à notre _input_ et en texte. On utilise l'attribut `onChange` (comme en HTML) sur notre _input_ pour lier l'évènement à une fonction du composant qui a la charge de mettre à jour l'état par la méthode `setState` et c'est là que le virtual-dom entre en jeu. Appeler `setState` va provoquer un rendu (_render_), dont la valeur de retour va être différente du DOM actuel et les changements seront donc appliqués.

### JSX

Passons à un autre élément important de React : les appels à `React.createElement` sont très vite verbeux et pas forcément évidents à lire. La solution classique à ce problème est JSX : une extension de la syntaxe JavaScript qui ressemble au HTML. Le même exemple ci dessus avec JSX donne :

~~~javascript
const Hello = React.createClass({
  getInitialState() {
    return {
      hello: "world"
    };
  },
  handleInputChange(e) {
    this.setState({
      hello: e.target.value
    });
  },
  render() {
    return (
      <div>
        <input value={this.state.hello} onChange={this.handleInputChange} />
        <div>hello {this.state.hello}</div>
      </div>
    );
  }
});

ReactDOM.render(<Hello />, document.getElementById("app"));
~~~

[voir sur CodePen](http://codepen.io/Fenntasy/pen/LNQXLK?editors=1010)

Il existe deux avantages à cette approche au delà de la concision : se rapprocher du résultat final par la ressemblance au HTML et adopter une mentalité déclarative. `render` est une fonction qui doit être la plus rapide possible car elle va être invoquée très fréquemment, il est donc important d'éviter de réaliser trop d'opérations à l'intérieur. Adopter JSX renforce l'idée que `render` ne doit faire que déclarer la forme du rendu final.

Cependant JSX nécessite une phase de transpilation : elle peut être réalisée avec [Babel](https://babeljs.io/), directement avec la version 5, ou via le _preset_ "React" pour Babel 6. Babel 6 a en effet été totalement réécrit pour être modulaire et ne fait aucune transformation par défaut : il y a maintenant un plugin par transformation et les _presets_ sont un regroupement de ces transformations. Le _preset_ ES2015 par exemple permet les transformations qui correspondent aux nouveautés de la dernière version de JavaScript.

Il existe d'autres façons de faire si la transpilation ou le JSX vous déplait, notamment [React-hyperscript](https://github.com/mlmorg/React-hyperscript) qui simplifie l'écriture avec une fonction `h` du type `h(componentOrTag, properties, children)` ou encore [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) qui s'inspire de Elm pour fournir des fonctions dont les noms sont ceux des éléments `div()`, `ul()`…

### Props et functional components

Il est possible d'avoir un état dans tout composant React mais il est recommandé de se limiter le plus possible car de tels composants deviennent plus complexes et il n'est pas possible de faire remonter les données vers un composant parent. Les propriétés (_props_) sont là pour pallier ce problème. Outre les attributs HTML classiques, on peut passer n'importe quel couple clé/valeur à un composant React. Le composant Hello pourrait être transformé pour être réutilisable avec différentes valeurs.

~~~javascript
const Hello = React.createClass({
  render() {
    return <div>hello {this.props.who}</div>;
  }
});

ReactDOM.render(<Hello who="Synbioz" />, document.getElementById("app"));
~~~

De plus, depuis React 0.14 (aka React 14), il est possible de réaliser des composants sous forme d'une simple fonction, essentiellement la fonction `render`. C'est ce qu'on appelle la plupart du temps des _functional components_. Cette fonction prend en paramètre l'objet représentant les propriétés (_props_). En utilisant le _destructuring_ d'ES2015, on peut donc transformer le composant Hello de cette façon :

~~~javascript
const Hello = function({who}) {
  return <div>hello {who}</div>;
}

ReactDOM.render(<Hello who="Synbioz" />, document.getElementById("app"));
~~~

Et à partir de là, on peut faire remonter les interactions vers un composant de plus haut niveau pour composer avec cet élément.

~~~javascript
const Hello = function({who}) {
  return <div>hello {who}</div>;
}

const App = React.createClass({
  getInitialState() {
    return {
      hello: "world"
    };
  },
  handleInputChange(e) {
    this.setState({
      hello: e.target.value
    });
  },
  render() {
    return (
      <div>
        <input value={this.state.hello} onChange={this.handleInputChange} />
        <Hello who={this.state.hello} />
        <Hello who={this.state.hello.split("").reverse().join("")} />
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById("app"));
~~~

[voir sur CodePen](http://codepen.io/Fenntasy/pen/vGdvap?editors=1010)

Utiliser en priorité les _props_ est conseillé pour la réutilisabilité : sans état, un composant est plus simple à prendre en main et son rendu est parfaitement prévisible ; donc plus simple à tester et à débugger. Cependant, il n'est pas nécessaire de n'avoir qu'un composant qui gère toutes les données de l'application. Un module précis (ex : un accordéon) pourrait stocker dans son état quelques informations qui ne concernent que lui. De la même façon, il vaut mieux n'utiliser l'état que pour des informations d'interface ou des petites données. Si vos besoins venaient à être plus importants, il vaut mieux s'orienter vers une bibliothèque dédiée basée sur [Flux](http://facebook.github.io/flux/) ou [Redux](http://redux.js.org/).

L’équipe Synbioz.

Libres d’être ensemble.
