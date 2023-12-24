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
    // 打印选中的内容
    console.log(`selection: ${JSON.stringify(selection.toString())}`);
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      // 创建一个新的 span 元素
      const newNode = document.createElement('span');
      newNode.className = 'mr-mark';

      // 检查选择的范围是否在一个文本节点内
      if (range.startContainer.nodeType === Node.TEXT_NODE && range.endContainer.nodeType === Node.TEXT_NODE) {
        // 如果是，使用 surroundContents 方法
        range.surroundContents(newNode);
      } else {
        // 如果不是，使用 extractContents 和 appendChild 方法
        const fragment = range.extractContents();
        console.log(`fragment: ${fragment}`);
        newNode.appendChild(fragment);
        range.insertNode(newNode);
      }

      // 如果 span 中有 p 元素，将p元素删除，保留 p 元素内的文本
      if (newNode.querySelector('p')) {
        const p = newNode.querySelector('p');
        const text = p.innerText;
        p.remove();
        newNode.innerText = text;
      }

      // 清除选择
      selection.removeAllRanges();
    } else {
      console.log('No range selected');
    }
  }

  return <div className=""></div>;
}
