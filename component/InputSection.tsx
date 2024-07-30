"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const InputSection = () => {
  const { data, update } = useSession();
  const [name, setName] = useState("");
  const [rollno, setrollno] = useState("");
  return (
    <div className="">
      <div className="bg-red-600">
        <div>This is Local Session {data?.user.name}</div>
        <div>This is Local Session {data?.user.rollno}</div>
      </div>
      <div>
        <Button
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000" });
          }}
        >
          SignOUT
        </Button>
        <div className="flex">
          <Input
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-1/6"
          />
          <Button
            onClick={() => {
              update({ name: name });
            }}
          >
            Submit Name
          </Button>
        </div>
        <div className="flex justify-start items-center gap-10 bg-slate-900">
          <Input
            onChange={(e) => {
              setrollno(e.target.value);
            }}
            placeholder="rollno"
            className="w-1/6"
          />
          <Button
            onClick={() => {
              update({ rollno: rollno });
            }}
          >
            Submit RollNo
          </Button>
          <Button onClick={()=>{
            update({
              rollno:rollno,
              name:name
            })
          }}>
            Update All
          </Button>
        </div>
      </div>
    </div>
  );
};
