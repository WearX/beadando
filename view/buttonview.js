class ButtonView {
    #container;
    #workplaceManager;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {WorkplaceManager} workplaceManager 
     */
    constructor(container, workplaceManager) {
        this.#container = container;
        this.#workplaceManager = workplaceManager;
        
        this.#setupEventListeners();
    }

    /**
     * evetlistenerek beállítása
     */
    #setupEventListeners() {
        const tableBtn = document.getElementById('tableViewBtn');
        const mapBtn = document.getElementById('mapViewBtn');
        const gameBtn = document.getElementById('cardGameBtn');

        if (tableBtn) {
            tableBtn.addEventListener('click', () => {
                this.#workplaceManager.showTableView();
            });
        }

        if (mapBtn) {
            mapBtn.addEventListener('click', () => {
                this.#workplaceManager.showMapView();
            });
        }

        if (gameBtn) {
            gameBtn.addEventListener('click', () => {
                this.#workplaceManager.showCardGame();
            });
        }
    }
}

export default ButtonView;