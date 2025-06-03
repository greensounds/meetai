"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { betterAuth } from "better-auth"
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession() 
 

  const onSubmit = () => {
    authClient.signUp.email({
      email, 
      name, 
      password
    }, {
      onError: () => {
        window.alert("something happened")
      }, 
      onSuccess: () => {
        window.alert("Success")
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email, 
      password
    }, {
      onError: () => {
        window.alert("something happened")
      }, 
      onSuccess: () => {
        window.alert("Success")
      }
    })
  }

  if(session) {
    return (
      <div>
        Logged in a {session.user.name}
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div>
       <div>
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) =>  setEmail(e.target.value)} />
        <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>

      <div>
        <Input placeholder="email" value={email} onChange={(e) =>  setEmail(e.target.value)} />
        <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
