(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = [...MATERIALS, ...EXTRA_MATERIALS];
  const byId = new Map(all.map(item => [item.id, item]));
  const supported = ['zh-Hant', 'zh-Hans', 'en'];
  const ui = {
    'zh-Hant': {
      unofficial:'非官方素材索引', overline:'素材檔案', headA:'為每一份素材，', headB:'找到答案。', intro:'取得建議、已知掉落關卡與合成配方，一眼就能看懂。',
      collection:'素材一覽',search:'搜尋素材名稱、配方或關卡（支援三語）…', all:'全部素材', farm:'推薦刷取', craft:'推薦合成', bank:'銀行兌換', box:'秘物匣子', pending:'尚無建議',waiting:'未設定',
      name:'名稱 / 素材',status:'取得方式',detail:'素材詳細資訊',decision:'取得建議',stage:'已知掉落關卡',recipe:'合成配方',copy:'複製資料',
      waitStage:'尚未收錄掉落關卡',waitStageDesc:'沒有提供此素材的掉落位置',waitSuggestion:'尚未提供取得建議',noRecipe:'尚無已收錄的合成配方',
      none:'沒有符合的素材',noneHelp:'試試其他名稱或調整篩選條件。',placeholder:'圖片待補',unconfirmed:'繁體名稱待官方遊戲核實',
      foot:'收錄 70 種素材 ICON、合成配方、取得建議及已知掉落關卡。掉落地點不代表效率排名，同一素材可能有多種取得方式。',
      copied:'資料已複製',copyFail:'無法自動複製，請手動選取。', noStage:'尚未收錄',noRecipeCopy:'尚無配方',original:'簡體原文',
      stageDisclaimer:'僅為已知掉落地點，尚未指定推薦關卡或效率排序。', recDisclaimer:'此處可同時顯示多種取得方式。', hard:'厄險',normal:'非厄險',
      recipeLabel:'合成配方',recommendLabel:'取得建議',stageLabel:'已知掉落關卡',unverified:'資料待核實',backTop:'回到頂部', about:'關於網站', aboutDescription:'RE: MATERIALS 是非官方素材查詢工具，方便快速查看素材配方、掉落關卡與取得建議。', githubLabel:'GitHub — k2210000（在新分頁開啟）'
    },
    'zh-Hans': {
      unofficial:'非官方素材索引',overline:'素材档案',headA:'为每一份素材，',headB:'找到答案。',intro:'获取建议、已知掉落关卡与合成配方，一眼就能看懂。',
      collection:'素材一览',search:'搜索材料名称、配方或关卡（支持三语）…', all:'全部素材',farm:'推荐刷取',craft:'推荐合成',bank:'银行兑换',box:'秘物匣子',pending:'暂无建议',waiting:'未设置',
      name:'名称 / 素材',status:'获取方式',detail:'素材详细信息',decision:'获取建议',stage:'已知掉落关卡',recipe:'合成配方',copy:'复制资料',
      waitStage:'尚未收录掉落关卡',waitStageDesc:'尚未提供该素材的掉落地点',waitSuggestion:'尚未提供获取建议',noRecipe:'尚无已收录的合成配方',
      none:'没有符合的素材',noneHelp:'试试其他名称或调整筛选条件。',placeholder:'图片待补',unconfirmed:'名称尚待核对',
      foot:'收录 70 种素材 ICON、合成配方、获取建议及已知掉落关卡。掉落地点并非效率排名，一个素材可能有多种获取方式。',
      copied:'资料已复制',copyFail:'无法自动复制，请手动选择。',noStage:'尚未收录',noRecipeCopy:'尚无配方',original:'简体原文',
      stageDisclaimer:'仅为已知掉落地点，尚未指定推荐关卡或效率顺序。', recDisclaimer:'这里可以同时显示多种获取方式。',hard:'厄险',normal:'非厄险',
      recipeLabel:'合成配方',recommendLabel:'获取建议',stageLabel:'已知掉落关卡',unverified:'资料待核实',backTop:'返回顶部', about:'关于网站', aboutDescription:'RE: MATERIALS 是非官方材料查询工具，可以快速查找合成配方、掉落关卡和获取建议。', githubLabel:'GitHub — k2210000（在新标签页打开）'
    },
    en: {
      unofficial:'UNOFFICIAL MATERIAL INDEX',overline:'MATERIAL ARCHIVE',headA:'For every material,',headB:'find an answer.',intro:'Acquisition advice, known drop stages, and crafting recipes at a glance.',
      collection:'Material Index',search:'Search in any language, recipe ingredient, or stage…',all:'All materials',farm:'Farm',craft:'Craft',bank:'Bank exchange',box:'Box exchange',pending:'No advice',waiting:'Unassigned',
      name:'NAME / MATERIAL',status:'ACQUISITION',detail:'Material details',decision:'Acquisition advice',stage:'Known drop stages',recipe:'Crafting recipe',copy:'Copy details',
      waitStage:'No drop stage recorded',waitStageDesc:'No drop location supplied for this material',waitSuggestion:'No acquisition advice supplied yet',noRecipe:'No crafting recipe recorded',
      none:'No matching material',noneHelp:'Try another name or filter.',placeholder:'ICON PENDING',unconfirmed:'Name awaiting review',
      foot:'70 materials with icons, crafting recipes, acquisition suggestions, and known drop locations. Locations are not efficiency rankings; some materials have multiple acquisition methods.',
      copied:'Details copied',copyFail:'Could not copy automatically.',noStage:'Not recorded',noRecipeCopy:'No recipe',original:'Original Chinese',
      stageDisclaimer:'Drop locations only; no most-efficient or recommended stage has been designated.',recDisclaimer:'More than one acquisition method may apply.',hard:'Hard (厄險)',normal:'Normal (非厄險)',
      recipeLabel:'Crafting recipe',recommendLabel:'Acquisition advice',stageLabel:'Known drop stages',unverified:'Unverified data',backTop:'Back to top', about:'About', aboutDescription:'RE: MATERIALS is an unofficial material guide for crafting recipes, known drop locations, and acquisition suggestions.', githubLabel:'GitHub — k2210000 (opens in a new tab)'
    }
  };
  const methods=['farm','craft','bank','box'];
  const symbols={farm:'↗',craft:'✧',bank:'⌑',box:'✦',pending:'·'};
  let locale='zh-Hant';
  try { const stored=localStorage.getItem('r1999_material_lang'); if (supported.includes(stored)) locale=stored; } catch (_) {}
  const params=new URLSearchParams(location.search);
  if(supported.includes(params.get('lang'))) locale=params.get('lang');
  let selected=byId.get(params.get('item')) || MATERIALS[0];
  if(!MATERIALS.includes(selected)) selected=MATERIALS[0];
  let filter='all', toastTimer;
  function t(key){return ui[locale][key] || key;}
  function esc(value){return String(value??'').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
  function nameOf(item, lang=locale){return item ? (item.names[lang] || item.names['zh-Hans']) : '';}
  function isNameFallback(item){return !item.names[locale];}
  function searchText(item){return item ? [item.id,...Object.values(item.names).filter(Boolean),...(item.dropStages||[]).map(s=>s.name)].join(' ').toLocaleLowerCase():'';}
  function rarityClass(item){return ({6:'orange',5:'gold',4:'purple',3:'blue',2:'green'})[item?.rarity] || 'gold';}
  function recommendations(item){return (item.recommendedMethods||[]).filter(m=>methods.includes(m));}
  function iconMarkup(item, isLarge=false){
    if(item?.icon) return `<img src="${esc(item.icon)}" alt="${esc(nameOf(item))}" loading="${isLarge?'eager':'lazy'}">`;
    return `<div class="missing-icon" aria-label="${esc(t('placeholder'))}"><span class="placeholder-glyph">✧</span><small>${esc(t('placeholder'))}</small></div>`;
  }
  function badges(item, detailed=false){
    const recs=recommendations(item);
    if (!recs.length) return detailed
      ? `<div class="recommend-badge pending"><span class="recommend-symbol">·</span><span><strong>${esc(t('pending'))}</strong></span></div>`
      : `<span class="item-status pending">${esc(t('pending'))}</span>`;
    if (detailed) return recs.map(m=>`<div class="recommend-badge ${m}"><span class="recommend-symbol">${symbols[m]}</span><span><strong>${esc(t(m))}</strong></span></div>`).join('');
    return recs.map(m=>`<span class="item-status ${m}">${esc(t(m))}</span>`).join('');
  }
  function filtered(){
    const q=$('searchInput').value.trim().toLocaleLowerCase();
    return MATERIALS.filter(item =>
      (filter==='all'||(filter==='pending'? !recommendations(item).length : recommendations(item).includes(filter))) &&
      (!q||searchText(item).includes(q)||item.recipe.some(r=>searchText(byId.get(r.id)).includes(q)))
    );
  }
  function renderList(){
    const items=filtered();
    if(!items.length){$('materialList').innerHTML=`<div class="empty-state"><span>✧</span><strong>${esc(t('none'))}</strong><p>${esc(t('noneHelp'))}</p></div>`;return;}
    $('materialList').innerHTML=items.map(item=>{
      const idx=MATERIALS.indexOf(item)+1;
      const subtitle=locale==='en'?(item.names['zh-Hant']||item.names['zh-Hans']):item.names.en;
      return `<button type="button" class="material-card ${selected.id===item.id?'selected':''}" data-id="${esc(item.id)}" aria-current="${selected.id===item.id}">
        <span class="item-icon rarity-${rarityClass(item)}">${iconMarkup(item)}</span>
        <span class="item-text"><span class="item-kicker">NO. ${String(idx).padStart(3,'0')} <i>—</i> ${item.rarity}★</span>
        <strong>${esc(nameOf(item))}</strong><small>${isNameFallback(item)?esc(t('unconfirmed'))+' · ':''}${esc(subtitle)}</small></span>
        <span class="item-status-group">${badges(item)}</span><span class="card-arrow" aria-hidden="true">↗</span>
      </button>`;
    }).join('');
    $('materialList').querySelectorAll('[data-id]').forEach(btn=>btn.addEventListener('click',()=>selectItem(byId.get(btn.dataset.id))));
  }
  function renderDetail(){
    const idx=MATERIALS.indexOf(selected)+1;
    $('detailNum').textContent=`FILE / ${String(idx).padStart(3,'0')}`;
    $('detailVisual').innerHTML=`<div class="visual-halo rarity-${rarityClass(selected)}"><div class="visual-rings ring-outer"></div><div class="visual-rings ring-inner"></div><div class="visual-cross top-left">✧</div><div class="visual-cross bottom-right">✧</div><div class="big-icon">${iconMarkup(selected,true)}</div></div><span class="visual-number">№ ${String(idx).padStart(3,'0')}</span><span class="visual-watermark">MATERIAL / ARCHIVE</span>`;
    $('detailRarity').textContent=`◆ ${selected.rarity}★　/　ID ${selected.id}`;
    $('detailName').textContent=nameOf(selected);
    $('detailEnglish').textContent=locale==='en'?(selected.names['zh-Hant']||selected.names['zh-Hans']):selected.names.en;
    const warning=$('unverifiedName');
    warning.textContent=isNameFallback(selected)?t('unconfirmed')+': '+t('original'):'';
    warning.hidden=!isNameFallback(selected);
    $('recommendation').innerHTML=`<div class="recommend-grid">${badges(selected,true)}</div>`+
      (!recommendations(selected).length?`<small class="info-annotation">${esc(t('waitSuggestion'))}</small>`:
      recommendations(selected).length>1?`<small class="info-annotation">${esc(t('recDisclaimer'))}</small>`:'');
    const stages=selected.dropStages||[];
    $('stageContent').innerHTML=stages.length
      ? `<div class="stage-entries">${stages.map(s=>`<div class="stage-entry"><span class="stage-icon">⌖</span><strong>${esc(s.name)}</strong><span class="stage-difficulty ${esc(s.difficulty)}">${esc(t(s.difficulty))}</span></div>`).join('')}</div><p class="stage-note">${esc(t('stageDisclaimer'))}</p>`
      : `<div class="stage-empty"><span>—</span><strong>${esc(t('waitStage'))}</strong><small>${esc(t('waitStageDesc'))}</small></div>`;
    $('recipeList').innerHTML=selected.recipe.length?selected.recipe.map(({id,qty})=>{
      const related=byId.get(id),canOpen=!!related&&MATERIALS.includes(related);
      return `<div class="recipe-item"><span class="recipe-mini-icon rarity-${rarityClass(related)}">${iconMarkup(related)}</span><span class="recipe-name">${canOpen?`<button type="button" data-related="${esc(id)}" title="${esc(nameOf(related))}">${esc(nameOf(related))} <span>↗</span></button>`:esc(nameOf(related))}</span><span class="recipe-qty">× <strong>${Number(qty).toLocaleString(locale)}</strong></span></div>`;
    }).join(''):`<div class="recipe-empty">${esc(t('noRecipe'))}</div>`;
    $('recipeList').querySelectorAll('[data-related]').forEach(btn=>btn.addEventListener('click',()=>selectItem(byId.get(btn.dataset.related))));
  }
  function selectItem(item){
    if(!item||!MATERIALS.includes(item))return;
    selected=item;renderList();renderDetail();
    // A different item should always open from the beginning, even when
    // the previous recipe was scrolled inside the sticky record panel.
    $('detailFrame').scrollTop=0;
    try{const url=new URL(location.href);url.searchParams.set('item',item.id);history.replaceState({},'',url);}catch(_){}
    if(matchMedia('(max-width: 920px)').matches)$('detailFrame').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function updateCounts(){
    $('countAll').textContent=MATERIALS.length;
    for(const method of methods) $('count'+method[0].toUpperCase()+method.slice(1)).textContent=MATERIALS.filter(x=>recommendations(x).includes(method)).length;
    $('countPending').textContent=MATERIALS.filter(x=>!recommendations(x).length).length;
    $('itemTotal').innerHTML=`${String(MATERIALS.length).padStart(2,'0')} <small>ITEMS</small>`;
  }
  function updateUI(){
    document.documentElement.lang=locale;
    $('languageSelect').value=locale;
    const fields={unofficial:'unofficial',overlineLabel:'overline',headlineStart:'headA',headlineEnd:'headB',introText:'intro',collectionTitleText:'collection',filterAll:'all',filterFarm:'farm',filterCraft:'craft',filterBank:'bank',filterBox:'box',filterPending:'waiting',listNameLabel:'name',listStatusLabel:'status',decisionHeading:'decision',stageHeading:'stage',recipeHeading:'recipe',copyRecipeText:'copy',footnoteText:'foot'};
    Object.entries(fields).forEach(([id,key])=>{$(id).textContent=t(key);});
    $('searchInput').placeholder=t('search');$('searchInput').setAttribute('aria-label',t('search'));
    $('detailFrame').setAttribute('aria-label',t('detail'));
    $('backToTop').setAttribute('aria-label',t('backTop'));
    $('backToTop').title=t('backTop');
    $('aboutTriggerText').textContent=t('about');
    $('aboutTrigger').title=t('about');
    $('aboutTrigger').setAttribute('aria-label',t('about'));
    $('aboutTitle').textContent=t('about');
    $('aboutDescription').textContent=t('aboutDescription');
    $('aboutPanel').querySelector('.about-github').setAttribute('aria-label',t('githubLabel'));
    renderList();renderDetail();updateCounts();
  }
  function notify(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300);}
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));renderList();
  }));
  // A lightweight non-modal popover: outside click, Escape or second click dismisses it.
  const aboutAnchor=$('aboutAnchor'), aboutTrigger=$('aboutTrigger'), aboutPanel=$('aboutPanel');
  function setAboutOpen(open){
    aboutPanel.hidden=!open;
    aboutTrigger.setAttribute('aria-expanded',String(open));
    aboutAnchor.classList.toggle('is-open',open);
  }
  aboutTrigger.addEventListener('click',()=>setAboutOpen(aboutPanel.hidden));
  document.addEventListener('pointerdown',e=>{
    if(!aboutPanel.hidden && !aboutAnchor.contains(e.target))setAboutOpen(false);
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && !aboutPanel.hidden){setAboutOpen(false);aboutTrigger.focus();}
  });
  $('searchInput').addEventListener('input',renderList);
  $('languageSelect').addEventListener('change',e=>{
    if(!supported.includes(e.target.value))return;
    locale=e.target.value;
    try{localStorage.setItem('r1999_material_lang',locale);}catch(_){}
    updateUI();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('searchInput').focus();}
    if(e.key==='Escape'&&document.activeElement===$('searchInput')){$('searchInput').value='';$('searchInput').blur();renderList();}
  });
  $('copyRecipe').addEventListener('click',async()=>{
    const recipe=selected.recipe.map(r=>`${nameOf(byId.get(r.id))} × ${r.qty}`).join(' + ');
    const stages=(selected.dropStages||[]).map(s=>`${s.name} (${t(s.difficulty)})`).join('、');
    const advice=recommendations(selected).map(m=>t(m)).join(' / ')||t('pending');
    const content=`${nameOf(selected)}\n${t('recipeLabel')}: ${recipe||t('noRecipeCopy')}\n${t('recommendLabel')}: ${advice}\n${t('stageLabel')}: ${stages||t('noStage')}`;
    try{
      if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(content);
      else{const ta=document.createElement('textarea');ta.value=content;document.body.appendChild(ta);ta.select();const worked=document.execCommand('copy');ta.remove();if(!worked)throw Error('failed');}
      notify(t('copied'));
    }catch(_){notify(t('copyFail'));}
  });
  // The back-to-top control stays out of the keyboard tab order until visible.
  const backToTop=$('backToTop');
  let scrollUpdatePending=false;
  function updateBackTop(){
    const visible=window.scrollY>360;
    backToTop.classList.toggle('is-visible',visible);
    backToTop.setAttribute('aria-hidden',String(!visible));
    backToTop.tabIndex=visible?0:-1;
    scrollUpdatePending=false;
  }
  window.addEventListener('scroll',()=>{
    if(!scrollUpdatePending){scrollUpdatePending=true;requestAnimationFrame(updateBackTop);}
  },{passive:true});
  backToTop.addEventListener('click',()=>{
    $('detailFrame').scrollTop=0;
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    backToTop.blur();
  });
  updateUI();
  updateBackTop();
})();
