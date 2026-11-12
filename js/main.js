// 1. Recuperiamo gli elementi della pagina HTML
const select = document.getElementById('tree-select');
const container = document.getElementById('tree-container');
let currentTree = null;

// 2. Funzione che carica e disegna l'albero
async function loadTree(name) {
  // Scarica il file JSON
  const res = await fetch(`data/${name}.json`);
  if (!res.ok) {
    container.innerHTML = `<p style="padding:20px">File data/${name}.json non trovato.</p>`;
    return;
  }
  const data = await res.json();

  // Svuota il contenitore prima di ridisegnare
  container.innerHTML = '';

  // 3. Crea l'albero con le nuove impostazioni orizzontali e compatte
  currentTree = new ApexTree(container, {
    contentKey: 'name',
    direction: 'left',          // Sviluppo orizzontale
    nodeWidth: 240,             // Nodi più larghi per il testo
    nodeHeight: 80,
    siblingSpacing: 12,         // Spaziatura ridotta tra i rami
    childrenSpacing: 20,        
    edgeWidth: 1,
    edgeColor: '#cccccc',
    nodeBGColor: '#ffffff',
    nodeBGColorHover: '#f0f4ff',
    borderColor: '#d0d0d0',
    borderRadius: '6px',
    nodeTemplate: (content) => `
      <div style="padding:10px 12px; font-size:13px; line-height:1.4; text-align:left;">
        <div style="font-weight:600; color:#1a1a1a;">${content.name}</div>
        <div style="color:#555; margin-top:4px; font-size:11px;">${content.description || ''}</div>
      </div>
    `
  });

  // 4. Disegna l'albero
  currentTree.render(data);
}

// 5. Gestione degli eventi (cambio menu a tendina e esportazione PDF)
select.addEventListener('change', (e) => loadTree(e.target.value));

document.getElementById('export-pdf').addEventListener('click', () => {
  html2pdf().set({
    margin: 10,
    filename: 'sistema-bridge.pdf',
    jsPDF: { orientation: 'landscape', format: 'a4' },
    html2canvas: { scale: 2 }
  }).from(container).save();
});

// 6. Avvia il caricamento del primo albero all'apertura della pagina
loadTree('apertura-1fiori');
