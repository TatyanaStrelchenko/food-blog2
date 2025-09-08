"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export const IngredientsTable = () => {
    const { ingredients, isLoading, removeIngredient } = useIngredientStore();
    const { isAuth } = useAuthStore();

    const handleDelete = async (id: string) => {
        await removeIngredient(id);
    
    }

    const getCategoryName = (value: string) => {
       const option = CATEGORY_OPTIONS.find(opt => opt.value === value);
         return option ? option.label : value;
    }

    const getUnitName = (value: string) => {
        const option = UNIT_OPTIONS.find(opt => opt.value === value);
          return option ? option.label : value;
     }

    return !isLoading && isAuth ? (
        <Table
            aria-label="Ingredients Table"
            className="w-[800px] mt-8">
        <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Unit</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
            {ingredients.map((ingredient) => (
               <TableRow key={ingredient.id}>
                   <TableCell>{ingredient.name}</TableCell>
                   <TableCell>{getCategoryName(ingredient.category)}</TableCell>
                   <TableCell>{getUnitName(ingredient.unit)}</TableCell>
                   <TableCell>{ingredient.pricePerUnit || ''}</TableCell>
                   <TableCell>{ingredient.description || ''}</TableCell>
                   <TableCell>
                       {isAuth && (
                           <Button onPress={() => handleDelete(ingredient.id)}>
                               Remove
                           </Button>
                       )}
                   </TableCell>
               </TableRow>
            ))}
        </TableBody>
    </Table>) : <p>Loading...</p>;
}