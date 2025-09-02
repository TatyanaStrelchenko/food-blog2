"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export const IngredientForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "vegetables",
        unit: "",
        pricePerUnit: null as number | null,
        description: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Handle form submission logic here
    }

    return (
        <Form className="w-[400px]" onSubmit={handleSubmit}>
            <Input 
                isRequired
                label="Name"
                value={formData.name}
                placeholder="Enter ingredient name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                validate={(value) => {
                    if(!value) return "Name is required";
                    return null;
                }}
            />
            <div className="flex gap-2 w-full">
                <div className="w-1/3">
                    <Select
                        isRequired
                        selectedKeys={formData.category ? [formData.category] : []}
                        label="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select
                        isRequired
                        selectedKeys={formData.unit ? [formData.unit] : []}
                        label="Unit"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    >
                        {UNIT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                   <Input
                        type="number"
                        isRequired
                        label="Price"
                        value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ""}
                        placeholder="Enter ingredient price"
                        onChange={(e) => {
                            const value = e.target.value ? parseFloat(e.target.value) : null;
                            setFormData({ ...formData, pricePerUnit: value });
                        }}
                        validate={(value) => {
                            if(!value) return "Price is required";
                            const num = parseFloat(value);
                            if(isNaN(num)) return "Price must be a number";
                            return null;
                        }}
                    />
                </div>
            </div>
            <Input
                isRequired
                label="Description"
                value={formData.description}
                placeholder="Enter ingredient description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                validate={(value) => {
                    if(!value) return "Description is required";
                    return null;
                }}
            />
            <div className="mt-2 flex w-full justify-end">
                <Button color="primary" type="submit">Add Ingredient</Button>
            </div>
        </Form>
    );
};