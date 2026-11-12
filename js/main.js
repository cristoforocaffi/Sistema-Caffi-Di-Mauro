const select = document.getElementById('tree-select');
const container = document.getElementById('tree-container');
let currentTree = null;

async function loadTree(name) {
  const res = await fetch(`data/${name}.json`);
  if (!res.ok) {
    container.innerHTML = `<p style="padding:20px">File data/${name}.json non trovato.</p>`;
    return;
  }
  const data = await res.json();

  container.innerHTML = '';

  currentTree = new ApexTree(container, {
    contentKey: 'data',          // ← punta all'oggetto con name e description
    direction: 'left',
    nodeWidth: 180,              // ← larghezza ridotta (era 240)
    nodeHeight: 60,              // ← altezza ridotta (era 80)
    siblingSpacing: 8,           // ← ancora più compatto
    childrenSpacing: 16,
    edgeWidth: 1,
    edgeColor: '#cccccc',
    nodeBGColor: '#ffffff',
    nodeBGColorHover: '#f0f4ff',
    borderColor: '#d0d0d0',
    borderRadius: '4px',
    nodeTemplate: (content) => `
      <div style="padding:6px 10px; font-size:12px; line-height:1.3; text-align:left; overflow:hidden;">
        <div style="font-weight:600; color:#1a1a1a;">${content.name}</div>
        <div style="color:#666; margin-top:2px; font-size:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
          ${content.description || ''}
        </div>
      </div>
    `
  });

  currentTree.render(data);
}

select.addEventListener('change', (e) => loadTree(e.target.value));

document.getElementById('export-pdf').addEventListener('click', () => {
  html2pdf().set({
    margin: 10,
    filename: 'sistema-bridge.pdf',
    jsPDF: { orientation: 'landscape', format: 'a4' },
    html2canvas: { scale: 2 }
  }).from(container).save();
});

loadTree('apertura-1fiori');
