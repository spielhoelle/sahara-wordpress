const nav_links = document.querySelectorAll("#modal-2 .wp-block-navigation-item__content");
nav_links && Array.from(nav_links).map((link) => {
    (link as HTMLAnchorElement).addEventListener('click', (e: MouseEvent) => {
        e.preventDefault()
        if (e.target) {
            const slug = (e.target as HTMLAnchorElement).href.replace(window.location.origin, '').replace(/[ ^\/|\/$ ]/g, '')
            fetch(`http://localhost:8000/wp-json/wp/v2/pages/?slug=${slug}`, {
            }).then(res => res.json()).then(data => {
                if (data.length > 0) {
                    const siteBlocks = document.querySelector(".wp-site-blocks");
                    if (siteBlocks && siteBlocks.lastElementChild) {
                        siteBlocks.lastElementChild.innerHTML = data[0].content.rendered;
                    }
                }
            })
        }
    })
}, false);