import { InputSection } from "@/component/InputSection";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page () {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-orange-200 h-screen ">
      <div className="bg-blue-500 text-white">
        <div>ID:-{session?.user.id}</div>
        <div>This is Server Session :-{session?.user.name}</div>
        <div>RollNo:- {session?.user.rollno}</div>
        {session?.user.email}
      </div>
      <InputSection />
    </div>
  );
}
