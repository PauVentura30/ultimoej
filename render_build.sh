#!/usr/bin/env bash
# exit on error
set -o errexit

# Build del frontend React
npm install
npm run build

# Build del backend Python
pipenv install
pipenv run upgrade

# Copiar archivos del build de React al directorio que Flask espera
cp -r dist/* public/
