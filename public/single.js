const handlecart = (id) => {
  console.log(id);
  fetch("/product/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productID: id }),
  })
  .then((response) => response.json())
  .then((data) => console.log(data));
};  
document.getElementById("btn").addEventListener("click", () => {
    handlecart(id)
    alert("Product added Successfully")
})