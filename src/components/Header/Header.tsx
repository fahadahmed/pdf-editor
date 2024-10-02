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
          <form action="/api/auth/signout">
            <Button type="submit" label="Logout" />
          </form>
        </div>
      </div>
    </div>
  )
}