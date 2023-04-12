(async function () {
  const input = document.getElementById("input_text");
  const btn = document.getElementById("btn");
  const response = await fetch("./recipe.json");
  const recipes = await response.json();
  const ulList = document.getElementById("ul_list");
  const detailedContent = document.getElementById("detailedContent");
  //
  function loadRecipeDetails(recipe) {
    detailedContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <h3>Ingredients:</h3>
    <ul class="detail_list">${recipe.ingredients
      .map(function (ingredient) {
        return "<li>" + ingredient + "</li>";
      })
      .join("")}</ul>
    <h3>Instructions:</h3>
    <div>${recipe.instructions}</div>
    `;
  }
  //
  function displaySearchResult(results) {
    ulList.innerHTML = "";
    results.forEach(function (recipe) {
      const li = document.createElement("li");
      const listItem = `
      <div class="li_item">
      <h1>${recipe.title}</h1>
      <p>${recipe.description}</p>
      </div>
        `;
      li.innerHTML = listItem;
      li.addEventListener("click", function () {
        loadRecipeDetails(recipe);
      });
      ulList.appendChild(li);
    });
  }

  //
  btn.addEventListener("click", function () {
    const query = input.value;
    const result = recipes.filter(function (recipe) {
      return (
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.join(" ").toLowerCase().includes(query)
      );
    });
    displaySearchResult(result);
  });
})();
