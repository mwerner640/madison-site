/**
 * Requires a <header class="navbar"></header>
 */
(async function loadHeader() {

    const resp = await fetch('/header.html');
    const text = await resp.text();

    document.querySelector('header.navbar').innerHTML = text;

    // for small screens
    const navSmallPlaceholderNode = document.querySelector('#nav-small-placeholder');
    const navSublinksNode = document.querySelector('.nav-sublinks');
    navSmallPlaceholderNode.appendChild(navSublinksNode.cloneNode(true));

    document.querySelector('#menu-icon').addEventListener('click', () => {

        navSmallPlaceholderNode.classList.toggle('hidden');
        document.querySelector('.navbar').classList.toggle('active');
    });

})();

