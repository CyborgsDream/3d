(function(){
  const modal = document.getElementById('share-modal');
  const openBtn = document.getElementById('share-open');
  if(!modal || !openBtn) return;

  const backdrop = modal.dataset.shareBackdrop !== undefined
    ? modal
    : modal.querySelector('[data-share-backdrop]') || modal;
  const closeButtons = Array.from(modal.querySelectorAll('[data-share-close]'));
  const copyBtn = modal.querySelector('[data-share-copy]');
  const linkInput = modal.querySelector('#share-link');

  function showModal(){
    if(linkInput){
      linkInput.value = location.href;
      linkInput.focus();
      linkInput.select();
    }
    modal.classList.remove('hidden');
  }

  function hideModal(){
    modal.classList.add('hidden');
  }

  openBtn.addEventListener('click', showModal);
  openBtn.addEventListener('keydown', (e)=>{
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      showModal();
    }
  });

  closeButtons.forEach(btn=>btn.addEventListener('click', hideModal));
  backdrop.addEventListener('click',(e)=>{ if(e.target===backdrop) hideModal(); });

  if(copyBtn && linkInput){
    copyBtn.addEventListener('click',()=>{
      const text = linkInput.value;
      navigator.clipboard?.writeText(text).catch(()=>{});
    });
  }
})();
