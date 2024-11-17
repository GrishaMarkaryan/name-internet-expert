document.addEventListener('DOMContentLoaded', function() {
    function openMenuClick (element) {
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.classList.contains('dropdown-menu') ? element.style.transform = 'none' : element.style.transform = 'translateX(0)';
        element.style.transition = 'transform 0.5s ease';
    }
    function closeMenuClick (element) {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        element.classList.contains('dropdown-menu') ? element.style.transform = 'scaleY(0)' : element.style.transform = 'translateX(-100%)';
    }
    function toggleVisibility(element) {
        if (element.style.visibility === 'visible') {
            closeMenuClick(element);
        } else {
            openMenuClick(element);
        }
    }
    function closeAllMenus(except = null) {
        const allMenus = document.querySelectorAll('.dropdown-menu');
        allMenus.forEach(menu => {
            if (menu !== except) {
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.transform = 'scaleY(0)';
            }
        });
        const subLastMenus = document.querySelectorAll('.submenu, .last-menu');
        subLastMenus.forEach(menu => {
            if (menu !== except) {
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.transform = 'translateX(-100%)';
            }
        });
    }

    function setupHoverHandlers() {
        function openMenuHover (element) {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.transition = 'all 0.5s ease';
        }
        function closeMenuHover (element) {
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
            element.classList.contains('dropdown-menu') ? element.style.transform = 'scaleY(0)': element.style.transform = 'scaleX(0)'
            element.style.transition = 'none';
        }

        const catalogs = document.querySelectorAll('.catalog');
        let openTimeout_Dropdown;
        let closeTimeout_Dropdown;
        let currentOpenMenu_Dropdown = null;

        catalogs.forEach(catalog => {
            const dropdownMenu = catalog.querySelector('.dropdown-menu');
            closeMenuHover(dropdownMenu);

            catalog.addEventListener('mouseenter', function() {
                clearTimeout(closeTimeout_Dropdown);
                if (currentOpenMenu_Dropdown && currentOpenMenu_Dropdown !== dropdownMenu) {
                    closeTimeout_Dropdown = setTimeout(function() {
                        closeMenuHover(currentOpenMenu_Dropdown)
                        currentOpenMenu_Dropdown = null;
                    }, 400);
                }
                openTimeout_Dropdown = setTimeout(function() {
                    openMenuHover(dropdownMenu)
                    currentOpenMenu_Dropdown = dropdownMenu;
                }, 400);
            });
            catalog.addEventListener('mouseleave', function() {
                clearTimeout(openTimeout_Dropdown);
                closeTimeout_Dropdown = setTimeout(function() {
                   closeMenuHover(dropdownMenu);
                    if (currentOpenMenu_Dropdown === dropdownMenu) {
                        currentOpenMenu_Dropdown = null;
                    }
                }, 400);
            });
        });

        const oneLines = document.querySelectorAll('.one-line');
        oneLines.forEach((oneLine) => {
            const submenu = oneLine.querySelector('.submenu');
            let openTimeout_OneLine;
            let closeTimeout_OneLine;
            if (submenu) {
                closeMenuHover(submenu)
                oneLine.addEventListener('mouseenter', function() {
                    clearTimeout(closeTimeout_OneLine);

                    openTimeout_OneLine = setTimeout(function() {
                        openMenuHover(submenu)
                    }, 400);
                });
                oneLine.addEventListener('mouseleave', function() {
                    clearTimeout(openTimeout_OneLine);

                    closeTimeout_OneLine = setTimeout(function() {
                        closeMenuHover(submenu)
                    }, 400);
                });
            }
        });

        const lastLines = document.querySelectorAll('.last-line');
        

        lastLines.forEach((lastLine) => {
            const lastMenu = lastLine.querySelector('.last-menu');
            let openTimeout_lastMenu;
            let closeTimeout_lastMenu;
            let currentOpenMenu_lastMenu = null;
            if (lastMenu) {
               closeMenuHover(lastMenu);

                lastLine.addEventListener('mouseenter', function() {
                    clearTimeout(closeTimeout_lastMenu);
                    if (currentOpenMenu_lastMenu && currentOpenMenu_lastMenu !== lastMenu) {
                        closeTimeout_lastMenu = setTimeout(function() {
                            closeMenuHover(currentOpenMenu_lastMenu)
                        }, 400);
                    }
                    openTimeout_lastMenu = setTimeout(function() {
                        openMenuHover(lastMenu)
                        currentOpenMenu_lastMenu = lastMenu;
                    }, 400);
                });

                lastLine.addEventListener('mouseleave', function() {
                    clearTimeout(openTimeout_lastMenu);
                    closeTimeout_lastMenu = setTimeout(function() {
                        closeMenuHover(lastMenu)
                        if (currentOpenMenu_lastMenu === lastMenu) {
                            currentOpenMenu_lastMenu = null;
                        }
                    }, 400);
                });
            }
        });
    }

    function setupClickHandlers() {
        const catalogs = document.querySelectorAll('.catalog');
        catalogs.forEach(catalog => {
            catalog.addEventListener('click', function(event) {
                event.stopPropagation();
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    closeAllMenus()
                    toggleVisibility(dropdownMenu);
                }
            });
        });
        const oneLines = document.querySelectorAll('.dropdown-menu .one-line');
        oneLines.forEach(oneLine => {
            oneLine.addEventListener('click', function(event) {
                event.stopPropagation();
                const submenu = this.querySelector('.submenu');
                if (submenu) {
                    openMenuClick(submenu);
                    submenu.style.backgroundColor = 'white';
                }
            });
        });
       const submenus = document.querySelectorAll('.submenu .one-line');
        submenus.forEach(submenu => {
            submenu.addEventListener('click', function(event) {
                event.stopPropagation();
                const lastMenu = this.querySelector('.last-menu');
                if (lastMenu) {
                    openMenuClick(lastMenu);
                    lastMenu.style.backgroundColor = 'white';
                    const submenu = lastmenu.closest('.submenu');
                    submenu.style.backgroundColor = 'white';
                }
            });
        });
    }

    function removeHandlers() {
        const elements = document.querySelectorAll('.catalog, .dropdown-menu .one-line, .submenu .one-line')
        elements.forEach(element => {
            element.replaceWith(element.cloneNode(true));
        })
    }
 
    document.addEventListener('click', function(event) {
        const catalogs = document.querySelectorAll('.catalog');
        let clickedInsideCatalog = false;
        catalogs.forEach(catalog => {
            if (catalog.contains(event.target)) {
                clickedInsideCatalog = true;
            }
        });
        if (!clickedInsideCatalog) {
            closeAllMenus();
        }
    });

    document.addEventListener('click', function() {
        const catalogs = document.querySelectorAll('.catalog');
        let clickedInsideCatalog = false;
        catalogs.forEach(catalog => {
            if (catalog.contains(event.target)) {
                clickedInsideCatalog = true;
            }
        });
        if(window.innerWidth > 1280 && !clickedInsideCatalog) {
            removeHandlers();
            setupHoverHandlers()
        }
    })

    function handleResize() {
        if (window.innerWidth <= 1280) {
            removeHandlers();
            setupClickHandlers();
        } else {
            setupHoverHandlers();
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});