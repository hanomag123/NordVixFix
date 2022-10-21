document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/swiper/swiper-bundle.js
  //= ../../../node_modules/choices.js/public/assets/scripts/choices.js
  //= components/

  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs-btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs-pane");
      this._eventShow = new Event("tab.itc.change");
      this._init();
      this._events();
    };
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    };
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs-btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs-pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      };
      elLinkActive ? elLinkActive.classList.remove("tabs-btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs-pane_show") : null;
      elLinkTarget.classList.add("tabs-btn_active");
      elPaneTarget.classList.add("tabs-pane_show");
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    };
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs-btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        };
      });
    };
  };

  if (document.querySelector(".popular")) {
    new ItcTabs(".popular");
  };

  if (document.querySelector(".compare-page")) {
    new ItcTabs(".compare-page");
  };

  // prdouct navs

  const productNavs = document.querySelector(".product-info__navs");
  const initPosElem =
    productNavs && productNavs.getBoundingClientRect().top + window.pageYOffset;

  const productNavslinks = document.querySelectorAll(".product-info__navs-btn"),
    productSections = document.querySelectorAll(".product-section");

  function fixedProductNavs() {
    let curPosElem = productNavs.getBoundingClientRect().top;

    if (curPosElem <= 0 && initPosElem < window.pageYOffset) {
      productNavs.classList.add("fixed");
    } else if (initPosElem >= window.pageYOffset) {
      productNavs.classList.remove("fixed");
    };
  };
  if (productNavs) {
    fixedProductNavs();
  };

  function setProdActiveNavEl() {
    let scrollDistance = window.scrollY;

    productSections.forEach((el, index) => {
      if (scrollDistance >= el.offsetTop - 250) {
        productNavslinks.forEach((elem) => {
          if (elem.classList.contains("active")) {
            elem.classList.remove("active");
          };
        });

        productNavslinks[index].classList.add("active");
      } else if (scrollDistance < 300) {
        productNavslinks[index].classList.remove("active");
      };
    });
  };

  // product accordion

  const prodAccTitle = document.querySelectorAll(".product-section__heading"),
    prodAccContent = document.querySelectorAll(".product-section__content");

  if (prodAccTitle.length > 0) {
    for (let i = 0; i < prodAccTitle.length; i++) {
      prodAccContent[0].style.maxHeight = prodAccContent[0].scrollHeight + "px";
      prodAccTitle[0].classList.add("active");

      prodAccTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let panel = prodAccContent[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        };
      });
    };
  };

  // catalog & filter

  const filterPrices = document.querySelectorAll(".filter-price__input");

  if (filterPrices.length > 0) {
    filterPrices.forEach((el) => {
      el.addEventListener("input", () => {
        el.value = el.value.replace(/[^0-9]/g, "");
        el.value = Number(el.value).toLocaleString();
      });
    });
  
    const filterTitle = document.querySelectorAll(".filter-item__heading"),
      filterItemContent = document.querySelectorAll(".filter-item__content");
  
    if (filterTitle.length > 0) {
      for (let i = 0; i < filterTitle.length; i++) {
        filterItemContent[0].style.maxHeight =
          filterItemContent[0].scrollHeight + "px";
        filterTitle[0].classList.add("active");
  
        filterTitle[i].addEventListener("click", function () {
          this.classList.toggle("active");
  
          let panel = filterItemContent[i];
  
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          };
        });
      };
    };
  
    const catalogHorBtn = document.getElementById("catalog-hor");
    const catalogVertBtn = document.getElementById("catalog-vert");
    const catalogContent = document.querySelector(".catalog-content");
  
    const filterHeading = document.querySelector(".filter-heading");
    const filterContent = document.querySelector(".filter__content");
  
    if (catalogContent) {
      catalogHorBtn.addEventListener("click", function () {
        catalogContent.classList.add("horizontal");
  
        this.classList.add("active");
        catalogVertBtn.classList.remove("active");
      });
  
      catalogVertBtn.addEventListener("click", function () {
        catalogContent.classList.remove("horizontal");
  
        this.classList.add("active");
        catalogHorBtn.classList.remove("active");
      });
  
      filterHeading.addEventListener("click", () => {
        filterHeading.classList.toggle("active");
  
        filterContent.classList.toggle("active");
      });
    };
  };

  

  // questnry selects

  const questnryDefSelects = document.querySelectorAll(".questnry-def-select");

  if (questnryDefSelects.length > 0) {
    questnryDefSelects.forEach((el) => {
      new Choices(el, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: "",
      });
    });
  };

  //questnry switch

  let questnrySwitchsPar = document.querySelectorAll(
    ".questnry-switch__wrapper"
  );

 if (questnrySwitchsPar != null) {
  questnrySwitchsPar.forEach((el) => {
    el.addEventListener("click", (e) => {
      let target = e.target;
      let firstElem = el.querySelector(".questnry-switch-first");
      let secondElem = el.querySelector(".questnry-switch-second");

      if (target && target.tagName == "INPUT") {
        firstElem.classList.toggle("active");
        secondElem.classList.toggle("active");
      };
    });
  });

  const questnryNavTitle = document.querySelector(".questnry-nav__mob-heading"),
    questnryNavContent = document.querySelector(".questnry-nav__content");

  if (questnryNavTitle) {
    questnryNavTitle.addEventListener("click", function () {
      this.classList.toggle("active");

      let panel = questnryNavContent;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      };
    });
  };

 };

 const form = document.querySelector('#exampleModal');

 if (form) {
  const overlay = form.querySelector('.overlay');
  const closeButton = form.querySelector('.close-button');

  const arr = [overlay, closeButton];

  arr.forEach(el => {
    el.addEventListener('click', function closeForm() {
      form.hidden = true;
      enableScroll();
    });
  });
 };

 const orderBtn = document.querySelectorAll('.order-btn');

 if (orderBtn.length > 0 && form) {
  orderBtn.forEach(el => {
    el.addEventListener('click', () => {
      form.hidden = false;
      disableScroll();
    });
  });
 };


 var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
};

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  };
};

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {};

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};


  let header = document.querySelector('.header');
  let page = document.querySelector('.page');
  const searchButton = document.querySelector('.header__search');
  const searchBlock = document.querySelector('.search');

  if (searchBlock && searchButton) {
    searchBlock.style.setProperty('pointer-events', 'none');
    searchButton.addEventListener('click', toggleSearch);
  };

  function toggleSearch() {
    searchBlock.classList.toggle('search--hidden');
    if (helper.classList.contains('helperActive')) {
      headerButton.click();
      
    };
    if (!searchBlock.classList.contains('search--hidden')) {
      searchBlock.addEventListener('transitionend', function trans() {
        this.style.setProperty('pointer-events', 'auto');
        searchBlock.removeEventListener('transitionend', trans);
      });
    } else {
      searchBlock.style.setProperty('pointer-events', 'none');
    };
    !searchBlock.classList.contains('search--hidden') ? document.addEventListener('mouseup', closeSearchDoc) : document.removeEventListener('mouseup', closeSearchDoc);
  };

  function closeSearch() {
    searchBlock.classList.add('search--hidden');
    document.removeEventListener('mouseup', closeSearchDoc);
  };
  function closeSearchDoc() {
    const isItSearchButton = Boolean(event.target.closest('.header__search'));
    if (event.target.closest('.search') === null && !isItSearchButton) {
      closeSearch();
    };
  };
  
  if (header != null) {

    getWidth();

    window.addEventListener('resize', getWidth);

    function getWidth() {
      if (innerWidth > 920) {
        scrollHidden();
        scrollTrue();
      } else {
        if (header != null) {
        header.classList.add('out');
        header.classList.remove('have');
        header.classList.remove('header');
        header.classList.add('headerTransform');
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('scroll', scrollFunction);
      };
    };
  };
    // scrollHidden();

    function scrollTrue () {
      window.addEventListener('scroll', scrollFunction);
    };
    
      
    
    function scrollFunction() {
      if (document.body.scrollTop > 390 || document.documentElement.scrollTop > 390) {
        header.classList.remove('header');
        header.classList.add('headerTransform');
        if (header.classList.contains('have')) {
          closeSearch();
        };
      }else if (document.body.scrollTop < 430 || document.documentElement.scrollTop < 430) {
        header.classList.remove('headerTransform');
        header.classList.add('header');
      } 
    };

    let lastScroll = 0;
    const scrollPosition = () => document.documentElement.scrollTop || document.body.scrollTop || document.scrollingElement.scrollTop
  


      function scrollHidden() {
          window.addEventListener('scroll', scrollHandler);
      };

      function scrollHandler () {
        if (scrollPosition() < lastScroll) {
          console.log('out')
          header.classList.add('out');
          header.classList.remove('have');
        } else {
          console.log('have')
          header.classList.remove('out');
          header.classList.add('have');
        };
        console.log(document.scrollingElement.scrollTop)
        lastScroll = scrollPosition();
      };
      
  };
  
   
  
  //brandsSecondLevel tabs 
  
  const tabsBtn = document.querySelectorAll(".controlTitle");
  const tabsItems = document.querySelectorAll(".radioCotainer");
  
  if (tabsBtn.length > 0 && tabsItems.length > 0) {
    tabsBtn.forEach(onTabClick);
  
  function onTabClick(item) {
    item.addEventListener('click', function() {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
  
      if( !currentBtn.classList.contains('activeTabBtn')) {
        tabsBtn.forEach(function(item) {
          item.classList.remove('activeTabBtn');
        });
    
        tabsItems.forEach(function(item) {
          item.classList.remove('radioContainerActive');
        });
    
        currentBtn.classList.add('activeTabBtn');
        currentTab.classList.add('radioContainerActive');
      };
    });
  };
  
  
  document.querySelector('.controlTitle').click();

};



const menuControlTitle = document.querySelectorAll(".menuControlTitle");
const menuContentContainer = document.querySelectorAll(".menuContentContainer");
const arrowBack2 = document.querySelectorAll('.arrowBack2');
const helpArrowContainer = document.querySelectorAll('.helpArrowContainer');
const titleText = document.querySelectorAll('.titleText');
const headerButton = document.querySelector('.headerButton');
const helper = document.querySelector('.helper');
const generalTabs = document.querySelectorAll('.generalTabs');
const arrowBackTitleContainer = document.querySelectorAll('.arrowBackTitleContainer');
const text = document.querySelectorAll('.text');
const arrowBack = document.querySelectorAll('.arrowBack');
const headerMain = document.querySelector('header');



headerButton.addEventListener('click', function () {
  helper.classList.toggle('helperActive');
  header.classList.add('out');
  header.classList.remove('have');
  document.documentElement.classList.toggle('noScroll');
  if (!headerMain.classList.contains('headerTransform')) {
    headerMain.classList.toggle('scroll');
    header.scrollIntoView({
      behavior: 'smooth'
    });
  } else {
    headerMain.classList.remove('scroll');
    header.classList.toggle('overFlowAuto');
  };
});


if (menuControlTitle.length > 0 && menuContentContainer.length > 0 && window.matchMedia("(min-width: 920px)").matches) {

  
  const changeCategory = document.querySelectorAll(".changeCategory");
  const menuTabs = document.querySelectorAll(".menuTabs");

  
  
  changeCategory.forEach(changeOnTabClick);
  
  function changeOnTabClick(item) {
    item.addEventListener('click', function() {
      let changeCurrentBtn = item;
      let changeTabId = changeCurrentBtn.getAttribute("data-tab");
  
      let changeCurrentTab = document.querySelector(changeTabId);
  
      if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
        changeCategory.forEach(function(item) {
          item.classList.remove('changeCategoryActive');
        });
    
        menuTabs.forEach(function(item) {
          item.classList.remove('menuTabsActive');
        });
    
        changeCurrentBtn.classList.add('changeCategoryActive');
    
        changeCurrentTab.classList.add('menuTabsActive');
      };
  
    });
  };
  
  document.querySelector('.changeCategory').click();

  
  
  
  

  helpArrowContainer.forEach((el, id) => {
    el.addEventListener("click", () => {
      let activeBackground = document.querySelectorAll('.activeBackground');
      let menuContentContainerActive = document.querySelectorAll('.menuContentContainerActive');
      
      deleteClassFirst(activeBackground);
      deleteClassSec(menuContentContainerActive);

      menuContentContainer[id].classList.add("menuContentContainerActive");
      el.classList.add("activeBackground");  
  
    });
  });
  
  document.querySelector('.helpArrowContainer').click();
  
  function deleteClassFirst(element) {
    element.forEach(item => {
      item.classList.remove('activeBackground');
    })   
  };
  
  
  function deleteClassSec(element) {
    element.forEach(item => {
      item.classList.remove('menuContentContainerActive');
    })   
  };

  
};








// tabs na mobilke


const burgerIcon = document.querySelector('.burgerIcon');

  burgerIcon.addEventListener('click', function() {
    helper.classList.toggle('helperActive');
    document.documentElement.classList.toggle('noScroll');
  });



if (window.matchMedia("(max-width: 920px)").matches) {

  const changeCategory = document.querySelectorAll(".changeCategory");
  const menuTabs = document.querySelectorAll(".menuTabs");
  
  changeCategory.forEach(changeOnTabClick);
  
  function changeOnTabClick(item) {
    item.addEventListener('click', function() {
      let changeCurrentBtn = item;
      let changeTabId = changeCurrentBtn.getAttribute("data-tab");
  
      let changeCurrentTab = document.querySelector(changeTabId);
  
      if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
        changeCategory.forEach(function(item) {
          item.classList.remove('changeCategoryActive');
        });
    
        menuTabs.forEach(function(item) {
          item.classList.remove('menuTabsActive');
        });
    
        changeCurrentBtn.classList.add('changeCategoryActive');
    
        changeCurrentTab.classList.add('menuTabsActive');
      };
  
    });
  };
  
  document.querySelector('.changeCategory').click();



  menuControlTitle.forEach((el, id) => {
    el.addEventListener("click", () => {
      let menuContentContainerActive = document.querySelectorAll('.menuContentContainerActive');
      
      deleteClassSec(menuContentContainerActive);

      // el.classList.add('helpArrowContainerTransform');

      helpArrowContainer[id].classList.add("helpArrowContainerTransform");

      menuContentContainer[id].classList.add("menuContentContainerActive");
      helpArrowContainerDelete(helpArrowContainer);
      generalTabsDelete(generalTabs);

      clickAction(arrowBack, id);

    });
  });
  

  function clickAction(elem, i) {
    elem.forEach(e => {
      e.addEventListener('click', function() {
        menuContentContainer[i].classList.remove("menuContentContainerActive");
        helpArrowContainer[i].classList.remove("helpArrowContainerTransform");
        helpArrowContainerShow(helpArrowContainer);
        generalTabsShow(generalTabs);
      });
    });
  };
  
  
  function deleteClassSec(element) {
    element.forEach(item => {
      item.classList.remove('menuContentContainerActive');
      
    })   
  };

  function helpArrowContainerDelete(element) {
    element.forEach(e => {
      e.classList.add('helpArrowContainerHidden');
    });
  };

  function helpArrowContainerShow(element) {
    element.forEach(e => {
      e.classList.remove('helpArrowContainerHidden');
    });
  };

  

  function generalTabsDelete(element) {
    element.forEach(e => {
      e.classList.add('generalTabsHidden');
    });
  };

  function generalTabsShow(element) {
    element.forEach(e => {
      e.classList.remove('generalTabsHidden');
    });
  };

  



  titleText.forEach((el, id) => {
    el.addEventListener("click", () => {
      
      text[id].classList.add("textActive");
      
      arrowBackTitleContainerDelete(arrowBackTitleContainer);
      // arrowBackTitleContainer[id].classList.add('.arrowBackTitleContainerTransform');
      // helpArrowContainerTransformDelete(helpArrowContainer);

      arrowBackTitleContainer[id].classList.add('arrowBackTitleContainerTransform');

      arrowBack2Action(arrowBack2, id);
    });
  });


  function arrowBack2Action(elem, i){
    elem.forEach(e => {
     e.addEventListener('click', function() {
       text[i].classList.remove("textActive");
       arrowBackTitleContainer[i].classList.remove('arrowBackTitleContainerTransform');
       arrowBackTitleContainerShow(arrowBackTitleContainer);
     });
    });
 };


  function arrowBackTitleContainerDelete(element) {
    element.forEach(e => {
      e.classList.add('arrowBackTitleContainerHidden');
    });
  };

  function arrowBackTitleContainerShow(element) {
    element.forEach(e => {
      e.classList.remove('arrowBackTitleContainerHidden');
    });
  };


  function helpArrowContainerTransformDelete(elem) {
    elem.forEach(e => {
      e.classList.remove('helpArrowContainerTransform');
    });
  };
  function helpArrowContainerTransformShow(elem) {
    elem.forEach(e => {
      e.classList.add('helpArrowContainerTransform');
    });
  };

};


const searchInput = document.querySelector('.searchBrand');
const mainContent = document.querySelector('.mainContent');
const nothingText = document.querySelector('.nothing');
let alltext = [];
if (mainContent) {
  alltext = [...mainContent.querySelectorAll('p, a')];
};

const searchFunc = (event) => {
  const heightContent = mainContent.getBoundingClientRect().height
  const search = event.target.value.trim();
  const re = new RegExp(`^${search}.*`, 'i');
  if (search.length === 0) {
    mainContent.style.setProperty('height', 'auto');
    nothingText.hidden = true;
    alltext.forEach(el => {
      el.hidden = false;
      if (el.localName === 'p') {
        el.parentNode.hidden = false;
      };
    });
  } else {
    mainContent.style.setProperty('height', heightContent + 'px');
    const newArr = alltext.filter((el) => {
      if (el.innerHTML.toLowerCase() === search[0].toLowerCase()) {
        el.hidden = false;
        if (el.localName === 'p') {
          el.parentNode.hidden = false;
        };
        return el
      } else if (!re.test(el.innerHTML)) {
        el.hidden = true;
        if (el.localName === 'p') {
          el.parentNode.hidden = true;
        };
      } else {
        el.hidden = false;
        if (el.localName === 'p') {
          el.parentNode.hidden = false;
        };
        return el
      };
    });
    if (newArr.length === 1) {
      newArr[0].hidden = true;
      newArr[0].parentNode.hidden = true;
      nothingText.hidden = false;
    } else {
      nothingText.hidden = true;
    };
  };

};

if (searchInput && mainContent && nothingText) {
  searchInput.addEventListener('input', searchFunc);
};

});