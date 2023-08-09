interface PasswordRecoverProps {
  email: string;
  recoverUrl: string;
}

export default function PasswordRecover({
  email,
  recoverUrl,
}: PasswordRecoverProps) {
  return (
    <div>
      <h1>Recover your password</h1>
      <p>Someone requested a password recover for your account ({email})</p>
      <a href={recoverUrl} target="_blank">
        Click here to recover your password
      </a>
    </div>
  );
}
