# 👩🦴 Nest Api Skeleton

## 📝 Descripción del reto técnico:

Plantilla para un servidor usando Typescript, NodeJS, Prisma ORM, NestJS, Vitest, Swagger, ESLint, Husky, REST Client

## 💫 Instalacion del proyecto

```bash
pnpm install

# Paso necesario para crear la Base de Datos con Docker y crear los modelos, interfaces y clases para manipularlos con Prisma ORM
pnpm run deps
```

## 👩‍💻 Pasos para ejecutar en local (`dev`) el proyecto

```bash
# Ejecutar el proyecto en modo `dev`
pnpm run dev
```

Ver la documentacion en la siguiente ruta [/docs](http://localhost:3000/docs)

> ⚠️ Importante: tener declaradas las siguientes variables de entorno, copiar el archivo `.env.example` en un archivo `.env.dev` y `.env.test`, luego reemplazar los valores.

- `PORT`: Puerto del servidor.
- `DATABASE_HOST`: Endpoint de la base de datos.
- `DATABASE_NAME`: Nombre de la base de datos.
- `DATABASE_USER`: Nombre del usuario de la base de datos.
- `DATABASE_PASSWORD`: Contraseña del usuario de la base de datos.

> 🧾 Nota: Se pueden usar los endpoints declarados en la carpeta `requests/`

Instalar con el plugin de VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## 🪄 Comandos utiles

Ejecutar linter

```bash
pnpm run lint

pnpm run format
```


## 🐛 Pasos para realizar pruebas del proyecto

Pruebas unitarias y e2e

```bash
pnpm run test
```

Pruebas visualizadas desde una web

```bash
pnpm run test:ui
```

Pruebas unitarias

```bash
pnpm run test
```

Pruebas e2e

```bash
pnpm run test:e2e
```
