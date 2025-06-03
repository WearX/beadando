class WorkplaceView {
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
        
        this.#setupCallbacks();
    }

    /**
     * Callbackek beállítása
     */
    #setupCallbacks() {
        // táblázat callback
        this.#workplaceManager.setTableCallback((tableManager) => {
            this.#renderTableView(tableManager);
        });

        // mappa callback
        this.#workplaceManager.setMapCallback((selectManager) => {
            this.#renderMapView(selectManager);
        });

        // játék callback
        this.#workplaceManager.setCardGameCallback((quizManager) => {
            this.#renderCardGameView(quizManager);
        });
    }

    /**
     * Táblázat view renderelése
     * @param {TableManager} tableManager 
     */
    #renderTableView(tableManager) {
        this.#container.innerHTML = '';
        
        // TODO: majd a TableView, FormView és ImportExportView
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = '<h2>Táblázat nézet</h2>';
        this.#container.appendChild(tempDiv);
    }

    /**
     * Mappa view renderelése
     * @param {SelectManager} selectManager 
     */
    #renderMapView(selectManager) {
        this.#container.innerHTML = '';
        
        const selectContainer = document.createElement('div');
        selectContainer.className = 'select-container';
        this.#container.appendChild(selectContainer);
        
        
        // TODO: SelectView es MainView
        selectContainer.innerHTML = '<h2>Mappa nézet</h2>';
    }

    /**
     * Kártya áték renderelése
     * @param {QuizManager} quizManager 
     */
    #renderCardGameView(quizManager) {
        this.#container.innerHTML = '';
        
        // TODO: GameContainer
        const gameDiv = document.createElement('div');
        gameDiv.innerHTML = '<h2>Kártyajáték</h2>';
        this.#container.appendChild(gameDiv);
    }
}

export default WorkplaceView;