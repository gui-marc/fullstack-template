import BackButton from '@/components/utils/BackButton';
import Button from '@/components/utils/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPreHeader,
  CardTitle,
} from '@/components/utils/card';
import Input from '@/components/utils/Input';

export default function PasswordRecoverPage() {
  return (
    <main className="grid h-full place-items-center">
      <Card className="max-w-[380px] w-full">
        <form>
          <CardPreHeader>
            <BackButton to="/login">Back to Login</BackButton>
          </CardPreHeader>
          <CardHeader>
            <CardTitle>Recover your password</CardTitle>
            <CardDescription>Enter your email to get recover instructions</CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              type="email"
              label="Your email"
              description="The instructions will be sent to this email"
              placeholder="example@email.com"
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full">Send recover instructions</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
