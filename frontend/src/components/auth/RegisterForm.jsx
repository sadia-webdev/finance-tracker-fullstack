import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { useNavigate } from "react-router";
import { extractErrorMessages } from "../../util/errorUtila";
import { LoaderCircle } from "lucide-react";


const RegisterForm = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data", data);
      navigate("/login");
    },
    onError: (error) => {
      setError(extractErrorMessages(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValues.name.trim() === "" ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === "" ||
      formValues.confirmPassword.trim() === ""
    ) {
      setError("All fields are required.");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Card className='w-full border-border'>
      <CardHeader className='space-y-1 p-4'>
        <CardTitle className='text-xl text-center text-foreground'>
          Create an Account
        </CardTitle>
        <CardDescription className='text-center text-muted-foreground'>
          Enter your details to register
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        {/* Form fields will go here */}
        <CardContent className='space-y-4 mt-4'>
          {/* display error message if any */}
          {error && (
            <div className='text-white p-3 bg-destructive text-sm rounded-md'>
              {error}
            </div>
          )}
          {/* fullname input  group */}
          <div className='space-y-2'>
            <div className='text-sm font-medium text-left'>FullName</div>
            <Input
              type='text'
              placeholder='John Doe'
              required
              name='name'
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          {/* email input group */}
          <div className='space-y-2'>
            <div className='text-sm font-medium text-left'>Email</div>
            <Input
              type='email'
              placeholder='john@example.com'
              required
              name='email'
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          {/* password input group */}
          <div className='space-y-2'>
            <div className='text-sm font-medium text-left'>Password</div>
            <Input
              type='password'
              placeholder='******'
              required
              name='password'
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          {/* confirm password input group */}
          <div className='space-y-2'>
            <div className='text-sm font-medium text-left'>
              Confirm Password
            </div>
            <Input
              type='password'
              placeholder='******'
              required
              name='confirmPassword'
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className='py-4'>
            <Button type='submit' className={"w-full cursor-pointer"}>
              {registerMutation.isPending ? (
                <span className='flex items-center gap-2'>
                  <LoaderCircle /> Creating account...{" "}
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-center flex-col space-y-4 mt-4'>
          <div className='text-sm text-center'>
            Already have an account?{" "}
            <a href='/login' className='text-blue-500 hover:underline'>
              Login
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
