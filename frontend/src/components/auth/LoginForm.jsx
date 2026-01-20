import {
  Card,
  CardAction,
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
import useAuthStore from "../../lib/store/AuthStore";


const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };



  const { setAuth } = useAuthStore();


  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.token;
      const user = data.user;


      // handle token
      setAuth(token, user);
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(extractErrorMessages(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.email.trim() === "" || formValues.password.trim() === "") {
      setError("All fields are required.");
      return;
    }


    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Card className='w-full border-border'>
      <CardHeader className='space-y-2 text-center'>
        <CardTitle className='text-xl text-foreground'>Sign In</CardTitle>
        <CardDescription className='text-muted-foreground'>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-4 mt-4'>
          {/* display error message if any */}
          {error && (
            <div className='text-white p-3 bg-destructive text-sm rounded-md'>
              {error}
            </div>
          )}

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

          <div className='py-4'>
            <Button type='submit' className={"w-full cursor-pointer"}>
              {loginMutation.isPending ? (
                <span className='flex items-center gap-2'>
                  <LoaderCircle /> login account...{" "}
                </span>
              ) : (
                "Login Account"
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className='flex items-center justify-center flex-col space-y-4 mt-4'>
          <div className='text-sm text-center'>
            Don't have an account?
            <a href='/register' className='text-blue-500 hover:underline'>
              <span> Register</span>
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
