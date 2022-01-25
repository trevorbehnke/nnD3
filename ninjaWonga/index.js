const form = document.querySelector("form");
const name = document.querySelector("#name");
const cost = document.querySelector("#cost");
const error = document.querySelector("#error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value && cost.value) {
    const item = {
      name: name.value,
      cost: parseInt(cost.value),
    };

    db.collection("expenses")
      .add(item)
      .then((res) => {
        // console.log(res);
        form.reset();
        error.textContent = "";
      });
  } else {
    error.textContent = "Please fill in all fields";
  }
});
