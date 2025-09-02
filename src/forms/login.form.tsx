"use client"

import { signInWithCredentials } from "@/actions/sign-in";
import {Form, Input, Button} from "@heroui/react";
import { useState } from "react";

interface IProps {
    onClose: () => void;
}

export default function LoginForm({onClose}: IProps) {
  const [formData, setFormData] = useState({
    email: "", 
    password: "", 
    confirmPassword: "",
}); 

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({formData})
    const result = await signInWithCredentials(formData.email, formData.password);
    console.log({result})
    //window.location.reload();

    onClose();
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
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
              return null;
          }}
          className="mb-2"
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
              return null;
          }}
        />
        <div className="flex justify-between items-center w-full p-2">
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Login
          </Button>
        </div>
    </Form>
  );
}
