currentTree = new ApexTree(container, {
  contentKey: 'name',
  direction: 'left',          // ← fondamentale: albero che cresce verso sinistra/destra
  nodeWidth: 220,             // nodi più larghi per contenere il testo
  nodeHeight: 90,
  siblingSpacing: 12,         // meno spazio tra fratelli = più compatto
  childrenSpacing: 20,        // meno spazio tra padre e figlio
  edgeWidth: 1,
  edgeColor: '#cccccc',
  nodeBGColor: '#ffffff',
  nodeBGColorHover: '#f0f4ff',
  borderColor: '#d0d0d0',
  borderRadius: '6px',
  nodeTemplate: (content) => `
    <div style="padding:10px 12px; font-size:12px; line-height:1.4; text-align:left;">
      <div style="font-weight:600; color:#1a1a1a;">${content.name}</div>
      <div style="color:#666; margin-top:4px; font-size:11px;">${content.description || ''}</div>
    </div>
  `
});
