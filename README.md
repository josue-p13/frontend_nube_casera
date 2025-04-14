# Nube Casera - Frontend React

## Descripción
Nube Casera es una aplicación web personal desarrollada con React que permite almacenar, visualizar y gestionar archivos e imágenes a través de una interfaz amigable. Diseñada principalmente para uso móvil dentro de una red local, esta aplicación te permite crear tu propia "nube" casera para compartir y acceder a tus imágenes desde cualquier dispositivo en tu red.

## Características
- Inicio de sesión
- Navegación por directorios
- Visualización de imágenes
- Creación de carpetas
- Subida de archivos
- Interfaz optimizada para dispositivos móviles

## Requisitos previos
- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)
- Backend de Nube Casera funcionando (incluido en la carpeta Back_Fast)

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nube-casera.git
cd nube-casera/Front_React
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar la URL del backend
**IMPORTANTE:** Debes modificar la URL del backend en varios archivos para que apunte a la dirección IP de tu servidor:

En los siguientes archivos:
- `src/components/form.jsx`
- `src/components/principal.jsx`

Busca la línea que contiene:
```jsx
const baseUrl = "http://192.168.10.104:8000";
// O
const res = await fetch('http://192.168.10.104:8000/tomar_datos/...
```

Y cámbiala por la dirección IP de tu servidor:
```jsx
const baseUrl = "http://TU_DIRECCIÓN_IP:8000";
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 5. Construir para producción
```bash
npm run build
```

## Despliegue
Los archivos de la aplicación compilada se encontrarán en la carpeta `dist`. Puedes desplegarlos en cualquier servidor web como Nginx, Apache o utilizar servicios de hosting estático.

```bash
# Ejemplo de despliegue con servidor local
npm run build
npx serve -s dist
```

## Direcciones importantes
- **Login:** `/login`
- **Página principal:** `/principal`

## Notas sobre el diseño
- **Optimizado para móviles:** La visualización de las imágenes se ve mucho mejor en dispositivos móviles, ya que este proyecto fue diseñado principalmente para usuarios que acceden desde teléfonos dentro de la red local de casa.
  
- **Problemas conocidos:** Actualmente hay un problema con las tarjetas de imágenes cuando estas tienen diferentes proporciones, lo que puede deformar la visualización. Si tienes conocimientos de CSS y puedes mejorar la responsividad de las tarjetas, tu contribución será bienvenida.

## Contribuciones
Si deseas contribuir a este proyecto, puedes enfocarte en:

1. Mejorar la responsividad de las tarjetas de imágenes
2. Agregar soporte para más tipos de archivos
3. Implementar un sistema de etiquetas para las imágenes
4. Añadir funcionalidad de búsqueda
5. Mejorar la seguridad del login

## Ejecutar el Backend
El backend está desarrollado con FastAPI. Para ejecutarlo:

```bash
cd ../Back_Fast
python -m venv env  # Si aún no tienes el entorno virtual
env\Scripts\activate  # En Windows
source env/bin/activate  # En Linux/Mac
pip install -r requirements.txt  # Asegúrate de crear este archivo con las dependencias
python back.py
```

## Licencia
Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto
Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en este repositorio.

---

⭐ ¡No olvides dejar una estrella si te gusta este proyecto! ⭐
