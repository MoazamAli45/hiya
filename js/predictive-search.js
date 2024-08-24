class PredictiveSearch extends SearchForm{constructor(){super(),this.cachedResults={},this.predictiveSearchResults=this.querySelector("[data-predictive-search]"),this.allPredictiveSearchInstances=document.querySelectorAll("predictive-search"),this.isOpen=!1,this.abortController=new AbortController,this.searchTerm="",this.setupEventListeners()}setupEventListeners(){this.input.form.addEventListener("submit",this.onFormSubmit.bind(this)),this.input.addEventListener("focus",this.onFocus.bind(this)),this.addEventListener("focusout",this.onFocusOut.bind(this)),this.addEventListener("keyup",this.onKeyup.bind(this)),this.addEventListener("keydown",this.onKeydown.bind(this))}getQuery(){return this.input.value.trim()}onChange(){super.onChange();const newSearchTerm=this.getQuery();if((!this.searchTerm||!newSearchTerm.startsWith(this.searchTerm))&&this.querySelector("#predictive-search-results-groups-wrapper")?.remove(),this.updateSearchForTerm(this.searchTerm,newSearchTerm),this.searchTerm=newSearchTerm,!this.searchTerm.length){this.close(!0);return}this.getSearchResults(this.searchTerm)}onFormSubmit(event){(!this.getQuery().length||this.querySelector('[aria-selected="true"] a'))&&event.preventDefault()}onFormReset(event){super.onFormReset(event),super.shouldResetForm()&&(this.searchTerm="",this.abortController.abort(),this.abortController=new AbortController,this.closeResults(!0))}onFocus(){const currentSearchTerm=this.getQuery();currentSearchTerm.length&&(this.searchTerm!==currentSearchTerm?this.onChange():this.getAttribute("results")==="true"?this.open():this.getSearchResults(this.searchTerm))}onFocusOut(){setTimeout(()=>{this.contains(document.activeElement)||this.close()})}onKeyup(event){switch(this.getQuery().length||this.close(!0),event.preventDefault(),event.code){case"ArrowUp":this.switchOption("up");break;case"ArrowDown":this.switchOption("down");break;case"Enter":this.selectOption();break}}onKeydown(event){(event.code==="ArrowUp"||event.code==="ArrowDown")&&event.preventDefault()}updateSearchForTerm(previousTerm,newTerm){const searchForTextElement=this.querySelector("[data-predictive-search-search-for-text]"),currentButtonText=searchForTextElement?.innerText;if(currentButtonText){if(currentButtonText.match(new RegExp(previousTerm,"g")).length>1)return;const newButtonText=currentButtonText.replace(previousTerm,newTerm);searchForTextElement.innerText=newButtonText}}switchOption(direction){if(!this.getAttribute("open"))return;const moveUp=direction==="up",selectedElement=this.querySelector('[aria-selected="true"]'),allVisibleElements=Array.from(this.querySelectorAll("li, button.predictive-search__item")).filter(element=>element.offsetParent!==null);let activeElementIndex=0;if(moveUp&&!selectedElement)return;let selectedElementIndex=-1,i=0;for(;selectedElementIndex===-1&&i<=allVisibleElements.length;)allVisibleElements[i]===selectedElement&&(selectedElementIndex=i),i++;if(this.statusElement.textContent="",!moveUp&&selectedElement?activeElementIndex=selectedElementIndex===allVisibleElements.length-1?0:selectedElementIndex+1:moveUp&&(activeElementIndex=selectedElementIndex===0?allVisibleElements.length-1:selectedElementIndex-1),activeElementIndex===selectedElementIndex)return;const activeElement=allVisibleElements[activeElementIndex];activeElement.setAttribute("aria-selected",!0),selectedElement&&selectedElement.setAttribute("aria-selected",!1),this.input.setAttribute("aria-activedescendant",activeElement.id)}selectOption(){const selectedOption=this.querySelector('[aria-selected="true"] a, button[aria-selected="true"]');selectedOption&&selectedOption.click()}getSearchResults(searchTerm){const queryKey=searchTerm.replace(" ","-").toLowerCase();if(this.setLiveRegionLoadingState(),this.cachedResults[queryKey]){this.renderSearchResults(this.cachedResults[queryKey]);return}fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&section_id=predictive-search`,{signal:this.abortController.signal}).then(response=>{if(!response.ok){var error=new Error(response.status);throw this.close(),error}return response.text()}).then(text=>{const resultsMarkup=new DOMParser().parseFromString(text,"text/html").querySelector("#shopify-section-predictive-search").innerHTML;this.allPredictiveSearchInstances.forEach(predictiveSearchInstance=>{predictiveSearchInstance.cachedResults[queryKey]=resultsMarkup}),this.renderSearchResults(resultsMarkup)}).catch(error=>{if(error?.code!==20)throw this.close(),error})}setLiveRegionLoadingState(){this.statusElement=this.statusElement||this.querySelector(".predictive-search-status"),this.loadingText=this.loadingText||this.getAttribute("data-loading-text"),this.setLiveRegionText(this.loadingText),this.setAttribute("loading",!0)}setLiveRegionText(statusText){this.statusElement.setAttribute("aria-hidden","false"),this.statusElement.textContent=statusText,setTimeout(()=>{this.statusElement.setAttribute("aria-hidden","true")},1e3)}renderSearchResults(resultsMarkup){this.predictiveSearchResults.innerHTML=resultsMarkup,this.setAttribute("results",!0),this.setLiveRegionResults(),this.open()}setLiveRegionResults(){this.removeAttribute("loading"),this.setLiveRegionText(this.querySelector("[data-predictive-search-live-region-count-value]").textContent)}getResultsMaxHeight(){return this.resultsMaxHeight=window.innerHeight-document.querySelector(".section-header").getBoundingClientRect().bottom,this.resultsMaxHeight}open(){this.predictiveSearchResults.style.maxHeight=this.resultsMaxHeight||`${this.getResultsMaxHeight()}px`,this.setAttribute("open",!0),this.input.setAttribute("aria-expanded",!0),this.isOpen=!0}close(clearSearchTerm=!1){this.closeResults(clearSearchTerm),this.isOpen=!1}closeResults(clearSearchTerm=!1){clearSearchTerm&&(this.input.value="",this.removeAttribute("results"));const selected=this.querySelector('[aria-selected="true"]');selected&&selected.setAttribute("aria-selected",!1),this.input.setAttribute("aria-activedescendant",""),this.removeAttribute("loading"),this.removeAttribute("open"),this.input.setAttribute("aria-expanded",!1),this.resultsMaxHeight=!1,this.predictiveSearchResults.removeAttribute("style")}}customElements.define("predictive-search",PredictiveSearch);
//# sourceMappingURL=/cdn/shop/t/328/assets/predictive-search.js.map?v=16985596534672189881723075067
