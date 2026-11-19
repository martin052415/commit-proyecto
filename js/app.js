/**
 * Aplicacion Principal - Integracion de Modulos y UI
 */

// NOTA: Si tus archivos estan directo en js/ (sin subcarpeta modules),
// cambia "./modules/..." por "./bairesdev.js", "./cuadratica.js", etc.
import {
  calcularProbabilidadDados,
  calcularPartidosTorneo,
  contarMultiplosMenores,
  calcularViajesMinimos,
  contarDigito,
  calcularEdadFutura,
  calcularPesoRecipiente,
  calcularDiferenciaIngreso,
  calcularAhorroContado,
  calcularAlquiler
} from "./modules/bairesdev.js";

import { resolverCuadratica, evaluarPolinomio } from "./modules/cuadratica.js";
import { analizarSecuencia } from "./modules/secuencias.js";
import { ejecutarSuiteCompleta } from "./modules/test-suite.js";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initModuloA();
  initModuloB();
  initModuloC();
  initModuloD();
});

/* -------------------------------------------------------------
   NAVEGACION POR PESTAÑAS
------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}
/* -------------------------------------------------------------
   MODULO A: SIMULADOR BAIRESDEV (10 RETOS)
------------------------------------------------------------- */
function initModuloA() {
  const botones = document.querySelectorAll("#tab-modulo-a button");

  // Helper para obtener los inputs y el cuadro de resultado de cada tarjeta
  const obtenerElementos = (indice) => {
    const btn = botones[indice];
    if (!btn) return null;
    const card = btn.parentElement;
    return {
      btn,
      inputs: card.querySelectorAll("input"),
      resBox: btn.nextElementSibling
    };
  };

  // Reto 1: Probabilidad de Dados
  const r1 = obtenerElementos(0);
  r1?.btn.addEventListener("click", () => {
    try {
      const suma = parseInt(r1.inputs[0].value, 10);
      const res = calcularProbabilidadDados(suma);
      r1.resBox.innerHTML = `Suma Objetivo: <strong>${suma}</strong><br>` +
                            `Casos Favorables: <strong>${res.casosFavorables} / ${res.casosTotales}</strong><br>` +
                            `Probabilidad Decimal: <strong>${res.probabilidad.toFixed(4)}</strong><br>` +
                            `Porcentaje: <strong>${res.porcentaje}</strong>`;
    } catch (e) {
      r1.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 2: Torneo Round-Robin
  const r2 = obtenerElementos(1);
  r2?.btn.addEventListener("click", () => {
    try {
      const n = parseInt(r2.inputs[0].value, 10);
      const partidos = calcularPartidosTorneo(n);
      r2.resBox.innerHTML = `Equipos participantes: <strong>${n}</strong><br>` +
                            `Partidos Totales C(${n}, 2): <strong>${partidos} partidos</strong>`;
    } catch (e) {
      r2.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 3: Multiplos Menores
  const r3 = obtenerElementos(2);
  r3?.btn.addEventListener("click", () => {
    try {
      const lim = parseInt(r3.inputs[0].value, 10);
      const div = parseInt(r3.inputs[1].value, 10);
      const cant = contarMultiplosMenores(lim, div);
      r3.resBox.innerHTML = `Enteros en el rango [1, ${lim - 1}] divisibles por ${div}:<br>` +
                            `Total: <strong>${cant} números</strong> (Tiempo O(1))`;
    } catch (e) {
      r3.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 4: Viajes Minimos (Logistica)
  const r4 = obtenerElementos(3);
  r4?.btn.addEventListener("click", () => {
    try {
      const tot = parseInt(r4.inputs[0].value, 10);
      const cap = parseInt(r4.inputs[1].value, 10);
      const viajes = calcularViajesMinimos(tot, cap);
      r4.resBox.innerHTML = `Botellas totales: <strong>${tot}</strong> (Capacidad: ${cap})<br>` +
                            `Viajes requeridos: <strong>${viajes} viajes</strong>`;
    } catch (e) {
      r4.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 5: Conteo de Digito
  const r5 = obtenerElementos(4);
  r5?.btn.addEventListener("click", () => {
    try {
      const n = parseInt(r5.inputs[0].value, 10);
      const d = parseInt(r5.inputs[1].value, 10);
      const total = contarDigito(n, d);
      r5.resBox.innerHTML = `Del 1 al <strong>${n}</strong>, el dígito <strong>${d}</strong> aparece <strong>${total} veces</strong>.`;
    } catch (e) {
      r5.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 6: Edades Relativas
  const r6 = obtenerElementos(5);
  r6?.btn.addEventListener("click", () => {
    try {
      const pablo = parseInt(r6.inputs[0].value, 10);
      const k = parseFloat(r6.inputs[1].value);
      const res = calcularEdadFutura(pablo, k);
      r6.resBox.innerHTML = `Edad hermana hoy: <strong>${res.edadHermana} años</strong><br>` +
                            `En <strong>${res.anios} años</strong> Pablo tendrá <strong>${res.edadPabloFutura}</strong> y su hermana <strong>${res.edadHermanaFutura}</strong>.`;
    } catch (e) {
      r6.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 7: Peso Recipiente Vacio
  const r7 = obtenerElementos(6);
  r7?.btn.addEventListener("click", () => {
    try {
      const lleno = parseFloat(r7.inputs[0].value);
      const parcial = parseFloat(r7.inputs[1].value);
      const frac = parseFloat(r7.inputs[2].value);
      const res = calcularPesoRecipiente(lleno, parcial, frac);
      r7.resBox.innerHTML = `Recipiente vacío: <strong>${res.vacio} g</strong> | Contenido total: <strong>${res.contenido} g</strong>`;
    } catch (e) {
      r7.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 8: Diferencia de Ingresos
  const r8 = obtenerElementos(7);
  r8?.btn.addEventListener("click", () => {
    try {
      const q1 = parseInt(r8.inputs[0].value, 10);
      const p1 = parseInt(r8.inputs[1].value, 10);
      const q2 = parseInt(r8.inputs[2].value, 10);
      const p2 = parseInt(r8.inputs[3].value, 10);
      const res = calcularDiferenciaIngreso(q1, p1, q2, p2);
      r8.resBox.innerHTML = `Antes: <strong>$${res.ingreso1.toFixed(2)}</strong> | Después: <strong>$${res.ingreso2.toFixed(2)}</strong><br>` +
                            `Diferencia neta: <strong>$${res.diferencia.toFixed(2)}</strong>`;
    } catch (e) {
      r8.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 9: Ahorro al Contado
  const r9 = obtenerElementos(8);
  r9?.btn.addEventListener("click", () => {
    try {
      const cuotas = parseInt(r9.inputs[0].value, 10);
      const valor = parseFloat(r9.inputs[1].value);
      const contado = parseFloat(r9.inputs[2].value);
      const res = calcularAhorroContado(cuotas, valor, contado);
      r9.resBox.innerHTML = `Total en cuotas: <strong>$${res.totalCuotas.toFixed(2)}</strong><br>` +
                            `Ahorro pagando de contado: <strong>$${res.ahorro.toFixed(2)}</strong>`;
    } catch (e) {
      r9.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 10: Presupuesto y Porcentaje Inverso (Cascarita 3)
  const r10 = obtenerElementos(9);
  r10?.btn.addEventListener("click", () => {
    try {
      const comida = parseFloat(r10.inputs[0].value);
      const pct = parseFloat(r10.inputs[1].value);
      const res = calcularAlquiler(comida, pct);
      r10.resBox.innerHTML = `Alquiler total: <strong>$${res.alquiler.toFixed(2)}</strong><br>` +
                             `Verificación IEEE-754: <code>===</code> da <strong>${res.comparacionEstricta}</strong> | ` +
                             `<code>Epsilon</code> da <strong>${res.comparacionSegura}</strong>`;
    } catch (e) {
      r10.resBox.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });
}

/* -------------------------------------------------------------
   MODULO B: MOTOR CUADRATICO & CANVAS
------------------------------------------------------------- */
function initModuloB() {
  const btnResolver = document.getElementById("btn-resolver-cuadratica");
  const inputA = document.getElementById("coef-a");
  const inputB = document.getElementById("coef-b");
  const inputC = document.getElementById("coef-c");

  const outEq = document.getElementById("out-eq");
  const outDelta = document.getElementById("out-delta");
  const outTipo = document.getElementById("out-tipo");
  const outVertice = document.getElementById("out-vertice");
  const outRaices = document.getElementById("out-raices");
  const canvas = document.getElementById("parabola-canvas");

  if (!btnResolver) return;

  function resolverYDibujar() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    const signoB = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const signoC = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    outEq.textContent = `${a}x² ${signoB}x ${signoC} = 0`;

    const res = resolverCuadratica(a, b, c);

    outDelta.textContent = res.discriminante !== null && res.discriminante !== undefined
      ? res.discriminante.toExponential(4)
      : "N/A";
    outTipo.textContent = res.descripcion;
    outVertice.textContent = res.vertice
      ? `(${res.vertice.h.toFixed(2)}, ${res.vertice.k.toFixed(2)})`
      : "N/A (Línea o degenerada)";

    if (res.tipo === "REALES_DISTINTAS") {
      outRaices.textContent = `x₁ = ${res.raices[0].toExponential(4)}, x₂ = ${res.raices[1].toExponential(4)}`;
    } else if (res.tipo === "RAIZ_DOBLE") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Doble)`;
    } else if (res.tipo === "COMPLEJAS_CONJUGADAS") {
      outRaices.textContent = `${res.raices[0].texto}, ${res.raices[1].texto}`;
    } else if (res.tipo === "LINEAL_DEGENERADA") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Solución única lineal)`;
    } else {
      outRaices.textContent = res.descripcion;
    }

    dibujarParabola(canvas, a, b, c, res);
  }

  btnResolver.addEventListener("click", resolverYDibujar);

  document.querySelectorAll(".presets-row .btn-chip[data-a]").forEach(chip => {
    chip.addEventListener("click", () => {
      inputA.value = chip.getAttribute("data-a");
      inputB.value = chip.getAttribute("data-b");
      inputC.value = chip.getAttribute("data-c");
      resolverYDibujar();
    });
  });

  resolverYDibujar();
}

function dibujarParabola(canvas, a, b, c, res) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, W, H);

  const centroX = res.vertice && Math.abs(res.vertice.h) < 1e4 ? res.vertice.h : 0;
  const centroY = res.vertice && Math.abs(res.vertice.k) < 1e4 ? res.vertice.k : 0;
  const spanX = Math.max(Math.abs(centroX) * 2, 8);
  const minX = centroX - spanX;
  const maxX = centroX + spanX;

  const scaleX = W / (maxX - minX);
  const originCanvasX = (0 - minX) * scaleX;
  const originCanvasY = H / 2;
  const scaleY = H / 20;

  const toScreen = (x, y) => ({
    sx: (x - minX) * scaleX,
    sy: originCanvasY - (y - centroY) * (scaleY * 0.4)
  });

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= W; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
  }
  for (let j = 0; j <= H; j += 40) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
  }

  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, originCanvasY); ctx.lineTo(W, originCanvasY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(originCanvasX, 0); ctx.lineTo(originCanvasX, H); ctx.stroke();

  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let first = true;
  const dx = (maxX - minX) / 120;
  for (let x = minX; x <= maxX; x += dx) {
    const y = evaluarPolinomio(a, b, c, x);
    const pt = toScreen(x, y);
    if (first) { ctx.moveTo(pt.sx, pt.sy); first = false; }
    else { ctx.lineTo(pt.sx, pt.sy); }
  }
  ctx.stroke();

  if (res.vertice) {
    const ptV = toScreen(res.vertice.h, res.vertice.k);
    ctx.fillStyle = "#10b981";
    ctx.beginPath(); ctx.arc(ptV.sx, ptV.sy, 5, 0, Math.PI * 2); ctx.fill();
  }

  if (res.tipo === "REALES_DISTINTAS" || res.tipo === "RAIZ_DOBLE") {
    ctx.fillStyle = "#ef4444";
    res.raices.forEach(r => {
      const ptR = toScreen(r, 0);
      ctx.beginPath(); ctx.arc(ptR.sx, ptR.sy, 5, 0, Math.PI * 2); ctx.fill();
    });
  }
}

/* -------------------------------------------------------------
   MODULO C: DETECTOR DE SECUENCIAS
------------------------------------------------------------- */
function initModuloC() {
  const btnSecuencia = document.getElementById("btn-analizar-secuencia");
  const inputSec = document.getElementById("input-secuencia");
  const resSec = document.getElementById("res-secuencia");

  if (!btnSecuencia) return;

  function analizar() {
    try {
      const raw = inputSec.value.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (raw.length < 3) {
        throw new Error("Por favor introduce al menos 3 números válidos separados por comas.");
      }
      const res = analizarSecuencia(raw);
      resSec.innerHTML = `Secuencia ingresada: <strong>[${raw.join(", ")}]</strong><br>` +
                         `Patrón detectado: <strong>${res.tipo}</strong><br>` +
                         `Descripción Matemática: <strong>${res.descripcion}</strong><br>` +
                         (res.siguienteTermino !== null
                           ? `Próximo Número Estimado: <strong style="color: var(--accent-green); font-size: 1.15rem;">${res.siguienteTermino}</strong>`
                           : `<span style="color: var(--accent-orange);">No fue posible predecir con reglas polinómicas simples.</span>`);
    } catch (e) {
      resSec.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  }

  btnSecuencia.addEventListener("click", analizar);

  document.querySelectorAll(".presets-row .btn-chip[data-seq]").forEach(chip => {
    chip.addEventListener("click", () => {
      inputSec.value = chip.getAttribute("data-seq");
      analizar();
    });
  });
}

/* -------------------------------------------------------------
   MODULO D: SUITE DE PRUEBAS UNITARIAS
------------------------------------------------------------- */
function initModuloD() {
  const btnRun = document.getElementById("btn-run-all-tests");
  const tableBody = document.getElementById("test-results-body");
  const summaryBadges = document.getElementById("test-summary-badges");

  if (!btnRun) return;

  btnRun.addEventListener("click", () => {
    const suite = ejecutarSuiteCompleta();
    tableBody.innerHTML = "";

    suite.resultados.forEach(r => {
      const tr = document.createElement("tr");
      const catBadge = r.esCascarita
        ? `<span class="tag-cat trap">${r.categoria}</span>`
        : `<span class="tag-cat">${r.categoria}</span>`;
      const statusBadge = r.pass
        ? `<span class="badge-pass">✔ PASS</span>`
        : `<span class="badge-fail">✖ FAIL</span>`;

      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-weight: bold;">#${r.id}</td>
        <td><strong>${r.nombre}</strong></td>
        <td>${catBadge}</td>
        <td>${statusBadge}</td>
        <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${r.detalle}</td>
      `;
      tableBody.appendChild(tr);
    });

    summaryBadges.innerHTML = suite.todosAprobados
      ? `<span class="badge-status pass">✔ 10/10 PRUEBAS SUPERADAS (${suite.pasados} PASS)</span>`
      : `<span class="badge-status fail">✖ ${suite.fallados} PRUEBA(S) FALLADA(S) • ${suite.pasados}/10 PASS</span>`;
  });
}
