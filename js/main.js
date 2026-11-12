async function loadTree(name) {
  const res = await fetch(`./data/${name}.json`);
  const data = await res.json();
  const tree = new ApexTree(document.getElementById('tree-container'), {
    nodeWidth: 160,
    nodeHeight: 100,
    nodeTemplate: (content) => `
      <div style="padding:6px; font-size:12px;">
        <strong>${content.name}</strong>
        <div style="color:#666; margin-top:4px;">${content.description || ''}</div>
      </div>
    `
  });
  tree.render(data);
}
