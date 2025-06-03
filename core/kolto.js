/**
 * Költő osztály
 */
class Kolto {
    #nev;
    #korszak;
    #vers;

    /**
     * Konstruktor
     * @param {string} nev - költő neve
     * @param {string} korszak - korszak neve
     * @param {string} vers - vers címe
     */
    constructor(nev, korszak, vers) {
        this.#nev = nev;
        this.#korszak = korszak;
        this.#vers = vers;
    }

    /**
     * Név getter
     * @returns {string}
     */
    get nev() {
        return this.#nev;
    }

    /**
     * Korszak getter
     * @returns {string}
     */
    get korszak() {
        return this.#korszak;
    }

    /**
     * Vers getter
     * @returns {string}
     */
    get vers() {
        return this.#vers;
    }
}

export default Kolto;