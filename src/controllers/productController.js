var fs = require("fs");
const path = require("path");
const pathArchivoItems = path.join(__dirname, "../db/json/products.json");

class ProductController {
    constructor() {
        this.pathArchivoDB = pathArchivoItems;
    }
    // add one
    add(item, callback) {
        let _item = item;
        this.getAll((err, items) => {
            if (err) {
                callback(err);
            }
            items.length === 0 ? (_item.id = 1) : (_item.id = items.length + 1);
            items.push(_item);
            this.saveChange(items, (err) => {
                err ? callback(err) : callback(null, _item);
            });
        });
    }
    // getAll    
    getAll(callback) {
        return fs.readFile(this.pathArchivoDB, "utf8", (err, items) => {
            err ? callback(err) : callback(null, JSON.parse(items));
        });
    }
    // getone
    getOne(id, callback) {
        this.getAll((err, items) => {
            if (err) {
                callback(err);
            } else {
                const item = items.find((item) => item.id == id);
                callback(null, item);
            }
        });
    }
    //Update
    updateItem(id, item, callback) {
        this.getAll((err, items) => {
            if (err) {
                callback(err);
            } else {
                const itemUpdated = Object.assign(
                    items.find((p) => p.id == id),
                    item
                );
                this.saveChange(items, (err) =>
                    err ? callback(err) : callback(null, itemUpdated)
                );
            }
        });
    }
    // delete
    borrarItem(id, callback) {
        this.getAll((err, items) => {
            if (err) {
                callback(err);
            } else {
                this.saveChange(
                    items.filter((p) => p.id != id),
                    (err) => (err ? callback(err) : callback(null))
                );
            }
        });
    }

    saveChange(items, callback) {
        return fs.writeFile(
            this.pathArchivoDB,
            JSON.stringify(items),
            callback
        );
    }
}

module.exports = new ProductController();
