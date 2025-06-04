class SelectManager {
    #dataRepository;
    #selectCallback;

    /**
     * Konstruktor
     * @param {DataRepository} dataRepository 
     */
    constructor(dataRepository) {
        this.#dataRepository = dataRepository;
        this.#selectCallback = null;
    }

    /**
     * Select callback beállítása
     * @param {Function} callback 
     */
    setSelectCallback(callback) {
        this.#selectCallback = callback;
    }

    /**
     * Költő kiválasztása
     * @param {string} poetName 
     */
    selectPoet(poetName) {
        if (this.#selectCallback) {
            // megkeresi a költő összes adatát
            const poetData = this.#dataRepository.adatok.filter(entry => 
                entry.nev === poetName
            );
            
            // meghívjuk a callbacket a költő nevével és adataival
            this.#selectCallback(poetName, poetData);
        }
    }

    /**
     * Összes költő nevének lekérése
     * @returns {Array<string>}
     */
    getPoets() {
        const poets = new Set();
        
        // végigmegy az összes adaton
        this.#dataRepository.adatok.forEach(entry => {
            poets.add(entry.nev);
        });
        
        // visszaadjuk tömbként
        return Array.from(poets);
    }
}

export default SelectManager;