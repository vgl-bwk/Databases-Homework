const express = require("express");
const app = express();
const port = 3000;

const { Pool } = require("pg");
const pw = require("./password");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: pw,
  port: 5432,
});

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

app.get("/products", function (req, res) {
  pool.query(
    "SELECT products.product_name,suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.product_name;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
