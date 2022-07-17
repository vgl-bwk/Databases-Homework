select name, address from customers where country='United States';

select * from customers order by name;

select * from products where unit_price >100;

select * from products where product_name like '%socks%';

select * from products order by unit_price desc limit 5;

select product_name, unit_price, supplier_name from products
inner join suppliers on products.supplier_id = suppliers.id;

select product_name, supplier_name from products
inner join suppliers on products.supplier_id = suppliers.id
where suppliers.country ='United Kingdom';

select * from orders where customer_id =1;

select * from orders
inner join customers on orders.customer_id = customers.id
where customers.name ='Hope Crosby';

select product_name, unit_price, quantity from orders
inner join order_items on orders.id=order_items.order_id
inner join products on products.id=order_items.product_id
where order_reference= 'ORD006';

select customers.name, order_reference, order_date, product_name, supplier_name, quantity from products
inner join order_items on products.id=order_items.product_id 
inner join suppliers on products.supplier_id = suppliers.id
inner join orders on order_items.order_id = orders.id
inner join customers on orders.customer_id = customers.id;

select name from customers inner join orders on customers.id= orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join products on order_items.product_id = products.id
inner join suppliers on products.supplier_id = suppliers.id 
where suppliers.country ='China';
