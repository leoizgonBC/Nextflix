# Nextflix

Aplicacion web inspirada en Netflix para explorar, buscar y gestionar peliculas. Desarrollada con **Angular 19** utilizando componentes standalone y persistencia local con `localStorage`.

---

## Tabla de contenidos

- [Caracteristicas](#caracteristicas)
- [Capturas](#capturas)
- [Tecnologias](#tecnologias)
- [Requisitos previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Catalogo de peliculas](#catalogo-de-peliculas)
- [Funcionalidades detalladas](#funcionalidades-detalladas)

---

## Caracteristicas

- Carrusel hero rotativo con peliculas destacadas
- Busqueda en tiempo real por titulo, genero y sinopsis
- Filtrado por genero y ordenacion por valoracion, anio o titulo
- Sistema de favoritos con animacion de confeti
- Historial de peliculas vistas
- Valoraciones like/dislike por pelicula
- Modal de detalle con trailer de YouTube embebido
- Peliculas relacionadas por genero
- Compartir peliculas copiando la URL
- Gestion de perfiles de usuario con seleccion de avatar
- Skeleton loading para mejorar la experiencia de carga
- Scroll horizontal en filas de peliculas
- Pagina 404 personalizada al estilo Netflix
- Diseno responsive
- Persistencia de datos en `localStorage`

---

## Tecnologias

| Tecnologia | Version |
|---|---|
| Angular | 19.0.0 |
| TypeScript | 5.6.2 |
| RxJS | 7.8.x |
| Zone.js | 0.15.x |
| SCSS | - |
| Karma + Jasmine | Testing |
| Angular CLI | 19.0.6 |

---

## Requisitos previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** (opcional, se puede usar via `npx`)

```bash
npm install -g @angular/cli
```

---

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/leoizgonBC/Nextflix.git
cd Nextflix/nextflix
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
ng serve
```

4. Abre el navegador en [http://localhost:4200](http://localhost:4200)

---

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `ng serve` | Inicia el servidor de desarrollo en `localhost:4200` |
| `ng build` | Compila el proyecto para produccion en `/dist` |
| `ng test` | Ejecuta los tests unitarios con Karma |
| `ng build --watch` | Compila en modo watch con configuracion de desarrollo |

---

## Estructura del proyecto

```
nextflix/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero-carousel/        # Carrusel rotativo de peliculas destacadas
│   │   │   ├── movie-card/           # Tarjeta individual de pelicula
│   │   │   ├── movie-modal/          # Modal con detalle, trailer y valoraciones
│   │   │   ├── movie-row/            # Fila horizontal scrollable de peliculas
│   │   │   ├── navbar/               # Barra de navegacion con buscador
│   │   │   └── skeleton-card/        # Placeholder de carga con shimmer
│   │   ├── pages/
│   │   │   ├── home/                 # Pagina principal con generos y carrusel
│   │   │   ├── movie-detail/         # Pagina completa de detalle de pelicula
│   │   │   ├── my-list/              # Favoritos e historial de visionado
│   │   │   ├── profile-select/       # Seleccion y gestion de perfiles
│   │   │   └── not-found/            # Pagina 404 personalizada
│   │   ├── services/
│   │   │   ├── movie.service.ts      # Datos y operaciones sobre peliculas
│   │   │   ├── favorites.service.ts  # Gestion de favoritos
│   │   │   ├── watch-history.service.ts # Historial de visionado
│   │   │   ├── rating.service.ts     # Sistema de like/dislike
│   │   │   └── user-profile.service.ts  # Perfiles de usuario y avatares
│   │   ├── models/
│   │   │   └── movie.interface.ts    # Interfaces TypeScript
│   │   ├── app.component.ts          # Componente raiz
│   │   ├── app.routes.ts             # Configuracion de rutas
│   │   └── app.config.ts             # Configuracion de la aplicacion
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                   # Estilos globales
├── public/                           # Assets estaticos
├── angular.json                      # Configuracion de Angular CLI
├── tsconfig.json                     # Configuracion base de TypeScript
├── tsconfig.app.json                 # Configuracion TS para la app
├── tsconfig.spec.json                # Configuracion TS para tests
├── package.json
└── .gitignore
```

---

## Rutas

| Ruta | Pagina | Descripcion |
|---|---|---|
| `/` | Home | Pagina principal con carrusel y secciones por genero |
| `/movie/:id` | Movie Detail | Detalle completo de una pelicula |
| `/my-list` | My List | Favoritos e historial en pestanas |
| `/profile` | Profile Select | Gestion de perfiles de usuario |
| `**` | Not Found | Pagina 404 personalizada |

---

## Catalogo de peliculas

La aplicacion incluye **39 peliculas** organizadas en **7 generos**:

| Genero | Peliculas | Ejemplos |
|---|---|---|
| Sci-Fi | 7 | Inception, Interstellar, The Matrix, Dune |
| Action | 6 | The Dark Knight, Gladiator, John Wick, Top Gun Maverick |
| Drama | 7 | Fight Club, Shawshank Redemption, Forrest Gump, Whiplash |
| Crime | 5 | Pulp Fiction, The Godfather, Goodfellas, City of God |
| Thriller | 6 | Parasite, Se7en, Gone Girl, The Silence of the Lambs |
| Horror | 4 | The Shining, Get Out, Hereditary, Alien |
| Comedy | 4 | The Grand Budapest Hotel, Superbad, Knives Out |

Cada pelicula incluye: titulo, sinopsis, poster, anio, valoracion IMDb, genero, trailer de YouTube, contador de vistas y flag de trending.

---

## Funcionalidades detalladas

### Carrusel Hero
Rotacion automatica de peliculas destacadas con controles manuales de navegacion.

### Busqueda
Busqueda en tiempo real que filtra por titulo, genero y sinopsis de las peliculas.

### Filtrado y ordenacion
- Filtrado por genero con toggle activo
- Ordenacion por valoracion (rating), anio de estreno o titulo alfabetico

### Favoritos
Anade y elimina peliculas de tu lista de favoritos con feedback visual mediante animacion de confeti. Los datos persisten en `localStorage`.

### Historial de visionado
Registra automaticamente las peliculas que has visualizado con persistencia local.

### Valoraciones
Sistema de like/dislike por pelicula con persistencia en `localStorage`.

### Modal de pelicula
Vista detallada en modal con:
- Trailer de YouTube embebido
- Informacion completa de la pelicula
- Peliculas relacionadas por genero
- Opcion de compartir mediante copia de URL

### Perfiles de usuario
Creacion y edicion de perfiles con seleccion entre 8 avatares disponibles.

### Skeleton Loading
Placeholders con animacion shimmer mientras se cargan los datos.

---

## Licencia

Este proyecto es de uso educativo.
