import { auth } from "~/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="h-full bg-slate-500 text-white">
      <h1>Settings</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default SettingsPage;
