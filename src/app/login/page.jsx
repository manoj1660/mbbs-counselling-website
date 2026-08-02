import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login | MBBS Study Abroad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <LoginForm />
    </div>
  );
}