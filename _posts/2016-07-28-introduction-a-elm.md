---
title: "Introduction à Elm"
date:   2016-07-28 14:00:00 +0100
categories: elm
remote_url: "https://www.synbioz.com/blog/introduction_a_elm"
---

Elm est un nouveau langage développé pour fournir un langage fonctionnel
statiquement typé pour le frontend.

Il a été créé par Evan Czaplicki dans le cadre d'un mémoire sur la programmation
fonctionnelle réactive en 2012 et est en train de devenir une option sérieuse
pour le développement d'application frontend.

L'un des buts du langage est d'appréhender les concepts de la programmation
fonctionnelle de manière pragmatique et agréable.

> Il n'est pas nécessaire de comprendre le schéma général pour être au point et
utiliser ce genre de choses. [...] Il n'est pas nécessaire de comprendre la
théorie dès le premier jour. Quand on veut connaitre la théorie derrière
l'addition, la multiplication, la rotation 3D dans l'espace autour d'un axe, on
appelle ça un groupe. C'est ce que c'est. Mais il n'est pas nécessaire d'en
parler dès le départ.<br />
<cite>Evan Czaplicki - [Let's be Mainstream](http://www.elmbark.com/2016/03/16/mainstream-elm-user-focused-design)</cite>

L'autre est de réaliser du code qui ne subira pas d'erreur au runtime,
facilement refactorable et plus facile à maintenir pour de grosses applications.


## Installation

L'installation est très simple : vous pouvez l'installer par npm : `npm install
-g elm`, par un [installeur pour Window ou Mac](http://elm-lang.org/install), ou
[avec docker](https://hub.docker.com/r/codesimple/elm/) (attention cependant,
avec docker, les commandes perdent leur tiret : `elm-make` devient `elm make` ...
etc).

Cette installation vous fournira 4 commandes : `elm-make` (le compilateur),
`elm-package` (le gestionnaire de paquets), `elm-reactor` (qui permet de tester
rapidement) et `elm-repl` (l'interpréteur).

## Bases et syntaxe

Commençons par les bases syntaxiques du langage. Elm est un langage typé mais ne
va pas vous demander d'écrire les types à la manière de Java. Elm va réaliser de
l'inférence de type, c'est à dire que le compilateur va tenter de deviner le
typage de vos fonctions. Par exemple, s'il y a une addition dans votre fonction
alors les deux termes qui entoure le + auront un type numérique. L'immutabilité
est présente par défaut sur la plupart des structures de données, ce qui
signifie qu'une fois qu'une expression a été assignée à une variable, celle ci
ne peut plus être modifiée. Une modification renverra toujours une copie et
laissera la variable initiale inchangée.

Les opérations classiques sont assez similaires et permettent de constater la
manière de typer de Elm par défaut. Pour tester tout ça, je vais utiliser
l'interpréteur de Elm qui se lance avec la commande `elm-repl`. Les lignes
commençant par un `>` sont celles que l'on tape à l'écran, les autres étant la
réponse de l'interpréteur. On peut également faire un passage à la ligne en
finissant sa ligne par `\`. Commençons par les nombres :

### Nombres

~~~haskell
> 1 + 1
2 : number

> 3 * 4
12 : number

> 10 / 3
3.3333333333333335 : Float

> 10 // 3
3 : Int
~~~

Comme vous pouvez le constater, il y a 3 types : `number`, `Float` et `Int`.
Dans le doute, Elm va typer avec `number` qui est une sorte de surtype (pour
être précis une pseudo typeclass) qui peut être à la fois `Int` et `Float`.
L'opérateur de division est `/` et renverra un Float. L'opérateur `//` renvoie
le quotient de la division (la fonction rem permet d'obtenir le reste).

### Strings

~~~haskell
> "hello" ++ " world"
"hello world" : String
~~~

L'opérateur pour la concaténation de chaines de caractère n'est pas `+` comme en
JavaScript mais `++`. La raison est fonctionnelle : `(+)` est une fonction en
elle même et pas uniquement du sucre syntaxique. Profitons en pour voir ce que
nous répond Elm si on tenter d'utiliser `+` directement.

~~~haskell
> "hello" + " world"
-- TYPE MISMATCH --------------------------------------------- repl-temp-000.elm

The left argument of (+) is causing a type mismatch.

4|   "hello" + " world"
     ^^^^^^^
(+) is expecting the left argument to be a:

    number

But the left argument is:

    String

Hint: To append strings in Elm, you need to use the (++) operator, not (+).
<http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#++>
~~~

Elm nous répond donc bien que la fonction `(+)` attends des arguments du type
`number` et pas du type `String`. Et l'une des forces du compilateur de Elm vient de
ses messages d'erreurs : en plus de nous dire clairement où il y a un problème,
le compilateur fera toujours de son mieux pour nous proposer une modification ou
un lien pour bien comprendre comment corriger l'erreur.

### Booléens

Cette partie va être assez rapide, il existe `True` et `False` et aucune valeur
nulle n'est possible, ni aucune valeur "truthy" ou "falsy" tel qu'il peut y en
avoir en JavaScript. On utilise `==` pour la comparaison, `/=` pour la
différence, `&&`, `||` `not` et `xor` pour les opérations logiques.

~~~haskell
> not True
False : Bool

> False && True
False : Bool

> xor True False
True : Bool

> True `xor` False
True : Bool
~~~

Une petite parenthèse cependant, `xor` est une fonction classique et non un
opérateur, la première utilisation est donc la façon normale de l'utiliser `xor
True False`. Elm permet dans le cas de fonctions à deux paramètres d'utiliser
cette fonction en tant qu'opérateur en utilisant des backticks, c'est pourquoi
```True `xor` False``` fonctionne correctement. C'est valable pour toute fonction
qui ont deux arguments.

### Fonctions

En parlant de fonctions, en Elm, la définition d'une fonction est réduite au
maximum : tout est fonction et il n'y a donc pas besoin de mot clé, pas de
parenthèses, pas de virgule. Le nom de la fonction et ses arguments sont à
gauche du signe `=`, le corps de la fonction à droite. Il n'y a pas non plus de
`return` car une fonction en Elm renvoie toujours quelque chose. Cette fonction
en JavaScript

~~~javascript
const add = function(a, b) {
  return a + b;
}
~~~

devient donc en Elm

~~~haskell
add a b = a + b
~~~

Intéressons nous au typage de cette fonction d'après `elm-repl` : `<function> :
number -> number -> number`.   C'est une notation assez étrange de prime abord
mais voici le fonctionnement : le dernier paramètre est le type de retour de la
fonction, les types précédents sont les arguments dans l'ordre. Notez qu'Elm a
détecté tout seul le typage grâce à la définition de la fonction. On utilise la
fonction `(+)` donc notre fonction renvoie un `number` et ne peut accepter que
des `number` également.

Cependant, pourquoi n'est ce pas présenté par quelque chose de ce type `number,
number -> number` ? Les arguments à gauche et le retour de la fonction à droite.
Eh bien parce que les fonctions en Elm sont capables d'accepter un nombre
incomplet de paramètres, elle renverront toujours une fonction qui attend les
paramètres restants. C'est le principe du currying. Autrement dit, je peux
appeler `add` avec un seul paramètre et avoir une nouvelle fonction qui va
toujours additionner le même nombre.

~~~haskell
> add3 = add 3
<function> : number -> number

> add3 6
9 : number
~~~

`add3` est ici une nouvelle fonction dont le type n'est plus que `number ->
number`. C'est pourquoi le type de `add`, avec des parenthèses ajoutées pour
bien comprendre pourrait être `number -> (number -> number)`, c'est à dire une
fonction qui a pour paramètre un nombre qui renvoie une fonction qui a pour
paramètre un nombre et qui renvoie un nombre.

Pour illustrer l'intérêt, essayons un exemple pratique. La fonction
[clamp](http://package.elm-lang.org/packages/elm-lang/core/1.0.0/Basics#clamp)
permet de borner un nombre entre les deux premières valeurs. Si l'on veut
permettre à un personnage de ne se déplacer qu'entre les pixels 100 et 200 :

~~~haskell
> clamp 100 200 50
100 : number

> clamp 100 200 500
200 : number

> clamp 100 200 146
146 : number
~~~

Or, répéter à chaque fois les deux premiers paramètre est un peu rébarbatif et
peu agréable à modifier. La méthode classique consisterait à définir deux
constantes et les utiliser dans chaque appel de fonction mais si on voulait
changer la façon de gérer les bornes, il faudrait remplacer tous les appels de
fonctions. Tandis qu'avec du currying, on peut créer notre propre fonction
`getContainedPosition` que l'on peut réutiliser à loisir.

~~~haskell
> getContainedPosition = clamp 100 200
<function> : number -> number

> getContainedPosition 50
100 : number

> getContainedPosition 500
200 : number

> getContainedPosition 146
146 : number
~~~

De cette façon, on peut indiquer l'intention qu'à cette fonction (ici obtenir
une position) tout en ayant fixé les valeurs sans avoir besoin de constantes.
L'avantage étant qu'on pourrait parfaitement réécrire la façon de gérer cette
fonction sans avoir besoin de modifier le programme ailleurs. Un autre exemple
tiré d'une [présentation de Elm de Richard
Feldman](https://www.youtube.com/watch?v=zBHB9i8e3Kc) est la fonction
`pluralize`.

~~~haskell
> pluralize singular plural count = if count == 1 then singular else plural
<function> : a -> a -> number -> a

> pluralize "shelf" "shelves" 1
"shelf" : String

> pluralize "shelf" "shelves" 5
"shelves" : String

> pluralizeShelves = pluralize "shelf" "shelves"
<function> : number -> String

> pluralizeBooks = pluralize "book" "books"
<function> : number -> String
~~~

À partir d'une fonction générique, on peut définir très rapidement des fonctions
spécifiques qui reposent sur la même base et qui n'attendent plus qu'un dernier
argument pour être évaluées comme on le souhaite. Notez que la première
définition de pluralize est `a -> a -> number -> a`, `a` représente n'importe
quel type mais dans la définition d'une fonction, il doit rester le même. On
peut utiliser cette fonction avec autre chose que des strings mais on doit être
cohérent. Par exemple :

~~~haskell
> pluralize 1 2 5
2 : number

> pluralize 1 "beaucoup" 5
-- TYPE MISMATCH --------------------------------------------- repl-temp-000.elm

The 2nd argument to function `pluralize` is causing a mismatch.

3|   pluralize 1 "beaucoup" 5
                 ^^^^^^^^^^
Function `pluralize` is expecting the 2nd argument to be:

    number

But it is:

    String

Hint: I always figure out the type of arguments from left to right. If an
argument is acceptable when I check it, I assume it is "correct" in subsequent
checks. So the problem may actually be in how previous arguments interact with
the 2nd.
~~~

Dès lors qu'on donne un type explicite au type `a`, Elm s'attend à ce que les
autres instances de ce type soit identique, d'où le fait qu'il s'attend à ce
que mon deuxième argument soit `number`dans cet exemple.

Pour finir sur les fonctions, il est possible de définir une fonction anonyme en
modifiant deux choses à la syntaxe : une fonction anonyme commence par un `\` et
le `=` est remplacé par `->`. On peut utiliser une fonction anonyme directement
dans une expression (si on veut réaliser un filtre simple par exemple) ou
l'assigner à une variable. La fonction `add` montrée plus haut pourrait donc
s'écrire :

~~~haskell
> add = \a b -> a + b
<function> : number -> number -> number
~~~


### Listes

~~~haskell
> numbers = [ 1 , 2 , 3 , 4 , 5 ]
[1,2,3,4,5] : List number

> words = [ "hello", "world" ]
["hello","world"] : List String
~~~

La syntaxe est la même qu'en JavaScript pour créer un `Array` mais Elm étant
typé, une liste ne peut contenir que des valeurs similaires. Contrairement à
JavaScript, une liste n'a aucune méthode directement, on utilise les fonctions
de `List` pour réaliser des opérations. Autre chose à prendre en compte, une liste
en Elm est une linked list, la nuance principale est qu'il n'est pas possible
d'obtenir une valeur à un index donné avec une List comme c'est possible avec un
Array. Le type Array existe cependant en Elm et la fonction `Array.fromList`
permet d'effectuer la conversion si c'est nécessaire.

En pratique cependant, il existe des fonctions pour s'en passer très bien. On
retrouve les fonctions existantes en JavaScript et d'autres langages : `map`,
`filter` et `reduce` sous la forme de `List.map`, `List.filter` et `List.foldl`.

~~~haskell
> numbers = [ 1 , 2 , 3 , 4 , 5 ]
[1,2,3,4,5] : List number

> List.filter (\n -> n % 2 == 0) numbers
[2,4] : List Int

> List.map (\n -> n + 2) numbers
[3,4,5,6,7] : List number

> List.foldl (+) 0 numbers
15 : number

> List.sum numbers
15 : number
~~~

Les listes en Elm sont également immutable, ce qui signifie qu'il n'y a pas de
fonction `push`. Pour augmenter la taille d'une liste, on peut utiliser
`List.append` qui ajoute une liste à une autre ou l'opérateur `(::)` qui ajoute
un élément au début d'une liste.

~~~haskell
> 0 :: numbers
[0,1,2,3,4,5] : List number

> List.append numbers [ 6 ]
[1,2,3,4,5,6] : List number
~~~

### Records

Un record correspond à un objet en JavaScript et s'écrit presque de la même
façon, la seule différence étant le `=` à la place du `:` pour définir les
valeurs.

~~~haskell
> czaplic = { name = "Evan", company = "noredink" }
{ name = "Evant", company = "noredink" } : { company : String, name : String }

> czaplic.name
"Evan" : String

> .name czaplic
"Evan" : String
~~~

Les deux manières d'accéder à un champ sont présentées ci dessus : on peut soit
y accéder comme en JavaScript en le suivant d'un `.` et du nom de la clé, soit
en utilisant un sucre syntaxique en inversant les deux et en utilisant une
fonction qui commence par un `.` et qui est suivi du nom de la clé. Cette façon
de faire peut s'avérer utile dans le cas d'un `map` par exemple.

~~~haskell
> List.map .name [czaplic, czaplic, czaplic]
["Evan","Evan","Evan"] : List String
~~~

Un record est immutable, il ne sera donc pas possible de modifier directement
ses valeurs, mais on peut utiliser la syntaxe d'update de record pour obtenir un
nouveau record avec les modifications.

~~~haskell
> { czaplic | name = "Bob" }
{ name = "Bob", company = "noredink" } : { company : String, name : String }

> czaplic
{ name = "Evan", company = "noredink" } : { company : String, name : String }
~~~

Cette syntaxe est donc du type `{ RECORD | key = value, key2 = value2, ... }`,
l'ordre n'a pas d'importance après le `|`. Attention, un record est une
structure typée, on ne peut pas ajouter des clés à volonté sans redéfinir un
autre record complètement.

~~~haskell
> { czaplic | name = "Bob", age = 26 }
-- TYPE MISMATCH --------------------------------------------- repl-temp-000.elm

`czaplic` is being used in an unexpected way.

4|   { czaplic | name = "Bob", age = 26 }
       ^^^^^^^
Based on its definition, `czaplic` has this type:

    { ..., company : ... }

But you are trying to use it as:

    { c | ..., age : ... }
~~~

### Tuples

Un tuple est une façon plus concise d'écrire un record sans nommer tous les
paramètres. Chaque paramètre peut avoir n'importe quel type et on peut donc le
voir comme une syntaxe entre le record et la liste.

~~~haskell
> ( "ok", 1 )
("ok",1) : ( String, number )

> ( "nok", 0 )
("nok",0) : ( String, number )

> fst ( "ok", 1 )
"ok" : String

> snd ( "ok", 1 )
1 : number
~~~

Une utilisation commune est d'envoyer un état et une valeur associée comme je
l'ai montré dans cet exemple. Les fonctions `fst` et `snd` ne fonctionnent que
sur des tuples de longueur 2 mais un tuple peut avoir une taille indéfinie.
Cependant, c'est une bonne pratique d'utiliser des records pour les tuples de
plus de 2 ou 3 valeurs pour améliorer la clarté.

### Maybe

Maintenant que nous avons vu les équivalences avec un langage tel que
JavaScript, allons un petit peu plus loin avec une structure plus étrange : la
`Maybe`. L'un des choix de Elm est d'interdire `null` (ou `nil` ou
`undefined`...), ce qui veut dire que quand on attend un `Int` dans une
fonction, on aura un `Int` et pas soit un entier soit une valeur nulle (0 étant
bien entier).

Pour palier ce problème, une des réponses a été la structure `Maybe` qui est une
union de type, c'est à un dire une valeur qui peut être soit du type `Nothing`,
soit du type `Just a`. On pourrait penser que la nuance entre ça et une bête
valeur nulle est minime mais le fait d'avoir des types explicites pour ça a
plusieurs conséquences. La première est qu'on peut combiner ces structures pour
faire quelque chose de pratique (je vais donner des exemples), la seconde est
qu'on peut savoir à la compilation si des cas où une donnée pourrait être nulle
ont été oublié ou pas. Le compilateur nous force à gérer les cas d'erreur,
contrairement à JavaScript (ou d'autres langages) où on aura tendance à négliger
les erreurs possibles.

Par exemple, la fonction `List.head` renvoie une `Maybe` car son utilisation sur
une liste vide pourrait provoquer une erreur. Regardons ce qu'on peut en faire.

~~~haskell
> List.head [ 1, 2 ]
Just 1 : Maybe.Maybe number

> List.head []
Nothing : Maybe.Maybe a

> Maybe.map sqrt (List.head [ 2 ])
Just 1.4142135623730951 : Maybe.Maybe Float
~~~

Les deux premiers exemples montrent comment fonctionne `List.head` avec une liste
vide et une qui contient des nombres. Ensuite, on voit comment utiliser
`Maybe.map` : cette fonction permet d'utiliser une fonction classique sur une
`Maybe`, ce qui permet donc de créer des fonctions classiques mais de les
utiliser avec des valeurs potentielles.

~~~haskell
> toValidMonth month = \
|   if month >= 1 && month <= 12 then \
|     Just month \
|   else \
|     Nothing
<function> : number -> Maybe.Maybe number'

> List.head [12] `Maybe.andThen` toValidMonth
Just 12 : Maybe.Maybe number

> List.head [18] `Maybe.andThen` toValidMonth
Nothing : Maybe.Maybe number

> List.head [] `Maybe.andThen` toValidMonth
Nothing : Maybe.Maybe number
~~~

Ici, on part d'une fonction qui va prendre un `Int` en entrée et renvoyer une
`Maybe Int` en sortie selon si le nombre est compris entre 1 et 12. On peut
ensuite utiliser `Maybe.andThen` avec des backticks pour améliorer la lecture et
chainer le résultat de `List.head` à notre fonction. Le type de `andThen` est le
suivant : `Maybe a -> (a -> Maybe b) -> Maybe b`. En français, on lui passe une
`Maybe` de type `a`, une fonction qui prend un `a` et renvoie une `Maybe` de
type `b` (dans notre cas, `a` et `b` sont identiques) et renvoie donc une
`Maybe` de type `b`.

## The Elm Architecture

Maintenant que nous avons vu tout ça et une fois que ce sera digéré, nous
pouvons nous attaquer au prochain morceau de Elm : son architecture ! En effet,
Elm a été pensé strictement pour réaliser des programmes en frontend. Et pour
ça, Elm propose (sans imposer mais presque) une façon de faire claire et arrêtée
dans ses opinions.

Il y a 3 composants de base dans l'architecture que propose Elm : un modèle qui
contient l'état de l'application, une vue qui représente l'application en
fonction de son état et une fonction d'update qui va réaliser des changements de
l'état de l'application en fonction de message qui peuvent venir de
l'utilisateur, d'une api ou d'un serveur. Prenons l'exemple basique d'[un
compteur composé de deux boutons et d'une
valeur](http://elm-lang.org/examples/buttons). Le lien précédent vous emmène
vers une zone de test fournie par le site de Elm qui permet d'avoir d'un coté le
code, de l'autre le rendu directement. Épluchons le code petit à petit.

~~~haskell
import Html exposing (div, button, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)


main =
  beginnerProgram { model = 0, view = view, update = update }
~~~

On voit ici la façon d'importer des modules de Elm, `exposing` permet de choisir
ce qu'on veut importer dans ce que propose le module. Si on voulait toutes les
fonctions fournies par `Html`, on pourrait écrire `import Html exposing (..)`.
Un programme en Elm utilise la fonction main comme point d'entrée et on voit ici
que Elm fournit une fonction pour faciliter la chose au travers de
`begginerProgram` qui attend un Record qui contient un model, une vue et une
fonction d'update.

~~~haskell

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
~~~

On enchaine avec la vue. C'est ce qui donnera notre html au final. C'est une
représentation de ce à quoi on veut que notre rendu final ressemble. On n'écrit
pas directement du html mais bien une abstraction au dessus. Chaque élément html
a une fonction associée (ici `div` et `button`) et fonctionne de la même manière :
chaque fonction attend une liste d'attributs et une liste d'enfants. Il faut
représenter les nœuds de texte et ne pas oublier de convertir les valeurs du
modèle en string si besoin (ici à l'aide de `toString`). L'attribut `onClick`
est un peu particulier car il va permettre d'envoyer un message à la fonction
d'update. On utilise un type qui est la ligne suivante du programme.

~~~haskell
type Msg = Increment | Decrement
~~~

On définit un nouveau type à l'aide d'une union de types. `Increment` et
`Decrement` sont des valeurs arbitraires (une sorte de symbole) qui sert ensuite à
faire du pattern matching dans la fonction d'update.

~~~haskell
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1
~~~

On voit alors une nouvelle syntaxe ici `case msg of`. C'est une sorte de switch
dopé. `msg` est la valeur envoyée par `onClick` plus haut, et `msg` est de type
`Msg` et un `case of` force à gérer tous les cas possible. Par exemple, si on
modifie `Msg` de cette façon et que l'on essaie de compiler :

~~~
type Msg = Increment | Decrement | Reset
~~~
On obtient l'erreur

~~~haskell
Detected errors in 1 module.
==================================== ERRORS ====================================



-- MISSING PATTERNS ------------------------------------------------------------

This `case` does not have branches for all possibilities.

23|>  case msg of
24|>    Increment ->
25|>      model + 1
26|>
27|>    Decrement ->
28|>      model - 1

You need to account for the following values:

    Temp1469624573986753.Reset

Add a branch to cover this pattern!

If you are seeing this error for the first time, check out these hints:
<https://github.com/elm-lang/elm-compiler/blob/0.17.0/hints/missing-patterns.md>
The recommendations about wildcard patterns and `Debug.crash` are important!
~~~

C'est une partie importante de l'architecture, on définit un type qui contient
tous les messages (les évènements) que l'application peut recevoir et ensuite on
doit gérer chacun de ces cas. Il n'est pas permis d'ignorer un cas (ou tout du
moins, on doit le faire volontairement et explicitement). Si on veut ne plus
avoir l'erreur précédente, on doit ajouter le cas du `Reset`.

~~~haskell
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

    Reset ->
      0
~~~

Et à modifier la vue pour avoir un bouton qui permet d'effectuer le reset

~~~haskell

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    , button [ onClick Reset ] [ text "reset" ]
    ]

~~~

Voilà, ça sera tout pour cette fois. Je vous invite à tester un peu les
différents [exemples disponibles](http://elm-lang.org/try) pour vous faire une
idée des possibilités et à tenter des modifications pour voir ce que vous répond
le compilateur. Pour plus d'informations, voici des sources à jour.


## Sources

[Le site officiel de Elm](http://elm-lang.org/)

[LE guide](http://guide.elm-lang.org/)

[Building a live validated signup form in Elm (noredink)](http://tech.noredink.com/post/129641182738/building-a-live-validated-signup-form-in-elm)

[Some thoughts on Elm
development](https://medium.com/@NewMountain/some-thoughts-on-elm-development-39a0f8a9002a#.7jzwb3opp)


L’équipe Synbioz.

Libres d’être ensemble.
