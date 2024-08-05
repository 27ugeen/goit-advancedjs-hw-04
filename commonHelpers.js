import{a as v,S,i as I}from"./assets/vendor-c964849c.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const $="14594113-3565582ddf884392468dadf7f",q="https://pixabay.com/api/",h=15;let g=1,d=0;async function p(e,t=1){const n=new URLSearchParams({key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:h,page:t}),a=`${q}?${n}`;try{const r=await v.get(a);return d=r.data.totalHits,r.data.hits}catch(r){return d=0,console.error("Error fetching images:",r),[]}}function H(){g=1}function L(){g+=1}function m(){return g}function M(){return h}function x(){return d}function w(e){const t=document.querySelector(".gallery");if(!t){console.error("Gallery container not found");return}const n=e.map(E).join("");t.insertAdjacentHTML("beforeend",n),T()}function E(e){const{largeImageURL:t,webformatURL:n,tags:a,likes:r,views:o,comments:s,downloads:P}=e;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${n}"
          data-source="${t}"
          alt="${a}"
        />
        <div class="image-details">
          ${c("Likes",r)}
          ${c("Views",o)}
          ${c("Comments",s)}
          ${c("Downloads",P)}
        </div>
      </a>
    </li>`}function c(e,t){return`
    <div class="details-element">
      <p class="details-title">${e}</p>
      <p class="details-value">${t}</p>
    </div>`}function T(){const e=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});e.on("show.simplelightbox",function(t){t.preventDefault()}),e.on("error.simplelightbox",function(t){console.log(t)}),e.refresh()}function i(e){document.querySelector(".loader-wrapper").style.display=e?"flex":"none"}function f(e){document.querySelector(".load-more-button").style.display=e?"block":"none"}function b(){const e=M(),t=x(),n=Math.ceil(t/e);m()>=n?(f(!1),l("We're sorry, but you've reached the end of search results.")):f(!0)}function l(e){return I.error({id:"error",position:"topRight",message:e,transitionIn:"fadeInDown"})}function D(){const e=document.querySelectorAll(".gallery-item");if(e.length===0)return;const n=e[0].getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}const O=document.querySelector(".search-form"),y=document.querySelector(".search-input"),A=document.querySelector(".gallery"),R=document.querySelector(".load-more-button");let u="";O.addEventListener("submit",async e=>{if(e.preventDefault(),u=y.value.trim(),A.innerHTML="",f(!1),u==="")l("The search field cannot be empty"),i(!1);else{i(!0),H();try{const t=await p(u,m());t.length===0?l("Sorry, there are no images matching your search query. Please try again!"):(w(t),b(),L())}catch(t){console.error("Error:",t),l("An error occurred while fetching images. Please try again later.")}finally{i(!1),y.value=""}}});R.addEventListener("click",B);async function B(){i(!0);try{const e=await p(u,m());e.length>0?(w(e),D(),b(),L()):f(!1)}catch(e){console.error("Error:",e),l("An error occurred while fetching images. Please try again later.")}finally{i(!1)}}
//# sourceMappingURL=commonHelpers.js.map
