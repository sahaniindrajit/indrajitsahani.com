---
title: "Understanding Database transactions"
slug: "understanding-database-transactions"
date: "2024-08-03"
excerpt: "What database transactions are, why they matter, and how the ACID properties — Atomicity, Consistency, Isolation, and Durability — keep your data reliable under concurrent load."
tags: ["database", "dbms", "transactions", "acid", "sql", "backend"]
cover: "https://cdn.hashnode.com/res/hashnode/image/upload/v1722616568675/bb9772b1-54a9-44f0-8fc8-22939aec5720.png"

---

# What is database transaction ?

Database transactions are sequence of multiple operation performed in a database, all serve as a single logical unit of work. **<mark>If a transaction failure occurs</mark>** during a set of operation the whole transaction get cancel and all transaction steps performed prior to the step that led to the failure are reversed. The data in the database returns to its initial state as if the transaction had never been executed.

# Why do we need database transaction ?

Databases handles millions of concurrent requests per second. and some time some request might not get fully executed or might cause error.

Imagine there is a huge discount on latest iPhone model, and thousands of people in the online store put the iPhone in their carts at the same time and proceed to checkout. but there is only limited number of phones. In that case, the remaining inventory needs to be calculated accurately. In these case database transaction are used, <mark>The transaction system ensures that the data in the database always remains in a reliable and consistent state.</mark>

# ACID **in DBMS.**

A transaction in database must maintain **<mark>A</mark>**<mark>tomicity,</mark> **<mark> C</mark>**<mark>onsistency, </mark> **<mark>I</mark>**<mark>solation, </mark> **<mark>D</mark>**<mark>urability</mark>, these four properties commonly known as **ACID** ensure data integrity in case of errors or failures.

* **Atomicity-** It means all or nothing, this property ensures when a transaction is committed <mark>either all of its operations are executed or none.</mark> For example, During paying for the iPhone online, money from your account must be debited and credited to seller account. A transaction ensures that both of these action happens in the same transaction. If any of the actions fail, the entire transaction is rolled back
    
* **Consistency-** <mark>The database must remain in a consistent state after any transaction.</mark> For example-If your friend sent you money and you checked your account balance to ensure the money has been credited to account, The balance should never appear to be more or less money in aggregate in the bank than there is.
    
* **Isolation-** In a database system where more than one transaction are being executed simultaneously and in parallel, the property of isolation states that all the transactions will be carried out and executed as if it is the only transaction in the system. <mark> No transaction will affect the existence of any other transaction.</mark>
    
* **Durability-** If a transaction has been successfully completed, Its <mark>effect should remain in database permanently even if database fails</mark>. and if a transaction is completed but the database crashes before writing data to disk, the data should be updated when the system returns to service.
    

# States of database transaction.

A database transaction goes through multiple states. These states are called **transaction states** and are typically one of the following:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722624598926/ee2c34e6-45c8-4e0c-acd0-f814d9ca42f9.png align="center")

* **Active-** In this state the transactional database prepares everything required to execute the transaction.
    
* **Partially committed-** In this state data manipulation takes place. But all the data are not stored permanently in database, instead data is stored in the memory buffer.
    
* **Committed-** In this state, all the transaction updates are permanently stored in the database. Therefore, it is not possible to rollback the transaction after this point.
    
* **Failed-** If a transaction fails or has been aborted in the active state or partially committed state, It enters into a *failed* state. And any operation executed before it failed is reversed.