// Basic example JS to show functionality
document.getElementById("actionBtn").addEventListener("click", () => {
  const message = document.createElement("p");
  message.textContent = "🎉 You clicked the button!";
  document.querySelector(".intro").appendChild(message);
});