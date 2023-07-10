@_default:
  just --list

@init:
  rm -rf base dist node_modules
  git clone https://github.com/featherbear/UNSW-COMP6845-base base
  yarn --cwd base
  yarn

@watch:
  yarn gulp watch

@start:
  yarn gulp

@build:
  yarn gulp copy
  yarn --cwd base build
  mv base/dist ./dist