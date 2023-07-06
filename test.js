// ==UserScript==
// @name         JM homepage banner
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  A temporary solution for admin to preview QL Resources Banner in different dimensions
// @author       LEE MEN LONG
// @match        https://www.jobmajestic.com/*/
// @icon         https://www.jobmajestic.com/assets/img/favicon/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    // link.integrity = "sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM";
    link.crossorigin = "anonymous";
    document.querySelector("head").prepend(link);

    /*
    const trainHomeSection = document.querySelector("section#train-home-section");
    const companyBannerSection = document.createElement("section");
    companyBannerSection.classList.add("container", "px-4");
    const banner = document.createElement("img");
    banner.style.width = "100%";
    banner.style.height = "10rem";
    banner.style.border = "1px solid red";
    companyBannerSection.appendChild(banner);
    trainHomeSection.insertAdjacentElement("afterend", companyBannerSection);

    const controlSection = document.createElement("section");
    controlSection.classList.add("container", "px-4");
    const label = document.createElement("label");
    label.textContent = "Upload a company banner: ";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = () => {
        const imgFile = fileInput.files[0];
        const imgUrl = URL.createObjectURL(imgFile);
        banner.onload = () => {
            URL.revokeObjectURL(imgUrl);
        };
        banner.src = imgUrl;
    };
    label.append(fileInput);
    controlSection.appendChild(label);
    companyBannerSection.insertAdjacentElement("afterend", controlSection);

    const imgHeightControl = document.createElement("div");
    imgHeightControl.textContent = "Adjust the image height here (in px)";
    const numInput = document.createElement("input");
    numInput.type = "number";
    numInput.step = 1;
    numInput.min = 0;
    numInput.value = 160;
    numInput.style.width = "3rem";
    numInput.oninput = () => {
        banner.style.height = `${numInput.valueAsNumber}px`;
    };
    const autoHeightBtn = document.createElement("button");
    autoHeightBtn.textContent = "auto";
    autoHeightBtn.onclick = () => {
        banner.style.height = "auto";
        numInput.value = banner.clientHeight;
    };
    imgHeightControl.append(numInput, autoHeightBtn);
    controlSection.append(imgHeightControl);

    const imgFitControl = document.createElement("div");
    imgFitControl.textContent = "How should the image fit into homepage? ";
    imgFitControl.classList.add("d-flex", "gap-2");
    ["fill", "cover", "contain"].forEach(fit => {
        const label = document.createElement("label");
        label.classList.add("text-nowrap");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "fit";
        input.oninput = () => {
            banner.style.objectFit = fit;
        };
        label.append(input, ` ${fit}`);
        imgFitControl.append(label);
    });
    const fillRadio = document.createElement("input");
    controlSection.appendChild(imgFitControl);
    */

    const trainHomeSection = document.querySelector("section#train-home-section");
    const companyBannerSection = document.createElement("section");
    companyBannerSection.id = "QL-banner-section";
    companyBannerSection.classList.add("container", "pt-2", "px-4", "mb-4");
    const banner = document.createElement("picture");

    const srcXXL = document.createElement("source");
    srcXXL.media = "(min-width: 1400px)";
    srcXXL.srcset = "https://via.placeholder.com/1272x190";
    srcXXL.width = 1272;
    srcXXL.height = 190;
    banner.appendChild(srcXXL);

    const srcXL = document.createElement("source");
    srcXL.media = "(min-width: 1200px)";
    srcXL.srcset = "https://via.placeholder.com/1092x190";
    srcXL.width = 1092;
    srcXL.height = 190;
    banner.appendChild(srcXL);

    const srcL = document.createElement("source");
    srcL.media = "(min-width: 992px)";
    srcL.srcset = "https://via.placeholder.com/912x190";
    srcL.width = 912;
    srcL.height = 190;
    banner.appendChild(srcL);

    const srcM = document.createElement("source");
    srcM.media = "(min-width: 768px)";
    srcM.srcset = "https://via.placeholder.com/672x190";
    srcM.width = 672;
    srcM.height = 190;
    banner.appendChild(srcM);

    const srcS = document.createElement("source");
    srcS.media = "(min-width: 576px)";
    srcS.srcset = "https://via.placeholder.com/492x190";
    srcS.width = 492;
    srcS.height = 190;
    banner.appendChild(srcS);

    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/510x190";
    img.alt = "QL Resources banner";
    img.width = 510;
    // img.height = 190;
    img.classList.add("shadow", "rounded-4");
    img.style.width = "100%";
    img.style.objectFit = "contain";
    banner.appendChild(img);

    //banner.style.width = "100%";
    //banner.style.height = "10rem";
    //banner.style.border = "1px solid red";
    companyBannerSection.appendChild(banner);
    trainHomeSection.style.paddingBottom = "4rem";
    trainHomeSection.insertAdjacentElement("afterend", companyBannerSection);


    const bannerControlSection = document.createElement("section");
    bannerControlSection.id = "banner-control-section";
    bannerControlSection.classList.add("container", "px-4");
    companyBannerSection.classList.add("container", "px-4");

    const accordion = document.createElement("div");
    const accordionId = "banner-control-accordion";
    const newAccordionItem = (index, name) => `<h2 class="accordion-header" id="QL-banner-heading-${index}">
      <button class="accordion-button collapsed py-3q" type="button" data-bs-toggle="collapse" data-bs-target="#QL-banner-collapse-${index}" aria-expanded="false" aria-controls="QL-banner-collapse-${index}">
        For screen width ${name}
      </button>
    </h2>
    <div id="QL-banner-collapse-${index}" class="accordion-collapse collapse" aria-labelledby="QL-banner-heading-${index}" data-bs-parent="#${accordionId}">
      <div class="accordion-body"></div>
    </div>`;
    accordion.id = accordionId;
    accordion.classList.add("accordion");

    const controlXXL = document.createElement("div");
    controlXXL.classList.add("accordion-item");
    controlXXL.innerHTML = newAccordionItem(1, "above 1400px");
    const controlXXLBody = controlXXL.querySelector(".accordion-body");
    const fileInputXXL = document.createElement("input");
    fileInputXXL.type = "file";
    fileInputXXL.onchange = () => {
        const file = fileInputXXL.files[0];
        const fileUrl = URL.createObjectURL(file);
        //srcXXL.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked XXL");
        //};
        srcXXL.srcset = fileUrl;
    };
    controlXXLBody.append(fileInputXXL);
    accordion.appendChild(controlXXL);

    const controlXL = document.createElement("div");
    controlXL.classList.add("accordion-item");
    controlXL.innerHTML = newAccordionItem(2, "between 1200px and 1400px");
    const controlXLBody = controlXL.querySelector(".accordion-body");
    const fileInputXL = document.createElement("input");
    fileInputXL.type = "file";
    fileInputXL.onchange = () => {
        const file = fileInputXL.files[0];
        const fileUrl = URL.createObjectURL(file);
        //srcXL.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked XL");
        //};
        srcXL.srcset = fileUrl;
    };
    controlXLBody.append(fileInputXL);
    accordion.appendChild(controlXL);

    const controlL = document.createElement("div");
    controlL.classList.add("accordion-item");
    controlL.innerHTML = newAccordionItem(3, "between 992px and 1200px");
    const controlLBody = controlL.querySelector(".accordion-body");
    const fileInputL = document.createElement("input");
    fileInputL.type = "file";
    fileInputL.onchange = () => {
        const file = fileInputL.files[0];
        const fileUrl = URL.createObjectURL(file);
        //srcL.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked L");
        //};
        srcL.srcset = fileUrl;
    };
    controlLBody.append(fileInputL);
    accordion.appendChild(controlL);

    const controlM = document.createElement("div");
    controlM.classList.add("accordion-item");
    controlM.innerHTML = newAccordionItem(4, "between 768px and 992px");
    const controlMBody = controlM.querySelector(".accordion-body");
    const fileInputM = document.createElement("input");
    fileInputM.type = "file";
    fileInputM.onchange = () => {
        const file = fileInputM.files[0];
        const fileUrl = URL.createObjectURL(file);
        //srcM.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked M");
        //};
        srcM.srcset = fileUrl;
    };
    controlMBody.append(fileInputM);
    accordion.appendChild(controlM);

    const controlS = document.createElement("div");
    controlS.classList.add("accordion-item");
    controlS.innerHTML = newAccordionItem(5, "between 576px and 768px");
    const controlSBody = controlS.querySelector(".accordion-body");
    const fileInputS = document.createElement("input");
    fileInputS.type = "file";
    fileInputS.onchange = () => {
        const file = fileInputS.files[0];
        const fileUrl = URL.createObjectURL(file);
        //srcS.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked S");
        //};
        srcS.srcset = fileUrl;
    };
    controlSBody.append(fileInputS);
    accordion.appendChild(controlS);

    const controlXS = document.createElement("div");
    controlXS.classList.add("accordion-item");
    controlXS.innerHTML = newAccordionItem(6, "below 576px");
    const controlXSBody = controlXS.querySelector(".accordion-body");
    const fileInputXS = document.createElement("input");
    fileInputXS.type = "file";
    fileInputXS.onchange = () => {
        const file = fileInputXS.files[0];
        const fileUrl = URL.createObjectURL(file);
        //img.onload = () => {
        //    URL.revokeObjectURL(fileUrl);
        //    console.log("revoked XS");
        //};
        img.src = fileUrl;
    };
    controlXSBody.append(fileInputXS);
    accordion.appendChild(controlXS);

    // duplicated code
    bannerControlSection.append(accordion);
    companyBannerSection.insertAdjacentElement("afterend", bannerControlSection);
})();
