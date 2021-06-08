/**
 * Requires a <header class="navbar"></header>
 */
(async function loadHeader() {

    const resp = await fetch('./header.html');
    const text = await resp.text();

    document.querySelector('header.navbar').innerHTML = text;

    document.querySelector('#menu-icon').addEventListener('click', () => {

        document.querySelector('.navbar').classList.toggle('active');
    });

})();


