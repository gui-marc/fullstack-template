interface ConfirmationProps {
  confirmUrl: string;
}

export default function Confirmation({ confirmUrl }: ConfirmationProps) {
  return (
    <div>
      <h1>Thanks for joining us!</h1>
      <p>Access this link to activate your account:</p>
      <a href={confirmUrl} target="_blank">
        Confirm my account
      </a>
    </div>
  );
}
