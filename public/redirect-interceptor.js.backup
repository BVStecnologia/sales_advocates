// Interceptador global de redirecionamentos para liftlio.com
(function() {
  console.log('Redirect interceptor loaded');
  
  // Interceptar window.location changes
  const descriptor = Object.getOwnPropertyDescriptor(window, 'location');
  const originalLocation = window.location;
  
  // Override window.location.href setter
  Object.defineProperty(window, 'location', {
    get: function() {
      return originalLocation;
    },
    set: function(value) {
      if (typeof value === 'string' && value.includes('liftlio.com')) {
        console.log('Intercepted redirect to liftlio.com:', value);
        value = value.replace('liftlio.com', window.location.hostname);
        console.log('Redirecting to:', value);
      }
      descriptor.set.call(window, value);
    }
  });
  
  // Interceptar window.location.replace
  const originalReplace = window.location.replace;
  window.location.replace = function(url) {
    if (url && url.includes('liftlio.com')) {
      console.log('Intercepted location.replace to liftlio.com:', url);
      url = url.replace('liftlio.com', window.location.hostname);
      console.log('Redirecting to:', url);
    }
    return originalReplace.call(window.location, url);
  };
  
  // Interceptar window.location.assign
  const originalAssign = window.location.assign;
  window.location.assign = function(url) {
    if (url && url.includes('liftlio.com')) {
      console.log('Intercepted location.assign to liftlio.com:', url);
      url = url.replace('liftlio.com', window.location.hostname);
      console.log('Redirecting to:', url);
    }
    return originalAssign.call(window.location, url);
  };
  
  // Monitorar mudanças na URL
  let lastUrl = window.location.href;
  new MutationObserver(() => {
    const url = window.location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.includes('liftlio.com')) {
        console.log('URL changed to liftlio.com, correcting...');
        const newUrl = url.replace('liftlio.com', window.location.hostname);
        window.history.replaceState(null, '', newUrl);
      }
    }
  }).observe(document, {subtree: true, childList: true});
})();