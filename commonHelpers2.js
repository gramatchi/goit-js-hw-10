import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const m={formRef:document.querySelector(".form"),btnRef:document.querySelector("button")};m.formRef.addEventListener("submit",n);function n(e){e.preventDefault();const t=parseInt(e.target.elements.delay.value),o=e.target.elements.state.value;new Promise((r,i)=>{setTimeout(()=>{o==="fulfilled"?r():i()},t)}).then(()=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${t}ms`})}).catch(()=>{s.error({title:"Error",message:`❌ Rejected promise in ${t}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map
