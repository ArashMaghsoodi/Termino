import AuthShell from "../components/AuthShell";
import AuthForm from "../components/AuthForm";

export const metadata = {
  title: "ثبت‌نام | ترمینو",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
