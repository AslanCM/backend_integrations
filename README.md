# Prueba Técnica: Sistema de Pedidos B2B

Este repositorio contiene la solución a la prueba técnica para Backend Developer, implementando un sistema de microservicios para la gestión de clientes y órdenes, orquestado por una función Lambda.

## ✨ Características

* **Monorepo** gestionado con `npm workspaces`.
* **Microservicios** en Node.js y Express (`customers-api`, `orders-api`).
* **Orquestación Serverless** con AWS Lambda (`lambda-orchestrator`).
* Base de datos **MySQL**, todo containerizado con **Docker Compose**.
* Autenticación **JWT** para operadores. # no implementada solo escrita
* Comunicación segura entre servicios con un **Token de Servicio**.
* **Idempotencia** en la confirmación de órdenes.
* **Transacciones** de base de datos para consistencia de datos.

## ⚙️ Requisitos Previos

* [Node.js](https://nodejs.org/) (v22.x recomendado)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Cómo Levantar el Entorno

1.  **Clonar el Repositorio**
    ```bash
    git clone [URL-DE-TU-REPO]
    cd [NOMBRE-DE-LA-CARPETA]
    ```

2.  **Configurar Variables de Entorno**
    Copia el archivo de ejemplo `.env` que se encuentra en la raíz y renómbralo a `.env`. Puedes ajustar los valores si es necesario.
    ```bash
    cp .env.example .env
    ```

3.  **Instalar Dependencias**
    Desde la raíz del proyecto, instala todas las dependencias de los workspaces.
    ```bash
    npm install
    ```

4.  **Levantar con Docker Compose**
    Este único comando construirá las imágenes, creará la base de datos, correrá las migraciones (`schema.sql` y `seed.sql`) y levantará todos los servicios.
    ```bash
    docker-compose up -d --build
    ```

5.  **Verificar que todo esté corriendo**
    ```bash
    docker-compose ps
    ```
    Deberías ver los contenedores `customers-api`, `orders-api` y `mysql_db` en estado `up`.

6. **Levantar la Lambda con Serverless Framework**
    
    Desde la raíz del proyecto, dirigirse a lambda-orchestrator folder:
    ```bash
    cd ./lambda-orchestrator/
    ```

7.  **Levantar la Lambda con Serverless Framework**
    
    Luego correr
    ```bash
      npm run offline
     ```

    La lambda estará disponible en `http://localhost:3000`
    

## 🧪 Cómo Probar los Endpoints

### 1. Iniciar Sesión (Obtener Token) No obligatorio ni necesario

Realiza una petición `POST` a `http://localhost:3001/api/v1/auth/login` con el usuario admin creado en la semilla.

**Request:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "admin@b2b.com",
    "password": "admin123@"
}'


Global ENVs

DB_ROOT_PASSWORD=JelouAI123Test
DB_DATABASE=handle_orders
DB_USER=JeloiAI
DB_PASSWORD=JelouAI123*4
DB_PORT_EXTERNAL=3307

#Globals
JWT_SECRET=secret_key_test
SERVICE_TOKEN=0199f133-bcae-76c5-b52c-a62a51b22635

#Custmer service


#Orders service


 ** Customers-api ENVs**
  DB_USER=JeloiAI
  DB_PASSWORD=JelouAI123*4
  DB_NAME=handle_orders
  DB_PORT=3307
  PORT=3001
  JWT_SECRET=secret_key_test
  SERVICE_TOKEN=0199f133-bcae-76c5-b52c-a62a51b22635


** Orders-api ENVs**
  DB_USER=JeloiAI
  DB_PASSWORD=JelouAI123*4
  DB_NAME=handle_orders
  DB_PORT=3307
  PORT=3002
  JWT_SECRET=secret_key_test
  # CUSTOMERS_API_URL=http://customers-api:3001
  CUSTOMERS_API_URL=http://localhost:3001
  SERVICE_TOKEN=0199f133-bcae-76c5-b52c-a62a51b22635

  ** Orchestrator ENVs**
  CUSTOMERS_API_URL=http://localhost:3001
  ORDERS_API_URL: http://0.0.0.0:3002
  SERVICE_TOKEN=0199f133-bcae-76c5-b52c-a62a51b22635

 * ** Los archivos en la carpeta postman pueden importarse y así obtener los ejemplos de los request** *
