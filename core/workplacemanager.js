class WorkplaceManager {
    #tableCallback;
    #mapCallback;
    #cardGameCallback;

    /**
     * Konstruktor
     */
    constructor() {
        this.#tableCallback = null;
        this.#mapCallback = null;
        this.#cardGameCallback = null;
    }

    /**
     * Táblázat callback beállítása
     * @param {Function} callback 
     */
    setTableCallback(callback) {
        this.#tableCallback = callback;
    }

    /**
     * Mappa callback beállítása
     * @param {Function} callback 
     */
    setMapCallback(callback) {
        this.#mapCallback = callback;
    }

    /**
     * Kártyaizé callback beállítása
     * @param {Function} callback 
     */
    setCardGameCallback(callback) {
        this.#cardGameCallback = callback;
    }

    /**
     * Táblázat view megjelenítése
     */
    showTableView() {
        if (this.#tableCallback) {
            // később importalom a Tablemanagert
            const TableManager = function(dataRepository) {
                this.dataRepository = dataRepository;
            };
            
            const tableManager = new TableManager(null);
            this.#tableCallback(tableManager);
        }
    }

    /**
     * Mappa view megjelenítése
     */
    showMapView() {
        if (this.#mapCallback) {
            // később berakom a SelectManagert
            const SelectManager = function(dataRepository) {
                this.dataRepository = dataRepository;
            };
            
            const selectManager = new SelectManager(null);
            this.#mapCallback(selectManager);
        }
    }

    /**
     * Kartya játék megjelenítése
     */
    showCardGame() {
        if (this.#cardGameCallback) {
            // később importalom a QuizManagert
            const QuizManager = function(dataRepository) {
                this.dataRepository = dataRepository;
            };
            
            const quizManager = new QuizManager(null);
            this.#cardGameCallback(quizManager);
        }
    }
}

export default WorkplaceManager;