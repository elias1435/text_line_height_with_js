function clampTextWithEllipsis(selector, lines) {
  document.querySelectorAll(selector).forEach(el => {
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const fullHeight = lines * lineHeight;

    const originalText = el.textContent.trim();
    let words = originalText.split(' ');

    // Set fixed height so all boxes are visually equal
    el.style.minHeight = `${fullHeight}px`;
    el.style.maxHeight = `${fullHeight}px`;
    el.style.overflow = 'hidden';

    el.textContent = ''; // Clear it to rebuild

    for (let i = 0; i < words.length; i++) {
      el.textContent += words[i] + ' ';
      if (el.scrollHeight > fullHeight) {
        el.textContent = el.textContent.trimEnd().replace(/\s+\S*$/, '...'); // Trim last word, add ...
        break;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  clampTextWithEllipsis('.search-result-loop .post-title', 2);
  clampTextWithEllipsis('.search-result-loop .post-excerpt', 5);
});
