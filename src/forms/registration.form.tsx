
"use client";

import { registerUser } from "@/actions/register";
import {Form, Input, Button} from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

export default function RegistrationForm({onClose}: IProps) {
  const [formData, setFormData] = useState({
    email: "", 
    password: "", 
    confirmPassword: "",
}); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(formData);
    console.log({result});
    onClose();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  return (
    <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
      <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none"
            }}
            validate={(value) => {
                if(!value) return "Email required"
                if(!validateEmail(value)) return "Incorrect email";
                return null;
            }}
        />
        <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none"
            }}
            validate={(value) => {
                if(!value) return "Password required"
                if(value.length < 6) return "Password should be more than 6 symbols";
                return null;
            }}
            className="mb-2"

        />
        <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Confirm Password"
            labelPlacement="outside"
            name="confirmPassword"
            placeholder="Enter your password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none"
            }}
            validate={(value) => {
                if(!value) return "Password required"
                if(value!== formData.password) return "Password should be the same";
                return null;
            }}
            className="mb-2"
        />
        <div className="flex justify-between items-center w-full p-2">
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Registration
          </Button>
        </div>
    </Form>
  );
}
