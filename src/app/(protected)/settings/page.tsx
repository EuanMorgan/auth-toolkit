import { auth, signOut } from "~/auth";
import { Button } from "~/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="h-full bg-slate-500 text-white">
      <h1>Settings</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
