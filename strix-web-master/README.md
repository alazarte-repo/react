# LoJack

## Requerimientos
- [Node.js v6.x](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Getting started
### Instalar dependencias externas
    $ yarn install

### Correr el proyecto
    $ yarn start

### Correr tests
    $ yarn test
  Correr este comando automaticamente genera el reporte de coverage en el directorio `coverage`

### Build
    $ yarn build
  Correr este comando automaticamente genera el directorio ./dist en donde se enccuentra el bundle de toda la aplicacion, y luego de generarlo, levanta un servidor en el puerto 8080 para servir el build.

### Servir los archivos estáticos
    $ yarn build:static
  Correr este comando automaticamente genera el directorio  ./dist en donde se encuentra el bundle de toda la aplicacion

## Estructura
    .
    ├── actions
    ├── components
    ├── containers
    ├── img
    ├── layouts
    ├── reducers
    ├── sagas
    ├── selectors
    ├── services
    ├── styles
    ├── utils
    ├── favicon.png
    ├── App.container.js
    ├── App.jsx
    ├── config.js
    ├── constants.js
    ├── routes.jsx
    ├── indexReducers.js
    ├── indexSagas.js
    ├── index.ejs
    └── index.jsx

##### actions
Directorio que contiene todos los action creators de la aplicacion

##### components
Todos los componentes de la app. Mantener la estructura plana es lo ideal. Evitar dependencias entre estos componentes.

##### containers
Aca las cosas se ponen interesantes. La carpeta contiene `contenedores` en el sentido tradicional que solamente conectan al store de redux un componente o componentes nuevos que ademas de ser conectados al store agrupan otros componentes de la carpeta `components`. Estos componentes conectados no deben incluirse entre si en lo posible, si depende de otro componente deberian pasarse como children. Esta coordinacion la tiene que hacer el componente que renderiza a ambos.

##### layouts
Los layouts son eso, layouts. Los mismos son incluidos en `routes.jsx`. Estos layouts dentro tienen distintas rutas que corresponden a algun componente, generalmente proveniente de `containers`.

##### reducers
Directorio que contiene todos los reducers de la aplicacion

##### sagas
Directorio que contiene todas las sagas de la aplicacion

##### selectors
Directorio que contiene todos los selectors usados por los containers, divididos por dominio. Un container puede depender de multiples selectors

##### services
Servicios utilizados para realizar consultas al backend

##### utils
Algunas funciones comunes que se repiten en la aplicacion separadas en pequeños sets.
