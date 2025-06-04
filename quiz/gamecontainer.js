class GameContainer {
    #container;
    #quizManager;
    #gameContainer;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {QuizManager} quizManager 
     */
    constructor(container, quizManager) {
        this.#container = container;
        this.#quizManager = quizManager;
        
        this.#gameContainer = document.createElement('div');
        this.#gameContainer.className = 'game-container';
        this.#container.appendChild(this.#gameContainer);
        
        // callbackek beállítása
        this.#setupCallbacks();
        
        // első kártya megjelenítése
        this.#showCard();
    }

    /**
     * callbackek beállítása
     */
    #setupCallbacks() {
        // következő kártya callback
        this.#quizManager.setNextCardCallback(() => {
            this.#showCard();
        });
        
        // results callback
        this.#quizManager.setShowResultsCallback((answers) => {
            this.#showResults(answers);
        });
    }

    /**
     * Kártya megjelenítése
     */
    #showCard() {
        // töröljük az előző contentet
        this.#gameContainer.innerHTML = '';
        
        const card = this.#quizManager.getCurrentCard();
        
        // card view létrehozása
        import('./cardview.js').then(module => {
            const CardView = module.default;
            new CardView(this.#gameContainer, card);
            
            return import('./actionbarview.js');
        }).then(module => {
            const ActionBarView = module.default;
            new ActionBarView(this.#gameContainer, this.#quizManager);
        });
    }

    /**
     * Eredmények megjelenítése
     * @param {Array} answers 
     */
    #showResults(answers) {
        // töröljük az előző contentet
        this.#gameContainer.innerHTML = '';
        
        // result view létrehozása
        import('./resultview.js').then(module => {
            const ResultView = module.default;
            new ResultView(this.#gameContainer, answers);
        });
    }
}

export default GameContainer;