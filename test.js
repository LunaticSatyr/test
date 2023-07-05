// ==UserScript==
// @name         Preview QL Resources Banner
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  A temporary solution for admin to preview QL Resources Banner in different dimensions
// @author       LEE MEN LONG
// @match        https://www.jobmajestic.com/*/
// @icon         https://www.jobmajestic.com/assets/img/favicon/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
})();
