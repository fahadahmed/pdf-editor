import { Button } from '..';
import './header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="logo">PDF Editor</div>
      <div className="navigation">
        <div className="links">
          <a href="">Tools</a>
        </div>
        <div className="actions">
          <Button type="button" label="Dashboard" />
          <Button type="button" label="Logout" />
        </div>
      </div>
    </div>
  )
}