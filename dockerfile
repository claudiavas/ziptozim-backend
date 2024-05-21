# Utiliza la imagen de zimwriterfs como base
FROM darkenvy/zimwriterfs:latest AS zim-tools

# Utiliza una imagen de Node.js
FROM node:20

# Copia zim-tools al contenedor de Node.js
COPY --from=zim-tools /usr/local /usr/local

# Copia tu aplicación Node.js al contenedor
WORKDIR /app
COPY . .

# Instala las dependencias de tu aplicación
RUN npm install

# Inicia tu aplicación
CMD ["npm", "start"]