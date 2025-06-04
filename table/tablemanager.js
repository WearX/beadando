class TableManager {
    #dataRepository;
    #newItemCallback;
    #errorCallback;

    /**
     * Konstruktor
     * @param {DataRepository} dataRepository 
     */
    constructor(dataRepository) {
        this.#dataRepository = dataRepository;
        this.#newItemCallback = null;
        this.#errorCallback = null;
    }

    /**
     * uj elem callback
     * @param {Function} callback 
     */
    setNewItemCallback(callback) {
        this.#newItemCallback = callback;
    }

    /**
     * Hiba callback
     * @param {Function} callback 
     */
    setErrorCallback(callback) {
        this.#errorCallback = callback;
    }

    /**
     * UJ elem hozzáadása
     * @param {string} nev 
     * @param {string} korszak 
     * @param {string} vers 
     */
    addNewItem(nev, korszak, vers) {
        this.#dataRepository.addKolto(nev, korszak, vers)
            .then(() => {
                if (this.#newItemCallback) {
                    this.#newItemCallback();
                }
            })
            .catch((error) => {
                if (this.#errorCallback) {
                    this.#errorCallback(error);
                }
            });
    }

    /**
     * Adatok lekérése
     * @returns {Array}
     */
    getData() {
        return this.#dataRepository.adatok;
    }

    /**
     * Exportálás
     * @returns {string}
     */
    exportData() {
        return this.#dataRepository.exportToCSV();
    }

    /**
     * Adatok újratöltése (frissítés)
     */
    refresh() {
        if (this.#newItemCallback) {
            this.#newItemCallback();
        }
    }
}

export default TableManager;