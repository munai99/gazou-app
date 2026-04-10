document.getElementById('file').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  try {
    setStatus(`読み込み中: 0/${files.length}`);

    for (let i = 0; i < files.length; i++) {
      try {
        await addImage(files[i]);
        setStatus(`読み込み中: ${i + 1}/${files.length}`);
      } catch (err) {
        showError('画像追加エラー: ' + files[i].name + ' / ' + (err?.message || err));
      }
    }

    await render();
  } finally {
    e.target.value = '';
    setStatus('');
  }
});
