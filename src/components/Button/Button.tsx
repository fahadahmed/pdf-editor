import './button.css';

export type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
}
export default function Button({ label, type }: ButtonProps) {
  return (
    <button type={type || "button"} className="button">{label}</button>
  )
}