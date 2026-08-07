export function Loader({ messages }: { messages: string[] }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__messages">
        {messages.map((message) => <span key={message}>{message}</span>)}
      </div>
      <span className="loader__line" aria-hidden="true" />
    </div>
  );
}
