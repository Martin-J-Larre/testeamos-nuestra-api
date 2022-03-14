const request = require('supertest')('http://localhost:8081');
const expect = require('chai').expect;

const productController = require('../controllers/productController');

const productList = [
    {
        "id": "1",
        "title": "product1",
        "price": "10",
        "stock": "10"
    },
    {
        "id": "2",
        "title": "Producto Axios updated",
        "price": "50",
        "stock": "12"
    },
    {
        "id": "3",
        "title": "product3",
        "price": "10",
        "stock": "10"
    },
    {
        "title": "Producto Axios",
        "price": "100",
        "stock": "10",
        "id": 5
    }
];

const productToAdd = {
    title: "Producto test",
    price: "100",
    stock: "10",
};

const productToUpdate = {
    title: "Producto test updated",
    price: "100",
    stock: "10",
};

describe('test api Products', () => {

    // reset db each test
    beforeEach((done) => {
        productController.saveChange(productList, done);
    });

    describe('GET', () => {
        it('should return status 200', async () => {
            let response = await request.get('/product/getall');
            expect(response.status).to.eql(200);
        });
        it('should return the list of all products', async () => {
            let response = await request.get('/product/getall');
            expect(response.body).to.eql(productList);
        });
    });

    describe('POST', () => {

        it('should inset a product', async () => {
            let response = await request.post('/product/add').send(productToAdd);
            expect(response.status).to.eql(200);
            expect(response.body.title).to.equals(productToAdd.title);
        });
    });

    describe('PUT', () => {

        before(async () => {
            await request.post('/product/add').send(productToAdd)
        });

        it('Shuold update the product', async () => {
            let response = await request.put('/product/update/3').send(productToUpdate);
            expect(response.status).to.eql(200);
            expect(response.body.title).to.equals(productToUpdate.title);
        });
    });

    describe('DELETE', () => {
        
        it('Should delete the product', async () => {
            let response = await request.delete('/product/delete/2');
            expect(response.status).to.eql(200);
            productController.getOne(2, (err, item) => {
                expect(item).to.eql(undefined);
            });
        });
    });

});