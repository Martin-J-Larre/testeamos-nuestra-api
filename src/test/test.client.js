var axios = require("axios");

const URL = "http://localhost:8081";

// get All products
axios.get(`${URL}/product/getall`).then(function () {
    // Add one product
    axios
        .post(`${URL}/product/add`, {

            title: "Producto Axios",
            price: "100",
            stock: "10",
            
        })
        .then(function () {
            // update product
            axios
                .put(`${URL}/product/update/2`, {

                    title: "Producto Axios updated",
                    price: "50",
                    stock: "12",
                })
                .then(function () {
                    // delete product
                    axios
                        .delete(`${URL}/product/delete/4`)
                        .then(function () {
                            console.log("The test Passed");
                        });
                });
        });
});
