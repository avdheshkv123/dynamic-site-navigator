
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-4 mt-auto">
      <div className="container flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span>© 2025 InvenFlow. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/about" className="text-sm text-muted-foreground hover:underline">
            About Us
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
