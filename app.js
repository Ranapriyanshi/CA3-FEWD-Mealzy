// Displaying random image each time the page is refreshed.


function gettingRandomImage() {
    // Fetching data from the api using fetch method
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        let randomFood = document.getElementById('random-section');
        // Putting data into the required HTML feilds
        randomFood.innerHTML = 
            `<div id="image-card">
                <h1>Random-meal-of-the-Day</h1>
                <img id="test" src="${data.meals[0].strMealThumb}" alt="" />
                <h3>${data.meals[0].strMeal}</h3>
                <h4 onclick="showIngredient()">Click to view ingredients</h4>
            </div>`
        ;

        // Rendering data into the ingredient popup which displays ingredient list of random item.
        let ingredients = document.getElementById('popup');
        ingredients.innerHTML = 
        `<div id="ingredientcard">
            <img onclick="hideIngredients()" id="cross" src="./Cross icon.png" alt="">
            <h3> ${data.meals[0].strMeal}</h3>
            <h3> Area: ${data.meals[0].strArea}</h3>
            <h3>Category: ${data.meals[0].strCategory}</h3>
            <h3>Ingredients:<h3>
            <ul id="ingredient-list"></ul>
        </div>`
        
        // Loop for getting all ingredients of the dish 
        for(i=1;i<=20;i++){
            var ing = "strIngredient"+i;
            // Setting display conditions for the ingredients
            if(data.meals[0][ing]!="null" && data.meals[0][ing]!="" && data.meals[0][ing] != null)
            {
                document.getElementById("ingredient-list").innerHTML +=
                `<li>${data.meals[0][ing]}</li>`
            }
        }
    })
    //displaying error
    .catch((err) => console.log(err));
}


//Setting style of Ingredient category to none
document.getElementById("popup").style.display = "none";

//Rendering gettingRandomImage() function reload
window.location.reload = gettingRandomImage();

// Displaying ingredients
function showIngredient(){
    document.getElementById("popup").style.display = "flex";
}

// Hiding Ingredients
function hideIngredients(){
    document.getElementById("popup").style.display = "none";
}



//Setting style of category section to none
document.getElementById("display-searched").style.display = "none";

//Function for displaying the required data using fetch method
function searchCategory(){
    // Variable to store user entered value
    var user_search = document.getElementById("input-box")

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user_search.value}`)
    .then((result)=>{
        return result.json();
    }).then((dataList)=>{
        console.log(dataList);
        let info="";
        if(dataList.meals){
            let num = dataList.meals.length;
            document.getElementById("search-title").innerText = user_search.value;
            for(i=0;i<num;i++){
            info+=`
            <div id="flash-card"> 
            <div class="searched-itemcard">
            <img class="test1" src="${dataList.meals[i].strMealThumb}" alt="" />
            <h4>${dataList.meals[i].strMeal}</h4>
            </div>
            </div>`
            }
        }
        else{
            info = `<h1>Seached items donot match to any category. </h1>`
        }
        document.getElementById("searched-items").innerHTML = info;
        document.getElementById("display-searched").style.display = "inherit";

    })
}




