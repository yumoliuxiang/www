const _hmt = window._hmt;

document.addEventListener('click', ({target}) => {
  try {
    switch (target.tagName) {
      case 'A':
      case 'BUTTON':
        _hmt.push(['_trackEvent', target.innerText, '点击按钮']);
        break;
      case 'INPUT':
        if (target.type === 'radio') {
          _hmt.push(['_trackEvent', target.value, '点击单选']);
        }
        break;
      case 'DIV':
        if (target.classList.contains('ant-tabs-tab')) {
          _hmt.push(['_trackEvent', target.innerText, '切换标签']);
        }
        break;
      case 'IMG':
        _hmt.push(['_trackEvent', target.getAttribute('alt'), '点击图片']);
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
});
