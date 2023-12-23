import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  // contentScript.tsx
  document.addEventListener('keydown', event => {
    if (event.altKey && event.key === 'h') {
      highlightSelection();
    }
  });

  function highlightSelection() {
    const selection = window.getSelection();
    // 如果没有选中文本，或者选中的文本为空，就不做任何事情
    // 如果选中文本的父级元素已经有了高亮的样式，就不做任何事情
    if (
      !selection ||
      selection.rangeCount === 0 ||
      selection.anchorNode.parentElement.classList.contains('mr-mark-mr-mark')
    )
      return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'mr-mark';
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  return <div className=""></div>;
}
