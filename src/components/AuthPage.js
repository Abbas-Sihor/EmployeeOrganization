"use client"
import React ,{useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkUser, createUser } from "@/lib/action/userAction";

const AuthPage = ({type}) => {
  const router = useRouter();
  

  const handlepush = () => {
  if (type === "login") {
    router.push("/signup");
  } else {
    router.push("/login");
  }
};
const [formData, setFormData] = useState({
  name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (type === "signup" && formData.password !== formData.confirmpassword) {
    alert("Passwords do not match!");
    return;
  }

  console.log("Form Data:", formData);

  let res;

  try {
    if (type === "login") {
      res = await checkUser({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      console.log("Login Response:", res);
    } else if (type === "signup") {
      res = await createUser(formData);
      console.log("Signup Response:", res);
    } else {
      alert("Invalid form type!");
      return;
    }

    if (res?.error) {
      alert(res.error);
      return;
    }

    alert(res.message || "Success!");
    console.log(res)
      if (res.user?._id) {
      localStorage.setItem("userId", res.user?._id);
    }

    router.push("/");
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(circle_at_center,_#EDECFFCC_10%,_#CD817233_100%)]">
      
      <div className="flex flex-row justify-center items-center h-[520px] w-[924px] px-8 py-16 rounded-lg shadow-lg bg-transparent">
        
        {/* Left side */}
           <form
      onSubmit={handleSubmit}
      className="w-1/2 flex flex-col gap-5 p-5"
    >
      {type=="signup"?<div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full"
        />
      </div>:""}
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>

      {type === "signup" && (
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            id="confirmpassword"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Repeat Password"
          />
        </div>
      )}

    <RadioGroup
  className="flex flex-row gap-3"
  onValueChange={handleRoleChange}
  defaultValue="user" 
>
  <Label className="mr-5">Role:</Label>

  {type === "login" && (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="admin" id="admin" />
      <Label htmlFor="admin">Admin</Label>
    </div>
  )}

  <div className="flex items-center space-x-2">
    <RadioGroupItem value="intern" id="intern" />
    <Label htmlFor="intern">Intern</Label>
  </div>

  <div className="flex items-center space-x-2">
    <RadioGroupItem value="user" id="user" />
    <Label htmlFor="user">User</Label>
  </div>
</RadioGroup>



      <Button
        type="submit"
        className="bg-[#2C2DC1] w-[165px] h-[40px] text-white self-center mt-2"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </Button>

      {type === "login" && (
        <p className="text-[12px] text-[#767676] text-center">
          forgot password?
        </p>
      )}
    </form>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300 h-full self-stretch"></div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col gap-5 p-5 items-center justify-center">
          {type==="login"?<p className="text-[12px] text-[#767676]">don’t have an account?</p>:<p className="text-[12px] text-[#767676]">Already have an account?</p>}

          <Button className="bg-[#2C2DC1] w-[165px] h-[40px] text-white" onClick={() => {handlepush()}}>
            {type==="login"?"Sign Up with Email":"Login with Email"}
          </Button>
          <div className="flex flex-col items-center">
            {/* Divider */}
        <div className="w-[1px] bg-gray-300  self-stretch"></div>
            <p>or</p>
            <p>Connect with</p>
            <div className="flex flex-row gap-3 mt-5">
              <Image src="/google.png" alt="Google Icon" width={50} height={50} />
              <Image src="/facebook.png" alt="Facebook Icon" width={50} height={50} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
