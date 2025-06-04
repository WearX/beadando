import TableManager from '../table/tablemanager.js';
import TableView from '../table/tableview.js';
import FormView from '../table/formview.js';
import ImportExportView from '../table/importexportview.js';
import SelectManager from '../mappa/selectmanager.js';
import SelectView from '../mappa/selectview.js';
import MainView from '../mappa/mainview.js';
import QuizManager from '../quiz/quizmanager.js';
import GameContainer from '../quiz/gamecontainer.js';

class WorkplaceView {
    #container;
    #workplaceManager;
    #dataRepository;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {WorkplaceManager} workplaceManager 
     */
    constructor(container, workplaceManager) {
        this.#container = container;
        this.#workplaceManager = workplaceManager;
        this.#dataRepository = null;
        
        this.#setupCallbacks();
    }

    /**
     * callbackek beállítása
     */
    #setupCallbacks() {
        // táblázat callback
        this.#workplaceManager.setTableCallback(() => {
            const tableManager = new TableManager(this.#dataRepository);
            this.#renderTableView(tableManager);
        });

        // mappa callback
        this.#workplaceManager.setMapCallback(() => {
            const selectManager = new SelectManager(this.#dataRepository);
            this.#renderMapView(selectManager);
        });

        // játék callback
        this.#workplaceManager.setCardGameCallback(() => {
            const quizManager = new QuizManager(this.#dataRepository);
            this.#renderCardGameView(quizManager);
        });
    }

    /**
     * table view renderelése
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
        
        new SelectView(selectContainer, selectManager);
        new MainView(selectContainer, selectManager);
    }

    /**
     * Kártya játék renderelése
     * @param {QuizManager} quizManager 
     */
    #renderCardGameView(quizManager) {
        this.#container.innerHTML = '';
        
        new GameContainer(this.#container, quizManager);
    }
    /**
     * DataRepository beállítása
     * @param {DataRepository} dataRepository 
     */
    setDataRepository(dataRepository) {
        this.#dataRepository = dataRepository;
    }

}

export default WorkplaceView;