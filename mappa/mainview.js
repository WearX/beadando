class MainView {
    #container;
    #selectManager;
    #mainView;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {SelectManager} selectManager 
     */
    constructor(container, selectManager) {
        this.#container = container;
        this.#selectManager = selectManager;
        
        // main view div
        this.#mainView = document.createElement('div');
        this.#mainView.className = 'main-view';
        this.#container.appendChild(this.#mainView);
        
        // callback beállítása
        this.#selectManager.setSelectCallback((poetName, poetData) => {
            this.renderPoetData(poetName, poetData);
        });
        
        this.render();
    }

    /**
     * Kezdő nézet renderelése
     */
    render() {
        this.#mainView.innerHTML = '<p>Válassz egy költőt a listából!</p>';
    }

    /**
     * Költő adatainak megjelenítése
     * @param {string} poetName 
     * @param {Array} poetData 
     */
    renderPoetData(poetName, poetData) {
        // költő neve címként
        let html = `<h2>${poetName}</h2>`;
        
        // minden korszakhoz
        poetData.forEach(entry => {
            // korszak címként
            html += `<h3>${entry.korszak} </h3>`;
            
            // versek listában
            html += '<ul>';
            entry.versek.forEach(vers => {
                html += `<li>${vers}</li>`;
            });
            html += '</ul>';
        });
        
        this.#mainView.innerHTML = html;
    }
}

export default MainView;