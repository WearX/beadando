class QuizManager {
    #dataRepository;
    #cards;
    #currentCardIndex;
    #answers;
    #nextCardCallback;
    #showResultsCallback;

    /**
     * Konstruktor
     * @param {DataRepository} dataRepository 
     */
    constructor(dataRepository) {
        this.#dataRepository = dataRepository 
        this.#cards = [];
        this.#currentCardIndex = 0;
        this.#answers = [];
        this.#nextCardCallback = null;
        this.#showResultsCallback = null;
        
        // kártyák előkészítése
        this.#prepareCards();
    }

    /**
     * Kártyák előkészítése
     */
    #prepareCards() {
        // végigmegyünk minden adaton
        this.#dataRepository.adatok.forEach(entry => {
            // korszak kártyák hozzáadása
            this.#cards.push({
                type: 'era',
                content: entry.korszak,
                correctAnswer: entry.nev
            });
            
            // vers kártyák hozzáadása
            entry.versek.forEach(vers => {
                this.#cards.push({
                    type: 'poem',
                    content: vers,
                    correctAnswer: entry.nev
                });
            });
        });
        
        // kártyák megkeverése
        this.#shuffleCards();
    }

    /**
     * Kártyák megkeverése
     */
    #shuffleCards() {
        // Fisher yates keverés
        for (let i = this.#cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // csere
            const temp = this.#cards[i];
            this.#cards[i] = this.#cards[j];
            this.#cards[j] = temp;
        }
    }

    /**
     * Következő kártya callback beállítása
     * @param {Function} callback 
     */
    setNextCardCallback(callback) {
        this.#nextCardCallback = callback;
    }

    /**
     * Eredmény megjelenítés callback beállítása
     * @param {Function} callback 
     */
    setShowResultsCallback(callback) {
        this.#showResultsCallback = callback;
    }

    /**
     * Aktuális kártya lekérése
     * @returns {Object}
     */
    getCurrentCard() {
        return this.#cards[this.#currentCardIndex];
    }

    /**
     * Összes költő nevének lekérése
     * @returns {Array<string>}
     */
    getPoetNames() {
        const poets = new Set();
        
        this.#dataRepository.adatok.forEach(entry => {
            poets.add(entry.nev);
        });
        
        return Array.from(poets);
    }

    /**
     * valasz beküldése
     * @param {string} answer 
     */
    submitAnswer(answer) {
        const currentCard = this.getCurrentCard();
        
        // válasz eltárolása
        this.#answers.push({
            card: currentCard,
            userAnswer: answer,
            isCorrect: answer === currentCard.correctAnswer
        });
        
        // következő kártyára lépés
        this.#currentCardIndex++;
        
        // van még kártya?
        if (this.#currentCardIndex < this.#cards.length) {
            // következő kártya megjelenítése
            if (this.#nextCardCallback) {
                this.#nextCardCallback();
            }
        } else {
            // eredmények megjelenítése
            if (this.#showResultsCallback) {
                this.#showResultsCallback(this.#answers);
            }
        }
    }
}


export default QuizManager;