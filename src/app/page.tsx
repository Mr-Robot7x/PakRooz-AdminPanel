"use client";
import { SessionProvider } from "next-auth/react";

function Page() {
  return (
    <SessionProvider>
      <div>
        <h2>WELCOME</h2>
      </div>
    </SessionProvider>
  );
}

export default Page;
