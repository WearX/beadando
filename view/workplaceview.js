import TableView from '../table/tableview.js';
import FormView from '../table/formview.js';
import ImportExportView from '../table/importexportview.js';

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
     * Callbackek beállatása
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
     * Táblázat nézet renderelése
     * @param {TableManager} tableManager 
     */
    #renderTableView(tableManager) {
        this.#container.innerHTML = '';
        
        new TableView(this.#container, tableManager);
        new FormView(this.#container, tableManager);
        new ImportExportView(this.#container, tableManager);
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
        
        // TODO: SelectView és MainView
        selectContainer.innerHTML = '<h2>Mappa nézet</h2>';
    }

    /**
     * Kártya játék renderelése
     * @param {QuizManager} quizManager 
     */
    #renderCardGameView(quizManager) {
        this.#container.innerHTML = '';
        
        // TODO: GameContainerd
        const gameDiv = document.createElement('div');
        gameDiv.innerHTML = '<h2>Kártyajáték</h2>';
        this.#container.appendChild(gameDiv);
    }
}

export default WorkplaceView;