import { IngredientsTable } from "@/components/UI/tables/ingredients";
import { IngredientForm } from "@/forms/ingredient.form";

export default function Ingredients(){
    return(<>
        <h1>Ingredients</h1>
        <IngredientForm />
        <IngredientsTable />
        </>
    )
}