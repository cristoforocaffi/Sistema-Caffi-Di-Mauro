const select = document.getElementById('tree-select');
const container = document.getElementById('tree-container');
let currentTree = null;

async function loadTree(name) {
  // 1. Scarica il file JSON dalla cartella data/
  const res = await fetch(`data/${name}.json`);
  if (!res.ok) {
    container.innerHTML = `<p style="padding:20px">File data/${name}.json non trovato.</p>`;
    return;
  }
  const data = await res.json();

  // 2. Svuota il contenitore prima di ridisegnare
  container.innerHTML = '';

  // 3. Crea l'albero con ApexTree
  currentTree = new ApexTree(container, {
    contentKey: 'name',        // quale campo del JSON mostrare come titolo
    nodeWidth: 180,
    nodeHeight: 110,
    siblingSpacing: 30,
    nodeTemplate: (content) => `
      <div style="padding:8px; font-size:12px; line-height:1.3;">
        <strong>${content.name}</strong>
        <div style="color:#555; margin-top:4px;">${content.description || ''}</div>
      </div>
    `
  });

  // 4. Disegna
  currentTree.render(data);
}

// Cambio albero dal menu a tendina
select.addEventListener('change', (e) => loadTree(e.target.value));

// Esporta PDF
document.getElementById('export-pdf').addEventListener('click', () => {
  html2pdf().set({
    margin: 10,
    filename: 'sistema-bridge.pdf',
    jsPDF: { orientation: 'landscape', format: 'a4' },
    html2canvas: { scale: 2 }
  }).from(container).save();
});

// Carica l'albero iniziale
loadTree('apertura-1fiori');
