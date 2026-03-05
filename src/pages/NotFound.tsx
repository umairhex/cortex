import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

const NotFound = () => (
  <div className="h-screen flex items-center justify-center p-4">
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertTriangle className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>404 – Page not found</EmptyTitle>
      </EmptyHeader>
      <EmptyDescription>
        Oops! We couldn’t find the page you’re looking for.
        <Link to="/" className="block mt-2 text-primary hover:underline">
          Go back home
        </Link>
      </EmptyDescription>
    </Empty>
  </div>
);

export default NotFound;
