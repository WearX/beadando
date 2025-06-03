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
     * uj elem hozzádadása
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
     * adatok lekérése
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
     * Importálás
     * @param {string} csvData 
     * @returns {Promise}
     */
    importData(csvData) {
        return this.#dataRepository.importFromCSV(csvData);
    }
}

export default TableManager;