<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartCook</title>
    <link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>
<?php

?>
<body>
    <main>
        <h1>SmartCook</h1>
        <form id="form">
            <div class="options">
                <div class="options__wrap">
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('difficulty')">Difficulty</p>
                        <div id="difficulty" class="folded-section">
                            <label><input type="checkbox" name="difficulty" value="1" />Simple</label>
                            <label><input type="checkbox" name="difficulty" value="2" />Medium</label>
                            <label><input type="checkbox" name="difficulty" value="3" />Difficult</label>
                        </div>
                    </div>
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('dishCategory')">Dish category</p>
                        <div id="dishCategory" class="folded-section">
                            <label><input type="checkbox" name="dishCategory" value="1" />Breakfast</label>
                            <label><input type="checkbox" name="dishCategory" value="2" />Soup</label>
                            <label><input type="checkbox" name="dishCategory" value="3" />Main Course</label>
                            <label><input type="checkbox" name="dishCategory" value="4" />Dessert</label>
                            <label><input type="checkbox" name="dishCategory" value="5" />Dinner</label>
                        </div>
                    </div>
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('price')">Price</p>
                        <div id="price" class="folded-section">
                            <label><input type="checkbox" name="price" value="1" />Cheap</label>
                            <label><input type="checkbox" name="price" value="2" />Medium</label>
                            <label><input type="checkbox" name="price" value="3" />Expensive</label>
                        </div>
                    </div>
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('recipeCategory')">Recipe category</p>
                        <div id="recipeCategory" class="folded-section">
                            <label><input type="checkbox" name="recipeCategory" value="1" />Soup</label>
                            <label><input type="checkbox" name="recipeCategory" value="2" />Meat</label>
                            <label><input type="checkbox" name="recipeCategory" value="3" />Meat Free</label>
                            <label><input type="checkbox" name="recipeCategory" value="4" />Dessert</label>
                            <label><input type="checkbox" name="recipeCategory" value="5" />Sauce</label>
                            <label><input type="checkbox" name="recipeCategory" value="6" />Pasta</label>
                            <label><input type="checkbox" name="recipeCategory" value="7" />Salad</label>
                            <label><input type="checkbox" name="recipeCategory" value="8" />Sweet Food</label>
                            <label><input type="checkbox" name="recipeCategory" value="9" />Drink</label>
                        </div>
                    </div>
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('tolerance')">Tolerance</p>
                        <div id="tolerance" class="folded-section">
                            <label><input type="checkbox" name="tolerance" value="1" />Vegetarian</label>
                            <label><input type="checkbox" name="tolerance" value="2" />Vegan</label>
                            <label><input type="checkbox" name="tolerance" value="3" />Nuts</label>
                            <label><input type="checkbox" name="tolerance" value="4" />Gluten</label>
                            <label><input type="checkbox" name="tolerance" value="5" />Lactose</label>
                            <label><input type="checkbox" name="tolerance" value="6" />Spicy</label>
                            <label><input type="checkbox" name="tolerance" value="7" />Alcohol</label>
                            <label><input type="checkbox" name="tolerance" value="8" />Seafood</label>
                            <label><input type="checkbox" name="tolerance" value="9" />Mushrooms</label>
                        </div>
                    </div>
                    <div class="options__item">
                        <p class="options__item__text" onclick="toggleSection('unit')">Unit</p>
                        <div id="unit" class="folded-section">
                            <label><input type="checkbox" name="unit" value="l" />Liter</label>
                            <label><input type="checkbox" name="unit" value="g" />Gram</label>
                            <label><input type="checkbox" name="unit" value="pc" />Piece</label>
                        </div>
                    </div>
                </div>
            </div>
            <input class="button" type="submit" value="Filter"></input>
        </form>
        <div id="data" class="data">
        <?php
        require_once("SmartCookClient.php");

        $request_data = [
            "attributes" => ["id", "name"],
        ];

        try {
        $SCC = (new SmartCookClient)
                ->setRequestData($request_data)
                ->sendRequest("recipes")
                ->getResponseData();
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        foreach ($SCC["data"] as $index => $val)
        {
            echo "<div class='recipe' id='id-".$val["id"]."'><a href = 'stranka.php?recipe=".$val["id"]."'><h2>".$val["name"]."</h2></a></div>";
        }
        
        if(isset($_GET["recipe"])){
            try {
                $SCS = (new SmartCookClient)
                    ->setRequestData(["recipe_id" => $_GET["recipe"]])
                    ->sendRequest("recipe")
                    ->getResponseData();
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        echo "<div id='description' class='id-".$_GET["recipe"]."'><ul>";
       
        echo "<li>Name: ".$SCS["data"]["name"]."</li>";
        echo "<li>Tolerance: ".implode(", ",$SCS["data"]["tolerance"])."</li>";
        echo "<li>Recipe category: ".implode(", ",$SCS["data"]["recipe_category"])."</li>";
        echo "<li>Dish category: ".implode(", ",$SCS["data"]["dish_category"])."</li>";
        echo "<li>Duration: ".$SCS["data"]["duration"]."</li>";
        echo "<li>Ingredients:</li><ul>";
        foreach ($SCS["data"]["ingredient"] as $val){
            echo "<li>".$val["name"]." ".$val["quantity"].$val["unit"]."</li>";
        }
        echo "</ul>";
        echo "<li> Desc: ".$SCS["data"]["description"]."</li>";
        echo "</ul></div>";
        }
        
        ?>
        </div>
    </main>
</body>

</html>