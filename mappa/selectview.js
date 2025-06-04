class SelectView {
    #container;
    #selectManager;
    #poetList;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {SelectManager} selectManager 
     */
    constructor(container, selectManager) {
        this.#container = container;
        this.#selectManager = selectManager;
        
        // költők listája
        this.#poetList = document.createElement('div');
        this.#poetList.className = 'poet-list';
        this.#container.appendChild(this.#poetList);
        
        this.render();
    }

    /**
     * Költők listájának renderelése
     */
    render() {
        const poets = this.#selectManager.getPoets();
        
        // cím hozzáadása
        this.#poetList.innerHTML = '<h3>Költők</h3>';
        
        // minden költőhöz egy elem
        poets.forEach(poet => {
            const poetItem = document.createElement('div');
            poetItem.className = 'poet-item';
            poetItem.textContent = poet;
            
            // kattintás event
            poetItem.addEventListener('click', () => {
                // eltávolítjuk az előző kijelölést
                const allItems = this.#poetList.querySelectorAll('.poet-item');
                allItems.forEach(item => {
                    item.classList.remove('selected');
                });
                
                // uj kijelölés
                poetItem.classList.add('selected');
                
                // manager értesítése
                this.#selectManager.selectPoet(poet);
            });
            
            this.#poetList.appendChild(poetItem);
        });
    }
}

export default SelectView;