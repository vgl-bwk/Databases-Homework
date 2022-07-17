const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.use(bodyParser.json());

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers/:customerId", function (req, res) {
  pool.query(
    `SELECT * FROM customers WHERE customers.id =${req.params.customerId}`,
    (error, result) => {
      res.json(result.rows[0]);
    }
  );
});

app.get("/products", function (req, res) {
  pool.query(
    `SELECT products.product_name,suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE products.product_name LIKE '%${req.query.name}%'`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.get("/customers/:customerId/orders", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query(
      `SELECT order_reference, order_date, product_name, unit_price, supplier_name, quantity
    FROM customers
    INNER JOIN orders ON customers.id=orders.customer_id
    INNER JOIN order_items ON orders.id=order_items.order_id
    INNER JOIN products ON products.id=order_items.product_id
    INNER JOIN suppliers ON suppliers.id=products.supplier_id
    WHERE customers.id=$1`,
      [customerId]
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.post("/customers", function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  pool
    .query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A customer with the same name already exists!");
      } else {
        const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [
            newCustomerName,
            newCustomerAddress,
            newCustomerCity,
            newCustomerCountry,
          ])
          .then(() => res.send("Customer created!"))
          .catch((e) => console.error(e));
      }
    });
});

app.post("/products", function (req, res) {
  const newProductName = req.body.product_name;
  const newProductPrice = req.body.unit_price;
  const newProductSupplierId = req.body.supplier_id;

  const querySupplier = `SELECT * FROM suppliers AS s WHERE s.id=$1`;

  if (!Number.isInteger(newProductPrice) || newProductPrice <= 0) {
    return res
      .status(400)
      .send("The price should'nt be empty and must be a positive integer.");
  }

  pool.query(querySupplier, [newProductSupplierId]).then((result) => {
    if (result.rows.length === 0) {
      return res.status(400).send("Suppliers doesn't exists!");
    } else {
      const query =
        "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3) RETURNING id";
      pool
        .query(query, [newProductName, newProductPrice, newProductSupplierId])
        .then((result) =>
          res.status(201).json({ productId: result.rows[0].id })
        )
        .catch((e) => console.error(e));
    }
  });
});

app.post("/customers/:customerId/orders", function (req, res) {
  const newOrderDate = req.body.order_date;
  const newOrderReference = req.body.order_reference;
  const newOrderCustomerId = req.params.customerId;

  const queryCustomer = `SELECT * FROM customers AS c WHERE c.id=$1`;

  pool.query(queryCustomer, [newOrderCustomerId]).then((result) => {
    if (result.rows.length === 0) {
      return res
        .status(400)
        .send("OOPS! Looks like this customer doesn't exist");
    } else {
      const query =
        "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3) RETURNING id";
      pool
        .query(query, [newOrderDate, newOrderReference, newOrderCustomerId])
        .then((result) => res.status(201).json({ orderId: result.rows[0].id }))
        .catch((e) => console.error(e));
    }
  });
});

app.put("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query(`SELECT * FROM customers WHERE id=${customerId}`)
    .then((result) => {
      const customer = result.rows[0];
      const updatedCustomer = { ...customer, ...req.body };
      pool.query(
        `UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=${customerId}`,
        [
          updatedCustomer.name,
          updatedCustomer.address,
          updatedCustomer.city,
          updatedCustomer.country,
        ]
      );
    })
    .then(() => res.send(`Customer ${customerId} updated succesfully!`))
    .catch((e) => console.error(e));
});

app.delete("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;

  pool
    .query("DELETE FROM orders WHERE id=$1", [orderId])
    .then(() => {
      pool
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => res.send(`Order ${orderId} succesfully deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
});

app.delete("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400).send("This customer has orders!");
      } else {
        pool
          .query("DELETE FROM customers WHERE id=$1", [customerId])
          .then(() => res.send(`Customer ${customerId} sucessfully deleted!`))
          .catch((e) => console.error(e));
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
