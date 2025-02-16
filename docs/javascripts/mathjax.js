if (!window.location.pathname.includes('.ipynb')) {
  window.MathJax = {
      tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
          processEnvironments: true
      },
      options: {
          ignoreHtmlClass: ".*|",
          processHtmlClass: "arithmatex"
      }
  };
}