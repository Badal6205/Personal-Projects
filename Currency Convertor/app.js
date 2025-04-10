const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || isNaN(amount) || amount <= 0) {
    amount = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("API RESPONSE:", data); // Debug

    if (data.result) {
      msg.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      msg.innerText = "Something went wrong. Please try again.";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    msg.innerText = "Failed to fetch exchange rate.";
  }
});
